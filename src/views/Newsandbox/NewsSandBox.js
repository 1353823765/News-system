import React from "react";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import SideMenu from "../../components/Newsandbox/SideMenu";
import TopHeader from "../../components/Newsandbox/TopHeader";
import Home from "../Newsandbox/home/Home";
import UserList from "../Newsandbox/uesr-manage/UserList";
import RightList from "../Newsandbox/right-manage/RightList";
import RoleList from "../Newsandbox/right-manage/RoleList";
import NotPremission from "../Newsandbox/notpremission/NotPremission";
import 'antd/dist/antd.css';
import "./CSS.css"
const { Content } = Layout;
export default function Newsandbox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
     
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/user-manage/list" component={UserList}></Route>
          <Route path="/right-manage/role/list" component={RoleList}></Route>
          <Route path="/right-manage/right/list" component={RightList}></Route>
          <Redirect from="/" to="/home" exact></Redirect>
          <Route path="*" component={NotPremission}></Route>
        </Switch>
      </Content>
      </Layout>
    </Layout>
  );
}
