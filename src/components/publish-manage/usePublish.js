import  { useState,useEffect } from 'react'
import {notification} from "antd"
import axios from 'axios'
export function usePublish(type){
    const [dataSource,setdataSource]=useState([])
        const {username}=JSON.parse(localStorage.getItem("token"))
        useEffect(()=>{
            axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(
              res=>setdataSource(res.data)
            )
          },[username,type])
          //发布
          const handleNnpublished=(id)=>{
         setdataSource(dataSource.filter(item=>item.id!==id)) 
         axios.patch(`/news/${ id}`,{
          
          "publishState":2,
          "publishTime":Date.now()
        }).then(res=>{
          notification.info({
            message: `通知`,
            description:`您可以在【发布管理/已发布】中查看您的新闻状态`,
            placement:"bottomRight"
          });
      
        })
           }
           //下线
           const handlePublished=(id)=>{
            setdataSource(dataSource.filter(item=>item.id!==id))
            axios.patch(`/news/${ id}`,{
          
              "publishState":3,
           
            }).then(res=>{
              notification.info({
                message: `通知`,
                description:`您可以在【发布管理/已下线】中查看您的新闻状态`,
                placement:"bottomRight"
              });
          
            })
           }
           //删除
           const handlePublishedSunset=(id)=>{
            setdataSource(dataSource.filter(item=>item.id!==id))
            axios.delete(`/news/${ id}`).then(res=>{
              notification.info({
                message: `通知`,
                description:`您已经删除了已下线的新闻`,
                placement:"bottomRight"
              });
          
            })
           }
          return {
            dataSource,handleNnpublished,handlePublished,handlePublishedSunset
          }
}





