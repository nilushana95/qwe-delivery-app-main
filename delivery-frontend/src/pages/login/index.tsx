import React, { FC } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import sha1 from "sha1";
import axios from "axios";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const Login: FC<any> = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          userName: values.userName,
          password: sha1(values.password),
        }
      );
      if (result.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        localStorage.setItem("token", result.data.token);
        navigate("/deliveries");
      }
      console.log("resutl ", result);
    } catch (error) {
      message.error("Invalid credentials");
      console.log("error ", error);
    }
  };
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (token) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }} // pass current location to redirect back
      />
    );
  }
  return (
    <div className="App">
      <div style={{ marginTop: 20, marginBottom: 150 }}>
        <h1>QWE Login</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
