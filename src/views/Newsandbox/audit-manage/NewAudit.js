import axios from 'axios'
import React, { useEffect, useState } from 'react'
;
import { formatDate } from '../news-manage/const-NewDraft';

import { Tag, Button, Table, notification } from "antd";
export default function NewAudit(props) {
  const [dataSource, setdataSource] = useState([]);

  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"));
  const handleAudit=(item,auditState,publishState)=>{
  setdataSource(dataSource.filter(data=>data.id!==item.id))
  axios.patch(`/news/${item.id}`,{
    auditState,
    publishState
  }).then(res=>{
    notification.info({
      message: `通知`,
      description:`您可以在【审核管理/审核列表】中查看您的新闻状态`,
      placement:"bottomRight"
    });

  })

  }
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title,item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
      },
    },
    {
   title:"提交日期",
   dataIndex: "createTime",
   render: (createTime) => {
  const data=formatDate(createTime)
       return <div>{data}</div>
    }},
    {
      title: "作者",
      dataIndex: "author",
    },
   
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
      
        return (
          <div>{category.title}</div>
        );
      },
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (auditState) => {
        const colorList=["","orange","green","red"]
        const auditList=["草稿箱","审核中","已通过","未通过"]
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
        
        
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
      
          <Button type="primary" onClick={()=>{handleAudit(item,2,1)}} >通过</Button>
          <Button type="primary"  onClick={()=>{handleAudit(item,3,0)}}>驳回</Button> 
            
         
            
              
            
          
          </div>
        );
      },
    },
  ];


  useEffect(()=>{
    const roleObj = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
  }
   
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
          const list = res.data
          setdataSource(roleObj[roleId]==="superadmin"?list:[
              ...list.filter(item=>item.author===username),
              ...list.filter(item=>item.region===region&& roleObj[item.roleId]==="editor")
          ])
      })
    
  },[roleId, region, username])
  return (
    <div>
    <Table
    dataSource={dataSource}
    columns={columns}
    pagination={{
      pageSize: 5,
    }}
    rowKey={(item) => item.id}
  />
    </div>
  )
}

