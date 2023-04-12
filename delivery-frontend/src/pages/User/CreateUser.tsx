import React, { FC, useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import CustomModal from "../../components/Common/CustomModal";
import { IUser } from "../../definetions/definetions";
import axios from "axios";
import sha1 from "sha1";
import { roles } from "../../dataList";

type Props = {
  visible?: boolean;
  onCancel: (reload?: boolean) => void;
  data?: IUser;
};
export const CreateUser: FC<Props> = ({ data, onCancel, visible }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const createUser = async (values: any) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/user`,
        {
          ...values,
          password: sha1(values.password),
        },
        { headers }
      );
      if (result.status === 201) {
        onCancel(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        message.error("You are not authorized to create users.");
      } else {
        message.error("Error saving user.");
      }
    }
  };
  const updateUser = async (values: any, id: string) => {
    setLoading(true);
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const result = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/user/${id}`,
        {
          ...values,
        },
        { headers }
      );
      if (result.status === 200) {
        onCancel(true);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (
        error?.response &&
        error?.response?.data?.message === "UNAUTHORIZED"
      ) {
        message.error("You are not authorized to update users.");
      } else {
        message.error("Error saving user.");
      }
    }
  };
  const onFinish = async (values: any) => {
    if (data?._id) {
      await updateUser(values, data?._id);
    } else {
      await createUser(values);
    }
  };
  return (
    <CustomModal
      width={700}
      title={data ? "Update User" : "New User"}
      visible={visible ?? false}
      onClose={() => onCancel()}
      footer={null}
    >
      <Form layout={"vertical"} initialValues={data} onFinish={onFinish}>
        <Form.Item
          label={"First name"}
          name="firstName"
          rules={[{ required: true, message: "Please input first name!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"First name"} />
        </Form.Item>
        <Form.Item
          label={"Last name"}
          name="lastName"
          rules={[{ required: true, message: "Please input last name!" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"Last name"} />
        </Form.Item>
        <Form.Item
          label={"User name"}
          name="userName"
          rules={[{ required: true, message: "Please input user name" }]}
        >
          <Input style={{ width: "100%" }} placeholder={"User name"} />
        </Form.Item>
        {!data && (
          <Form.Item
            label={"Password"}
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
          >
            <Input.Password
              style={{ width: "100%" }}
              type={"password"}
              placeholder={"User name"}
            />
          </Form.Item>
        )}
        <Form.Item
          label={"Role"}
          name="role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select
            filterOption={false}
            style={{ width: "100%" }}
            placeholder="Select a role"
          >
            {roles.map((vl) => (
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
