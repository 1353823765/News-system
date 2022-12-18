import React from "react";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Avatar } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import  * as actions from "../../redux/actions/actions";


const { Header } = Layout;

function TopHeader(props) {
  const name = JSON.parse(localStorage.getItem("token"));
  

  const { role, username } = name;
  const {isCollapsed,checkcollapsed}=props
  
// console.log(props)
  console.log(isCollapsed)
  
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

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      {isCollapsed ? (
        <MenuUnfoldOutlined onClick={checkcollapsed} />
      ) : (
        
        <MenuFoldOutlined onClick={checkcollapsed} />
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
 const mapStateToProps = (state, ownProps) => {
  
 
  return {
    isCollapsed:state.Collapsereducer.isCollapsed

  }
 }

export default connect(mapStateToProps,actions)( withRouter(TopHeader))
