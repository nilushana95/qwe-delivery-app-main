import React, { ReactNode, useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../definetions/definetions";

const { Header, Content, Sider } = Layout;

const navItems = [
  { name: "Routes", key: "/routes", icon: LaptopOutlined },
  { name: "Deliveries", key: "/deliveries", icon: NotificationOutlined },
  { name: "Users", key: "/users", icon: UserOutlined },
  // { name: "Security teams", key: '/', icon: LaptopOutlined },
];

const items2: MenuProps["items"] = navItems.map(
  ({ icon, name, key }, index) => {
    return {
      key,
      icon: React.createElement(icon),
      label: name,
    };
  }
);

const Container: React.FC<{ children: ReactNode }> = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data && data !== null) {
      setUser(JSON.parse(data));
    }
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const [current, setCurrent] = useState("deliveries");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            height: "100%",
          }}
        >
          {user && (
            <div style={{margin: '0 20px 0 5px'}}>
              <span style={{ color: 'white'}}>Hi {user.firstName}</span>
            </div>
          )}
          <Button onClick={logout}> Logout</Button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={["1"]}
            defaultSelectedKeys={[current]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
            onClick={onClick}
            selectedKeys={[current]}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {props?.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Container;
