import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import CustomModal from "../../components/Common/CustomModal";
import { IDeliveryCreate, IRoute } from "../../definetions/definetions";
import axios from "axios";
import { deliveryStatus, teams, vehicles } from "../../dataList";

type Props = {
  visible?: boolean;
  onCancel: (reload?: boolean) => void;
  data?: IDeliveryCreate;
};
export const CreateDelivery: FC<Props> = ({ onCancel, visible, data }) => {
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchDeliveries = async () => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/route`,
      { headers }
    );
    if (result.data) {
      setRoutes(result.data);
    }
  };
  useEffect(() => {
    fetchDeliveries();
  }, []);

  const createDelivery = async (values: any) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/delivery`,
        {
          ...values,
        },
        { headers }
      );
      if (result.status === 201) {
        onCancel(true);
      }
      console.log("resutl ", result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error saving the delivery.");
      console.log("error ", error);
    }
  };
  const updateDelivery = async (values: any, id: string) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/delivery/${id}`,
        {
          ...values,
        },
        { headers }
      );
      if (result.status === 200) {
        onCancel(true);
      }
      console.log("resutl ", result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Error saving the delivery.");
      console.log("error ", error);
    }
  };
  const onFinish = async (values: any) => {
    if(data?._id ){
        await updateDelivery(values, data?._id);
    } else {
        await createDelivery(values);
    }
  }
  return (
    <CustomModal
      width={700}
      title={data ? "Update delivery" : "New Delivery"}
      visible={visible ?? false}
      onClose={() => onCancel()}
      footer={null}
    >
      <Form
        layout={"vertical"}
        initialValues={data}
        onFinish={onFinish}
      >
        <Form.Item
          label={"Package"}
          name="package"
          rules={[{ required: true, message: "Please input package!" }]}
        >
            <Input style={{ width: "100%" }} placeholder={"Package"} />

        </Form.Item>
        <Form.Item
          label={"Route"}
          name="route"
          rules={[{ required: true, message: "Please select route!" }]}
        >
          <Select
            showSearch
            //onSearch={handlerSearch}
            filterOption={false}
            style={{ width: "100%" }}
            placeholder="Select a route"
          >
            {routes.map((vl) => (
              <Select.Option key={vl._id} value={vl._id}>
                {vl.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Vehicle"}
          name="vehicle"
          rules={[{ required: true, message: "Please select vehicle!" }]}
        >
          <Select
            showSearch
            //onSearch={handlerSearch}
            filterOption={false}
            style={{ width: "100%" }}
            placeholder="Select a role"
          >
            {vehicles.map((vl) => (
              <Select.Option key={vl} value={vl}>
                {vl}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Team"}
          name="team"
          rules={[{ required: true, message: "Please select team!" }]}
        >
          <Select
            showSearch
            filterOption={false}
            style={{ width: "100%" }}
            placeholder="Select a team"
          >
            {teams.map((vl) => (
              <Select.Option key={vl} value={vl}>
                {vl}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Status"}
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select
            showSearch
            filterOption={false}
            style={{ width: "100%" }}
            placeholder="Select a status"
          >
            {deliveryStatus.map((vl) => (
              <Select.Option key={vl} value={vl}>
                {vl}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#57AD57",
              width: "100%",
              fontStyle: "bold",
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </CustomModal>
  );
};
