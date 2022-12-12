
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SyncOutlined,
  DeleteOutlined,
  EditOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Tag, Button, Table, Modal, Popover, Switch } from "antd";
export default function NewCategory() {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios.get("/categories").then((res) => {

      setdataSource(res.data);
     
      
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
      title: "栏目名称",
      dataIndex: "title",
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

  };
  
  const delMethod = (item) => {
      setdataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`/categories/${item.id}`);
    }
  
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
