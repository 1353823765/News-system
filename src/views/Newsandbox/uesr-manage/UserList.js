import React, { useEffect, useState, useRef } from "react";
import Userform from "../../../components/user-manage/Userform";
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
  const [openMoadl, setopenMoadl] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [regionsList, setregionsList] = useState([]);
  const addForm = useRef(null);
  const { confirm } = Modal;
  
  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      console.log(res.data);
      const list = res.data;
      setdataSource(list);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      console.log(res.data);
      const list = res.data;
      setroleList(list);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      console.log(res.data);
      const list = res.data;
      setregionsList(list);
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
      render: (roleState, item) => {
        // console.log(item);
        console.log(roleState)
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            //checked设置后开关为受控组件通过改变状态来控制开关状态
            checked={roleState}
            disabled={item.default}

            //通过onChange来实现控制checked的状态
            onChange={() => {
              switchMethod(item);
            }}
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
  
  const showPromiseConfirm = (item) => {
    confirm({
      title: `确定删除?`,
      icon: <WarningOutlined />,
      content: "点击OK按钮删除,点击Cancel按钮关闭对话框",
      onOk() {
        return new Promise((resolve) => {
          setTimeout(resolve(item), 5000);
        })
          .then((res) => delMethod(res))
          .catch((res) => console.log(res));
      },
      onCancel(){},
    });
  };

  const confirmMethod = (item) => {
    showPromiseConfirm(item);
    //  console.log(item)
  };
  //删除数据同步给后端
  const delMethod = (item) => {
    // console.log(item);
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/users/${item.id}`);
  };
  //用户状态控制
  const switchMethod=(item)=>{
    console.log(item.roleState)
    item.roleState=!item.roleState
    setdataSource([...dataSource])
    axios.patch(`http://localhost:5000/users/${item.id}`,{
      roleState:item.roleState
    })
  }
    //设置表单添加数据功能
const setaddForm = () => {
  addForm.current.validateFields().then((value) => {
    setopenMoadl(false);
    //重置表单项中的数据
    addForm.current.resetFields();
    axios
      .post(`http://localhost:5000/users`, {
        ...value,
        roleState: true,
        default: false,
      })
      .then((res) => {
        setdataSource([
          ...dataSource,
          {
            ...res.data,
            role: roleList.filter((item) => item.id === value.roleId)[0],
          },
        ]);
      });
  });
};

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setopenMoadl(true);
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
        rowKey={(item) => item.id}
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
          setaddForm();
        }}
      >
        <Userform
          ref={addForm}
          roleList={roleList}
          regionsList={regionsList}
        ></Userform>
      </Modal>
    </div>
  );
}
