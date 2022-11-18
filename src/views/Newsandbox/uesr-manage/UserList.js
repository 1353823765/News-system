import React, { useEffect, useState } from "react";
import Userform from "../../../components/user-manage/Userform";
import axios from "axios";
import {SyncOutlined, DeleteOutlined,  EditOutlined,  WarningOutlined,} from "@ant-design/icons";
import {Tag, Button,Table,  Modal,Popover,Switch,} from "antd";  
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  const [openMoadl, setopenMoadl] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      console.log(res.data);
      const list = res.data;
      setdataSource(list);
    });
  }, []);
  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b>;
      },
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      render: (id) => {
        return (
          <Tag icon={<SyncOutlined spin />} color="#3b5999">
            {id}
          </Tag>
        );
      },
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState,item) => {
        // console.log(item);
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            //checked设置后开关为受控组件通过改变状态来控制开关状态
            checked={roleState}
            disabled={item.default}

            //通过onChange来实现控制checked的状态
            // onChange={() => {
            //   switchMethod(item);
            // }}
          />
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
              disabled={item.default}
              onClick={() => {
                confirmMethod();
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
                    disabled={item.default}
                    //checked设置后开关为受控组件通过改变状态来控制开关状态
                    // checked={item.pagepermisson}
                    //通过onChange来实现控制checked的状态
                    // onChange={() => {
                    //   switchMethod(item);
                    // }}
                  />
                </div>
              }
              trigger={item.default ? "" : "click"}
            >
              <Button type="primary" shape="circle" disabled={item.default}>
                <EditOutlined />
              </Button>
            </Popover>
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
  //     axios.patch(`http://localhost:5000/rights/${item.id}`, {
  //       pagepermisson: item.pagepermisson,
  //     });
  //   } else {
  //     axios.patch(`http://localhost:5000/rights/${item.id}`, {
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
  const confirmMethod = () => {
    showPromiseConfirm();
    // console.log(item)
  };

  const delMethod = (item) => {
    // console.log(item);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setopenMoadl(true)
          
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        //报警告Warning: Each child in a list should have a unique "key" prop.
        // 设置一个key值给Table组件通过rowKey
        rowKey={(item)=>item.id}
      />
      <Modal
        open={openMoadl}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setopenMoadl(false);
        }}
        onOk={() => {
          setopenMoadl(false);
        }}
      >
      <Userform></Userform> 
      </Modal>
    </div>
  );
}
