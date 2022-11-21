import React, { forwardRef, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
const Userform = forwardRef((props, ref) => {
  const [isdistable, setsdistable] = useState(false);
  const { Option } = Select;
  console.log(props);
  console.log(ref);
  useEffect(()=>{
    setsdistable(props.isUserformdisable)
  },[props.isUserformdisable])
  return (
    <div>
      <Form layout="vertical" ref={ref}>
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
          <Input/>
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
          name="region"
          label="区域"
          rules={isdistable? []:[
            {
              required: true,
              message:"Please input the title of collection!",
            },
          ]}
        >
          <Select
            disabled={isdistable}
            style={{
              width: 472,
            }}
            options={props.regionsList}
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
          <Select
            style={{ width: 472 }}
            onChange={(value) => {
              if (value === 1) {
                ref.current.setFieldsValue({
                  region: "",
                });

                setsdistable(true);
              } else {
                setsdistable(false);
              }
              console.log(value);
            }}
          >
            {props.roleList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.roleName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
});
export default Userform;
