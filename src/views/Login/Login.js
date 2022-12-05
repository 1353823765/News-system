import React from "react";
import { Button, Form, Input,message } from "antd";
import { UserOutlined, LockOutlined, CheckOutlined } from "@ant-design/icons";
import Particles from "react-particles";
import { customInit, options } from "./const-options";
import "../Login/Login.css";
import axios from "axios";
export default function Login(props) {
  console.log(props)
  const onFinish = (value) => {
    console.log("Success:", value);
    axios.get(`http://localhost:5000/users?username=${value.username}&password=${value.password}&roleState=true&_expand=role
    `).then(res=>{console.log(res.data[0])
      if(res.data.length===0){
       message.error("用户名密码错误")
      }else{
          localStorage.setItem("token",JSON.stringify(res.data[0]))
          props.history.push("/home")
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ height: "100%"}}>
      <Particles options={options} init={customInit} />
      <div className="formContainer">
        <div className="logintitle">全球新闻发布管理系统</div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            wrapperCol={{
              span: 30,
            }}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 30 }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button type="primary" icon={<CheckOutlined />} htmlType="submit">
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
