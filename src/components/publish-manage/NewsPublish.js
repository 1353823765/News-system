import React, { useEffect, useState } from "react";


import {


  WarningOutlined,
} from "@ant-design/icons";
import { Tag,Table, Modal,} from "antd";
export default function NewsPublish(props) {
const {dataSource}=props
// console.log(props)
  const columns = [
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title,item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
      },
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "新闻分类",
      dataIndex: "category",
      render: (category) => {
        return (
            <Tag color="geekblue" >{category.title}</Tag>
        
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            
            {props.button(item.id)}
        
          
          </div>
        );
      },
    },
  ];
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
