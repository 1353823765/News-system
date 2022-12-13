import axios from 'axios'
import React, { useEffect, useState } from 'react'
;
import { formatDate } from '../news-manage/const-NewDraft';

import { Tag, Button, Table, notification } from "antd";
export default function NewAuditList( props) {
  const {username}=JSON.parse(localStorage.getItem("token"))
  const  [dataSource,setdataSource]=useState([])
  useEffect(()=>{
axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`)
.then(res=>{setdataSource(res.data)
  console.log(res.data)})

  },[username])
  const handleRemove=(item)=>{
 setdataSource(dataSource.filter(data=>data.id!==item.id))
 axios.patch(`/news/${item.id}`,{
  auditState:0
 }).then(res=>{
  notification.info({
    message: `提示信息`,
    description:`您可以在草稿箱中查看您的新闻`,
    placement:"bottomRight"
  });
 })
  }
  const  handUpdate=(item)=>{
  props.history.push(`/news-manage/update/${item.id}`)
  }
  const  handPut=(item)=>{
    axios.patch(`/news/${item.id}`,{
      "publishState":2,
      "publishTime":Date.now()
    }).then(res=>{
      props.history.push(`/publish-manage/published`)
      notification.info({
        message: `提示信息`,
        description:`您可以在【发布管理/已发布】中查看您的新闻`,
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
          {
            item.auditState===1&&  <Button type="primary" onClick={()=>{
              handleRemove(item)
            }}>撤销</Button>
          }
          {
            item.auditState===2&&  <Button type="primary" onClick={()=>{
              handPut(item)
            }}>发布</Button>
          }
          {
            item.auditState===3&&  <Button type="primary" onClick={()=>{
              handUpdate(item)
            }}>更新</Button>
          }
          
            
              
            
          
          </div>
        );
      },
    },
  ];


  return (
    <div>
    <Table
    dataSource={dataSource}
    columns={columns}
    pagination={{ pageSize: 5 }}
    rowKey={(item) => item.id}
  />
    </div>
  )
}
