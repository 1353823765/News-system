import React, { useState } from "react";
import "./SideMenu.css";
import { UserOutlined, VideoCameraOutlined,SettingOutlined  } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Item from "antd/lib/list/Item";

const { Sider } = Layout;
 const { SubMenu } = Menu;
 const menuList=[
     {
      icon:<UserOutlined />,
      title:"home",
      key:"/home"
     },
     {
      icon:<UserOutlined />,
      title:"用户管理",
      key:"/user-manage",
      children:[
        {icon:<UserOutlined />,
          title:"用户信息",
          key:"/user-manage/list"
       },
      ]
     },
     {
      icon:<UserOutlined />,
      title:"角色列表",
      key:"/right-manage",
      children:[
        {icon:<UserOutlined />,
          title:"角色信息",
          key:"/right-manage/role/list"
       },
       {icon:<UserOutlined />,
          title:"权限列表",
          key:"/right-manage/right/list"
       },
      ]
     }
 ]
 const rendeMenu=(menulist)=>{
  return menulist.map((item)=>{
    if(item.children){
      return <SubMenu title={item.title} key={item.key} icon={item.icon}>
      {rendeMenu(item.children)}  
         
      </SubMenu>
    }
    return <Menu.Item icon={item.icon} key={item.key}>{item.title}</Menu.Item>
  }
    
    // 
  )
 }
export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
       {/*  <Menu.Item icon={<UserOutlined />} key="1">
        nav1
        </Menu.Item>
        <Menu.Item icon={<VideoCameraOutlined />} key="2">
          nav2
        </Menu.Item>
        <Menu.Item icon={<VideoCameraOutlined />} key="3">
          nav3
        </Menu.Item>
         <SubMenu title="用户管理"> 
         <Menu.Item  key="6">option1</Menu.Item>
         <Menu.Item key="7">option2</Menu.Item>
         <Menu.Item  key="8">option3</Menu.Item>
         
         </SubMenu> */}
         {rendeMenu(menuList)}
      </Menu>
    </Sider>
  );
}
// <SubMenu>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">1</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">2</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">3</Menu.Item>
// </SubMenu>