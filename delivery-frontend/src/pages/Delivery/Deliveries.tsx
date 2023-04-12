import React, { useEffect, useState } from "react";
import Container from "../../components/layout";
import { Link } from "react-router-dom";
import { Button, message, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateDelivery } from "./CreateDelivery";
import { IDelivery, IDeliveryCreate } from "../../definetions/definetions";
import axios from "axios";

const Deliveries = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<IDelivery[]>([]);
  const [selectedData, setSelectedData] = useState<IDeliveryCreate>();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDeliveries = async () => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/delivery`,
      { headers }
    );
    console.log("result delv ", result);
    if (result.data) {
      setData(result.data);
    }
  };
  useEffect(() => {
    fetchDeliveries();
  }, []);
  const onEdit = (record: IDelivery) => {
    const temp: any = { ...record };
    temp.route = record.route._id;
    setSelectedData(temp);
  };
  const onDelete = async (record: IDelivery) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/delivery/${record._id}`,
        { headers }
      );
      if (result.status === 200) {
        setLoading(false);
        fetchDeliveries();
      }
      console.log("resutl ", result);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response && error?.response?.data?.message === "UNAUTHORIZED") {
        message.error("You are not authorized to remove deliveries.");
      } else {
        message.error("Error removing the delivery.");
      }

      console.log("error ", error);
    }
  };
  const columns: ColumnsType<IDelivery> = [
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
      render: (_, record) => <span>{record.route?.name}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (_, record) => (<span>{record.route?.status}</span>)
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
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
      await fetchDeliveries();
    }
    setShowModal(false);
    setSelectedData(undefined);
  };

  return (
    <Container>
      <div className="App">
        <CreateDelivery
             onCancel={onCancelModel}
          visible={showModal}
        />
        {selectedData && (
          <CreateDelivery
            onCancel={onCancelModel}
            visible={true}
            data={selectedData}
          />
        )}
        <h1>Deliveries</h1>
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
            Add Delivery
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

export default Deliveries;
