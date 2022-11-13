import React, { useState,useEffect } from "react";
import {withRouter} from "react-router-dom"
import "./SideMenu.css";
import {
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  RedditOutlined,
  UserDeleteOutlined ,
  FileExcelOutlined  ,
  VerifiedOutlined,
  FileTextOutlined ,
  FileSyncOutlined ,
  FolderViewOutlined,
  ReadOutlined ,
  SafetyCertificateOutlined 
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import axios from "axios";
const { Sider } = Layout;
const { SubMenu } = Menu;
//固定格式左侧列表数据
// const menuList = [
//   {
//     icon: <UserOutlined />,
//     title: "首页",
//     key: "/home",
//   },
//   {
//     icon: <UserOutlined />,
//     title: "用户管理",
//     key: "/user-manage",
//     children: [
//       {
//         title: "用户列表",
//         icon: <SettingOutlined/>,
//         key: "/user-manage/list",
//       },
//     ],
//   },
//   {
//     icon: <UserOutlined/>,
//     title: "权限管理",
//     key: "/right-manage",
//     children: [
//       {
//         title: "角色列表",
//         icon: <VideoCameraOutlined />,
//         key: "/right-manage/role/list",
//       },
//       {
//         title: "权限列表",
//         icon: <UserOutlined/>,
//         key: "/user-manage/right/list",
//       },
//     ],
//   },
// ];
  
//http://localhost:5000/rights?_embed=children
 function SideMenu(props) {
  console.log(props)
  const [menulist,setmenulist]=useState([])
 useEffect(()=>{
    axios("http://localhost:5000/rights?_embed=children").then(res=>{
      // console.log(res.data),
  setmenulist(res.data)
  })
 },[])
 //解决图标显示问题用一个数据来表示图标显示的样子
const iconList={
  "/home":<HomeOutlined/>, 
   "user-manage": <UserDeleteOutlined/>,
   "/user-manage/list": <UsergroupDeleteOutlined/>,
   "/right-manage/role/list": <UserOutlined/>,
   "/right-manage/right/list": <RedditOutlined/>,
   "/news-manage/add": <ReadOutlined />,
   "/news-manage/draft": <FileTextOutlined />,
   "/news-manage/category": <FileSyncOutlined />,
   "/audit-manage/audit": <FolderViewOutlined/>,
   "/audit-manage/list":<VideoCameraOutlined/>,
 "/publish-manage/unpublished":<SafetyCertificateOutlined />,
 "/publish-manage/published":<VerifiedOutlined />,
 "/publish-manage/sunset":<FileExcelOutlined />
 }
 //通过后端返回来的数据中的pagepermisson的值来决定左侧列表中显示项
 const  verdictpagepermisson=(item)=>{
  return item.pagepermisson
 }
  const renderMenu=(menulist)=>{
    return menulist.map(item=>{
         if(item.children?.length>0&&verdictpagepermisson(item)){
       return  <SubMenu key={item.key} icon={iconList[item.key]}  title={item.title}>
         {renderMenu(item.children)}
          </SubMenu>
         }
         return  verdictpagepermisson(item)&& <Menu.Item  key={item.key} icon={iconList[item.key]} 
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
        {renderMenu(menulist)}
      </Menu>
    </Sider>
  );
}
// <SubMenu>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">1</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">2</Menu.Item>
// <Menu.Item icon={<VideoCameraOutlined />} key="3">3</Menu.Item>
// </SubMenu>
//withRouter高阶组件为了获取props中的history进行页面切换
export default withRouter(SideMenu)