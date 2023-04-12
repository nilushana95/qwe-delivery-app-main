import React, { useEffect, useState } from "react";
import Container from "../../components/layout";
import { Button, message, Result, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateUser } from "./CreateUser";
import { IUser } from "../../definetions/definetions";
import axios from "axios";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<IUser[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IUser>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/auth/users`,
        { headers }
      );
      console.log("*** ", result.data);

      if (result.data) {
        setUsers(result.data);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        setUsers(undefined);
      } else {
        message.error("Error fetching users.");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onEdit = (record: IUser) => {
    setSelectedData(record);
  };
  const onDelete = async (record: IUser) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/auth/user/${record._id}`,
        { headers }
      );
      if (result.status === 200) {
        setLoading(false);
        fetchData();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        message.error("You are not authorized to remove user.");
      } else {
        message.error("Error removing the user.");
      }
    }
  };
  const columns: ColumnsType<IUser> = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => onDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const onCancelModel = async (reload?: boolean) => {
    console.log("rela ", reload);
    if (reload) {
      await fetchData();
    }
    setShowModal(false);
    setSelectedData(undefined);
  };

  return (
    <Container>
      {users === undefined ? (<Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
      />
    ): ( <div className="App">
    <CreateUser visible={showModal} onCancel={onCancelModel} />
    {selectedData && (
      <CreateUser
        onCancel={onCancelModel}
        visible={true}
        data={selectedData}
      />
    )}
    <h1>Users</h1>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: "16px",
      }}
    >
      <Button
        onClick={() => setShowModal(true)}
        type="primary"
        style={{
          backgroundColor: "#57AD57",
          fontStyle: "bold",
        }}
      >
        Add user
      </Button>
    </div>
    <Table
      columns={columns}
      dataSource={users}
      rowKey="_id"
      loading={loading}
    />
  </div>)}
     
    </Container>
  );
};

export default Users;
