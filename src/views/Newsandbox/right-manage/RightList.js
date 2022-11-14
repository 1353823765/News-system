import React, { useEffect, useState } from "react";

import axios from "axios";
import { SyncOutlined, DeleteOutlined, EditOutlined,ExclamationCircleOutlined  } from "@ant-design/icons";
import { Tag, Button  , Table, Modal } from "antd";
import Item from "antd/lib/list/Item";
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios.get("  http://localhost:5000/rights?_embed=children").then((res) => {
      console.log(res.data);
      //由于数组的第一项中的children这个字段为空但是他也会显示
      //我们先将这一项设置为空
      const list = res.data;
      // list[0].children = undefined;
      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = undefined;
        }
      });
      setdataSource(list);
    });
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (id) => {
        return (
          <Tag icon={<SyncOutlined spin />} color="#3b5999">
            {id}
          </Tag>
        );
      },
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
           {/* console.log(item) */}
            <Button type="primary" shape="circle" danger ghost onClick={()=>{confirmMethod(item)}}>
              <DeleteOutlined />
            </Button>
            <Button type="primary" shape="circle">
              <EditOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
//删除对话框
const showPromiseConfirm = () => {
  confirm({
    title: 'Do you want to delete these items?',
    icon: <ExclamationCircleOutlined />,
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
};
const { confirm } = Modal
 const confirmMethod=(item)=>{
  showPromiseConfirm()
  console.log(item)
  delMethod(item)
  }
  const delMethod=(item)=>{
      setdataSource(dataSource.filter((data)=>data.id!==item.id))
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
