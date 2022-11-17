import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DeleteOutlined,
  WarningOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Button, Table, Modal, Tree } from "antd";
export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [treeData, settreeData] = useState([]);
  const [listSource, setlistSource] = useState([]);
  const [currentId,setcurrentId]=useState(0)
  useEffect(() => {
    axios.get("  http://localhost:5000/roles").then((res) => {
      console.log(res.data);
      //由于数组的第一项中的children这个字段为空但是他也会显示
      //我们先将这一项设置为空
      setdataSource(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("  http://localhost:5000/rights?_embed=children").then((res) => {
      console.log(res.data);
      //由于数组的第一项中的children这个字段为空但是他也会显示
      //我们先将这一项设置为空
      settreeData(res.data);
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
      title: "角色名称",
      dataIndex: "roleName",
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
            <Button
              type="primary"
              shape="circle"
              disabled={false}
              onClick={() => {
                showModal();
                console.log(item)
                setlistSource(item.rights);
                // console.log(item.rights);
                setcurrentId(item.id)
              }}
            >
              <AppstoreAddOutlined />
            </Button>
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
    console.log(item);
  };
  const delMethod = (item) => {
    console.log(item);
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`http://localhost:5000/roles/${item.id}`);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // console.log("dataSource",dataSource)
    // console.log("currentId",currentId)
    console.log("listSource",listSource)
    setdataSource( dataSource.map(item=>{
      if(item.id===currentId){
        return {
          ...item,
         rights:listSource
        }
      }return item
    }) 
    
)
   console.log(dataSource)
  axios.patch(`http://localhost:5000/roles/${currentId}`,
  {
    rights:listSource
  }
  ) 

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCheck = (checkedKeys) => {
    setlistSource(checkedKeys.checked);     
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 3 }}
        rowKey={(item) => item.id}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkStrictly={true}
          checkable
          onCheck={onCheck}
          checkedKeys={listSource}
          treeData={treeData}
        />
      </Modal>
    </div>
  );
}
