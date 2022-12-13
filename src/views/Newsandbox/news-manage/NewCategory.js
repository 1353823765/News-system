import axios from "axios";
import { Button, Form, Input, Table, Modal } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons";
export default function NewCategory() {
  const [dataSource, setdataSource] = useState([]);
  const EditableContext = React.createContext(null);
  useEffect(() => {
    axios.get("/categories").then((res) => {
      setdataSource(res.data);
    });
  }, []);
  const handleSave = (record) => {
    console.log(record);
    setdataSource(
      dataSource.map((item) => {
        if (item.id === record.id) {
          return {
            id: item.id,
            title: record.title,
            value: record.title,
          };
        }
        return item;
      })
    );
    axios.patch(`/categories/${record.id}`, {
      title: record.title,
      value: record.title,
    });
  };
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
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "栏目名称",
        handleSave: handleSave,
      }),
    },

    {
      title: "操作",
      render: (item) => {
        return (
          <div>
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
  // const setPage = (item) => {
  //   if (item.pagepermisson === 1) {
  //     return (item.pagepermisson = 0), setdataSource([...dataSource]);
  //   }
  //   return (item.pagepermisson = 1), setdataSource([...dataSource]);
  // };
  // const switchMethod = (item) => {
  //第一个方法3目实现
  // item.pagepermisson=item.pagepermisson===1?0:1
  //setdataSource([...dataSource])
  //第2种方写一个函数实现
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
  };

  const delMethod = (item) => {
    setdataSource(dataSource.filter((data) => data.id !== item.id));
    axios.delete(`/categories/${item.id}`);
  };
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(item) => item.id}
        components={components}
      />
    </div>
  );
}
