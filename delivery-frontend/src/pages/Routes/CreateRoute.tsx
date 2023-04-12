import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import CustomModal from "../../components/Common/CustomModal";
import { IRoute } from "../../definetions/definetions";
import axios from "axios";

type Props = {
  visible?: boolean;
  onCancel: (reload?: boolean) => void;
  data?: IRoute;
};
export const CreateRoute: FC<Props> = ({ onCancel, visible, data }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createDelivery = async (values: any) => {
    setLoading(true);
    console.log("v;s ", values);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/route`,
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
    } catch (error: any) {
      setLoading(false);
      console.log("error ", error);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        message.error("You are not authorized to create route.");
      } else {
        message.error("Error saving the route.");
      }
    }
  };
  const updateDelivery = async (values: any, id: string) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/route/${id}`,
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
      message.error("Error saving the route.");
      console.log("error ", error);
    }
  };
  const onFinish = async (values: any) => {
    if (data?._id) {
      await updateDelivery(values, data?._id);
    } else {
      await createDelivery(values);
    }
  };
  return (
    <CustomModal
      width={700}
      title={data ? "Update route" : "New Route"}
      visible={visible ?? false}
      onClose={() => onCancel()}
      footer={null}
    >
      <Form layout={"vertical"} initialValues={data} onFinish={onFinish}>
        <Form.Item
          label={"Name"}
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"Name"} />
        </Form.Item>
        <Form.Item
          label={"Description"}
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"Description"} />
        </Form.Item>
        <Form.Item
          label={"Source"}
          name="source"
          rules={[{ required: true, message: "Please input source!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"Source"} />
        </Form.Item>
        <Form.Item
          label={"Destination"}
          name="destination"
          rules={[{ required: true, message: "Please input destination!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"Destination"} />
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
