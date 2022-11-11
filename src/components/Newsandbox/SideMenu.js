import React, { useState } from "react";
import "./SideMenu.css";
import { UserOutlined, VideoCameraOutlined,SettingOutlined  } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

 const { SubMenu } = Menu;
export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item icon={<UserOutlined />} key="1">
        nav1
        </Menu.Item>
        <Menu.Item icon={<VideoCameraOutlined />} key="2">
          nav2
        </Menu.Item>
        <Menu.Item icon={<VideoCameraOutlined />} key="3">
          nav3
        </Menu.Item>
       
      </Menu>
    </Sider>
  );
}
// <SubMenu>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">1</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">2</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">3</Menu.Item>
// </SubMenu>