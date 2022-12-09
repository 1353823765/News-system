import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  ToTopOutlined ,
  DeleteOutlined,
  FormOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, Tooltip } from "antd";
import { formatDate } from "./const-NewDraft";
export default function RightList( props) {
  const [dataSource, setdataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
 
  useEffect(() => {
    axios
      .get(`/news?author=${username}&auditState=0&_expand=category`)
      .then((res) => {
        const list = res.data;
        setdataSource(list);
      });
  }, [username]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render:(title,item)=>{
         return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: "作者",
      dataIndex: "author",
      
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
      
    },
    {
      title: "保存时间",
      dataIndex: "createTime",
      render: (createTime) => {
  const data=formatDate(createTime)
     return <div>{data}</div>
        },  
    },   
       
   
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Tooltip title="删除" color="red">
              <Button
                type="primary"
                shape="circle"
                danger
                ghost
                onClick={() => {
                  confirmMethod(item);
                }}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="修改" >
              <Button type="primary" shape="circle" onClick={()=>{
                 props.history.push(`/news-manage/update/${item.id}`)
                
              }}>
              <FormOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="提交">
              <Button type="primary" shape="circle">
              <ToTopOutlined />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  //开关状态函数
  // const setPage = (item) => {
  //   if (item.pagepermisson === 1) {
  //     return (item.pagepermisson = 0), setdataSource([...dataSource]);
  //   }
  //   return (item.pagepermisson = 1), setdataSource([...dataSource]);
  // };
  // const switchMethod = (item) => {
  //   //第一个方法3目实现
  //   // item.pagepermisson=item.pagepermisson===1?0:1
  //   //setdataSource([...dataSource])
  //   //第2种方写一个函数实现
  //   setPage(item);
  //   if (item.grade === 1) {
  //     axios.patch(`/rights/${item.id}`, {
  //       pagepermisson: item.pagepermisson,
  //     });
  //   } else {
  //     axios.patch(`/rights/${item.id}`, {
  //       pagepermisson: item.pagepermisson,
  //     });
  //   }
  // };
  //删除对话框
  const showPromiseConfirm = (item) => {
    confirm({
      title: `确定删除?`,
      icon: <WarningOutlined />,
      content: "点击OK按钮删除,点击Cancel按钮关闭对话框",
      onOk() {
        return new Promise((resolve) => {
          setTimeout(resolve(item), 5000);
        }).then((res) => delMethod(res));
      },
      onCancel() {},
    });
  };

  const { confirm } = Modal;
  const confirmMethod = (item) => {
    showPromiseConfirm(item);
    // console.log(item)
  };


  const delMethod = (item) => {
    console.log(item);
    if (item.grade === 1) {
      console.log(item);
      setdataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`/rights/${item.id}`);
    } else {
      console.log(item.rightId);
      let list = dataSource.filter((value) => value.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setdataSource([...dataSource]);
    }
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
      />
    </div>
  );
}
