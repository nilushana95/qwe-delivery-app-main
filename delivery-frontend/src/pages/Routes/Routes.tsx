import React, { useEffect, useState } from "react";
import Container from "../../components/layout";
import { Button, message, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateRoute } from "./CreateRoute";
import { IRoute } from "../../definetions/definetions";
import axios from "axios";

const Routes = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<IRoute[]>([]);
  const [selectedData, setSelectedData] = useState<IRoute>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchRoutes = async () => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/route`,
      { headers }
    );
    console.log("result delv ", result);
    if (result.data) {
      setData(result.data);
    }
  };
  useEffect(() => {
    fetchRoutes();
  }, []);
  const onEdit = (record: IRoute) => {
    setSelectedData(record);
  };
  const onDelete = async (record: IRoute) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/route/${record._id}`,
        { headers }
      );
      if (result.status === 200) {
        setLoading(false);
        fetchRoutes();
      }
      console.log("resutl ", result);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        message.error("You are not authorized to remove routes.");
      } else {
        message.error("Error removing the route.");
      }

      console.log("error ", error);
    }
  };
  const columns: ColumnsType<IRoute> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
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
      await fetchRoutes();
    }
    setShowModal(false);
    setSelectedData(undefined);
  };

  return (
    <Container>
      <div className="App">
        <CreateRoute onCancel={onCancelModel} visible={showModal} />
        {selectedData && (
          <CreateRoute
            onCancel={onCancelModel}
            visible={true}
            data={selectedData}
          />
        )}
        <h1>Routes</h1>
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
            Add Route
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="_id"
        />
      </div>
    </Container>
  );
};

export default Routes;
