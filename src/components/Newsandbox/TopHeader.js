import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Avatar } from "antd";
import { withRouter } from "react-router-dom";
const { Header } = Layout;
function TopHeader(props) {
  const name = JSON.parse(localStorage.getItem("token"));
  const { role, username } = name;
  // console.log(role.roleName)
  //  console.log(username)
  const items = [
    {
      key: "1",

      label: <span> {role.roleName}</span>,
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("token");
            props.history.replace("/login");
          }}
        >
          退出
        </span>
      ),
      danger: true,
    },
  ];
  //   const menu = (
  //     <Menu>
  //       <Menu.Item key="1">{role.roleName}</Menu.Item>
  //       <Menu.Item  key="2" danger onClick={()=>{
  //         localStorage.removeItem("token")
  //       props.history.replace("/login")
  //       }}>退出</Menu.Item>
  //     </Menu>
  // );
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
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changecollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changecollapsed} />
      )}
      <div style={{ float: "right" }}>
        <span>
          欢迎<span style={{ color: "#1890ff" }}>{username}</span>回来
        </span>
        <Dropdown menu={{ items }}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
export default withRouter(TopHeader);
