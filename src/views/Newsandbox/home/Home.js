import React ,{useEffect, useState,useRef}from 'react'
import { Card, Col, Row,List, Avatar, Button, Drawer, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import _ from "lodash"
import *as ECharts  from 'echarts';
export default function Home() {
  const  [viewList,setviewList]=useState([])
  const [starList,setstarList]=useState([])
  const {username,region,role:{roleName}}=JSON.parse(localStorage.getItem("token"))
  const  barView=useRef()
  const pieView=useRef()
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    axios.get(`/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6`).then
    (res=>setviewList(res.data))
    
  },[])
  useEffect(()=>{
    
     axios.get("/news?publishState=2&_expand=category").then(res=>
      renderBarView(_.groupBy(res.data,item=>item.category.title)))
      return ()=>{
        window.onresize=null
      }
  },[])
  const renderBarView=(obj)=>{
    var myChart = ECharts .init(barView.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel:{
          rotate:"45",
          interval:"0"
        }
      },
      yAxis: { minInterval: 1},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item=>item.length)
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.onresize=()=>{
     
      myChart.resize()
    }
  }
  const renderPieView=()=>{
    var myChart = ECharts.init(pieView.current);
    var option;
    
    option = {
      title: {
        text: '个人新闻',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    option && myChart.setOption(option);
    
  }
  useEffect(()=>{
    axios.get(`/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6`).then
    (res=>setstarList(res.data))
  },[])
  const { Meta } = Card;
  return (
    <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="用户最常浏览" bordered={true}>
        <List
        size="small"
        dataSource={viewList}
        renderItem={(item) => <List.Item>
          <a href={`#/news-manage/preview/${item.id}`}> {item.title}</a></List.Item>}
      />
        </Card>
      </Col>
      <Col span={8}>
      <Card title="点赞最多" bordered={true}>
      <List
      size="small"
    

      dataSource={starList}
      renderItem={(item) => <List.Item>  <a href={`#/news-manage/preview/${item.id}`}> {item.title}</a></List.Item>}
    />
      </Card>
      </Col>
      <Col span={8}>
      <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting"  onClick={()=>
          {
        
         setTimeout(()=>{
          setOpen(true)
         renderPieView()},0)
        }} />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title={username}
        description={
          <div>
          <b>{region?region:"全球"}</b>
        <span style={{"paddingLeft":"30px"}}> {roleName}</span> 
          </div>
        }
      />
    </Card>
      </Col>
    </Row>
    <Drawer
    title="个人新闻分类"
    placement="right"
    width={500}
    onClose={onClose}
    open={open}
    closable={true}
  >
  <div ref={pieView} style={{height:"400px",marginTop:"30px",width:"100%"}}></div>
  </Drawer>
    <div ref={barView} style={{height:"400px",marginTop:"30px",width:"100%"}}></div>
  </div>
  )
}

