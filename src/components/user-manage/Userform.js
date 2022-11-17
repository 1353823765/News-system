import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";
export default function Userform() {
  const { Option } = Select;
  const [roleList, setroleList] = useState([]);
  const [regionsList, setregionsList] = useState([]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      console.log(res.data);
      const list = res.data;
      setroleList(list);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      console.log(res.data);
      const list = res.data;
      setregionsList(list);
    });
  }, []);
  return (
    <div>
      <Form layout="vertical">
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="regio"
          label="区域"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select
            style={{
              width: 472,
            }}
            onChange={handleChange}
            options={regionsList}
          />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Select style={{ width: 472 }} onChange={handleChange}>
            {roleList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
