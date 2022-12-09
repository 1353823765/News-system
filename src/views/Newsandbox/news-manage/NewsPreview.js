import React ,{useEffect, useState}from 'react'
import {  Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment';
export default function NewsPreview(props) {
const [newsInfo,setnewInfo]=useState(null)
const   auditlist=["未审核","审核中","已通过","未通过"]
const auditcolor=["red","yellow","green","red"]
const publishlist=["未发布","已发布","已上线","已下线"]
const publishcolor=["red","yellow","green","red"]
    useEffect(()=>{
        console.log(props.match.params.id)
 axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
 .then(res=>setnewInfo(res.data))
 

    },[props.match.params.id])
    console.log(newsInfo)
  return (
    <div>
    {
        newsInfo&&<div>
        <PageHeader
        onBack={() => window.history.back()}
        ghost={false}
        title={newsInfo.title}
        subTitle={newsInfo.category.title}
      
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="发布时间">{
            newsInfo.publishTime?moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss"):"-"
          }</Descriptions.Item>
          <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
          <Descriptions.Item label="审核状态" >
       <span style={{"color":auditcolor[newsInfo.auditState]}}>   {
            auditlist[newsInfo.auditState]
        }</span></Descriptions.Item>
          <Descriptions.Item label="发布状态">
      <span style={{"color":publishcolor[newsInfo.publishState]}}>
        {publishlist[newsInfo.publishState]}</span>  
          </Descriptions.Item>
          <Descriptions.Item label="访问数量"><span style={{"color":"green","fontWeight":"bolder"}}>{newsInfo.view}</span></Descriptions.Item>
          <Descriptions.Item label="点赞数量"><span style={{"color":"green","fontWeight":"bolder"}}>{newsInfo.star}</span></Descriptions.Item>
          <Descriptions.Item label="评论数量"> <span style={{"color":"green","fontWeight":"bolder"}}>20110</span></Descriptions.Item>
        </Descriptions>
      </PageHeader>  
      <div dangerouslySetInnerHTML={{
        __html:newsInfo.content
      }} style={{"border":"1px solid gray","margin":"0 24px"}}>

      </div>
        </div>
    }
    </div>
  )
}


