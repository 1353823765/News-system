import React, { useState } from "react";
import {withRouter} from "react-router-dom"
import "./SideMenu.css";
import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Item from "antd/lib/list/Item";

const { Sider } = Layout;
const { SubMenu } = Menu;
const menuList = [
  {
    icon: <UserOutlined />,
    title: "首页",
    key: "/home",
  },
  {
    icon: <UserOutlined />,
    title: "用户管理",
    key: "/user-manage",
    children: [
      {
        title: "用户列表",
        icon: <SettingOutlined/>,
        key: "/user-manage/list",
      },
    ],
  },
  {
    icon: <UserOutlined/>,
    title: "权限管理",
    key: "/right-manage",
    children: [
      {
        title: "角色列表",
        icon: <VideoCameraOutlined />,
        key: "/right-manage/role/list",
      },
      {
        title: "权限列表",
        icon: <UserOutlined/>,
        key: "/user-manage/right/list",
      },
    ],
  },
];

//http://localhost:5000/rights?_embed=children
 function SideMenu(props) {
  console.log(props)
  const renderMenu=(menulist)=>{
    return menulist.map(item=>{
         if(item.children){
       return    <SubMenu key={item.key} icon={item.icon} title={item.title}>
         {renderMenu(item.children)}
          </SubMenu>
         }
         return   <Menu.Item  key={item.key} icon={item.icon} 
          onClick={()=>{
            //通过item.key进行跳转 因为我们顶一个key值就是我们跳转的路径
            props.history.push(item.key)
          }}
          >{item.title}</Menu.Item>
     })
   }
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
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  );
}
// <SubMenu>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">1</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">2</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">3</Menu.Item>
// </SubMenu>
//with
export default withRouter(SideMenu)