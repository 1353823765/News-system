import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  SyncOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Tag, Button, Table, Modal, Popover, Switch } from "antd";
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios.get("  /rights?_embed=children").then((res) => {
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
            <Popover
              title="页面配置项"
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checkedChildren="开启"
                    unCheckedChildren="关闭"
                    //checked设置后开关为受控组件通过改变状态来控制开关状态
                    checked={item.pagepermisson}
                    //通过onChange来实现控制checked的状态
                    onChange={() => {
                      switchMethod(item);
                    }}
                  />
                </div>
              }
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                disabled={item.pagepermisson === undefined ? true : false}
              >
                <EditOutlined />
              </Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  //开关状态函数
  const setPage = (item) => {
    if (item.pagepermisson === 1) {
      return (item.pagepermisson = 0), setdataSource([...dataSource]);
    }
    return (item.pagepermisson = 1), setdataSource([...dataSource]);
  };
  const switchMethod = (item) => {
    //第一个方法3目实现
    // item.pagepermisson=item.pagepermisson===1?0:1
    //setdataSource([...dataSource])
    //第2种方写一个函数实现
    setPage(item);
    if (item.grade === 1) {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    } else {
      axios.patch(`/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      });
    }
  };
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
        
      />
    </div>
  );
}
