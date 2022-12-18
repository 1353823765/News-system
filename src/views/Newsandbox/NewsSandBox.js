import React, { useEffect } from "react";
import { Layout } from "antd";
import 'antd/dist/antd.min.css';
import NProgress from "nprogress"
import "nprogress/nprogress.css";
import SideMenu from "../../components/Newsandbox/SideMenu";
import TopHeader from "../../components/Newsandbox/TopHeader";

import NewRouter from "../../components/Newsandbox/NewRouter";
import "./NewsSandBox.css"
const { Content } = Layout;
export default function Newsandbox() {
  NProgress.start();
  useEffect(()=>{
    NProgress.done();
  })
  return (
    <Layout>
      <SideMenu ></SideMenu>
      <Layout className="site-layout">
        <TopHeader ></TopHeader>
     
      <Content 
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          overflow:"auto"
        }}
      >
        <NewRouter></NewRouter>
      </Content>
      </Layout>
    </Layout> 
   
  );

}
