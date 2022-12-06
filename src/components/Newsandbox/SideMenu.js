import React, { useState,useEffect } from "react";
import {withRouter} from "react-router-dom";
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
 function SideMenu(props) {
  console.log(props)
  const [menulist,setmenulist]=useState([])
 useEffect(()=>{
    axios("/rights?_embed=children").then(res=>{
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
 const  {role:{rights}}=JSON.parse(localStorage.getItem("token"))
 //通过后端返回来的数据中的pagepermisson的值来决定左侧列表中显示项
 const  verdictpagepermisson=(item)=>{
  return item.pagepermisson&&rights.includes(item.key)

 }
 const [collapsed, setCollapsed] = useState(false);
 //左侧边栏高亮显示用路径代表唯一
 const SelectedKeys=props.location.pathname
 //  
 const OpenKeys=`/${SelectedKeys.split("/")[1]}`
 const renderMenu=(menulist)=>{
    return menulist.map(item=>{
         if(item.children?.length>0&&verdictpagepermisson(item)){
       return  <SubMenu key={item.key} icon={iconList[item.key]}  title={item.title}>
         {renderMenu(item.children)}
          </SubMenu>
         }
         return verdictpagepermisson(item)&& 
         <Menu.Item  key={item.key} icon={iconList[item.key]} 
          onClick={()=>{
            //通过item.key进行跳转 因为我们顶一个key值就是我们跳转的路径
            props.history.push(item.key)
          }}
          >{item.title}</Menu.Item>
     })
   }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
    <div className="left-div">
      <div className="logo">全球新闻发布系统</div>
      <div className="div-menu">
      <Menu theme="dark" mode="inline" selectedKeys={[SelectedKeys]} 
      defaultOpenKeys={[OpenKeys]}>
        {renderMenu(menulist)}
      </Menu>
      </div>
      </div>
    </Sider>
  );
}
export default withRouter(SideMenu)