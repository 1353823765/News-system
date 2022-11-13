import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Space, Avatar } from "antd";
const { Header } = Layout;
export default function TopHeader(props) {
  const menu = (
    <Menu>
      <Menu.Item>超级管理员</Menu.Item>
      <Menu.Item danger>退出</Menu.Item>
    </Menu>
  );
  const [collapsed, setCollapsed] = useState(false);
  const changecollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      {/* React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          }) */}
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changecollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changecollapsed} />
      )}
      <div style={{ float: "right" }}>
        <span>欢迎ADMIN回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
