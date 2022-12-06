import React, { forwardRef, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
const [isDisabled, setisDisabled] = useState(false);
const { roleId, region } = JSON.parse(localStorage.getItem("token"));
const roleobj = {
    1: "superadmin",
    2: "admin",
    3: "editor",
  };
  const changedisabled = (item) => {
    if (props.isUpdate) {
      if (roleobj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleobj[roleId] === "superadmin") {
        return false;
      } else {
        return item.value !== region;
      }
    }
  };
  const changeroledisable = (item) => {
    if (props.isUpdate) {
      if (roleobj[roleId] === "superadmin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (roleobj[roleId] === "superadmin") {
        return false;
      } else {
        return roleobj[item.id] !== "editor";
      }
    }
  };
  useEffect(() => {
    setisDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);

  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: "Please input the title of collection!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: "Please input the title of collection!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={
          isDisabled
            ? []
            : [
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]
        }
      >
        <Select disabled={isDisabled}>
          {props.regionList.map((item) => (
            <Option
              value={item.value}
              key={item.id}
              disabled={changedisabled(item)}
            >
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          { required: true, message: "Please input the title of collection!" },
        ]}
      >
        <Select
          onChange={(value) => {
            // console.log(value)
            if (value === 1) {
              setisDisabled(true);
              ref.current.setFieldsValue({
                region: "",
              });
            } else {
              setisDisabled(false);
            }
          }}
        >
          {props.roleList.map((item) => (
            <Option
              value={item.id}
              key={item.id}
              disabled={changeroledisable(item)}
            >
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});
export default UserForm;
