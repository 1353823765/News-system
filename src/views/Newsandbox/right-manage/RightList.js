import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { SyncOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Button } from "antd";
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios.get("  http://localhost:5000/rights?_embed=children").then((res) => {
      console.log(res.data);
      //由于数组的第一项中的children这个字段为空但是他也会显示
      //我们先将这一项设置为空
       const list = res.data;
      // list[0].children = undefined;
       list.forEach(item=>{
        if(item.children.length===0){
          item.children=undefined
        }
       })
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
      render: () => {
        return (
          <div>
            <Button type="primary" shape="circle" danger ghost>
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
