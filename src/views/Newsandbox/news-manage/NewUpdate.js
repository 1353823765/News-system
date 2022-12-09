import React, { useState, useEffect, useRef } from "react";
import { PageHeader, Steps, Button, Form, Input, Select, message,notification } from "antd";
import style from "./NewAdd.module.css";
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
export default function NewAdd(props) {
  // const { Step } = Steps;
  const [current, setcurrent] = useState(0);
  const [selectlist, setselectlist] = useState([]);
  const [formInfo, setformInfo] = useState({});
  const [content, setContent] = useState("");
  const NewForm = useRef(null);
  const { Option } = Select;
  
  const  User=JSON.parse(localStorage.getItem("token"))
  const handNext = () => {
    if (current === 0) {
      NewForm.current
        .validateFields()
        .then((res) => {
          console.log(res);
          setcurrent(current + 1);
          setformInfo(res);
        })
        .catch((error) => console.log(error));
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("新闻内容不能为空!");
      } else {
        console.log(content, formInfo);
        setcurrent(current + 1);
      }
    }
  };

  const handBack = () => {
    setcurrent(current - 1);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //保存草稿箱
  const handleSave = (auditState) => {
    axios.post("/news", {
      ...formInfo,
      "content": content,
      "region": User.region?User.region:"全球" ,
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
   
      //"publishTime": 0,
    }).then(res=>{
      console.log(res)
      props.history.push(auditState===0?"/news-manage/draft":"/audit-manage/list")
      notification.info({
  
        message: `提示信息`,
        description:`您可以在${auditState===0?"草稿箱":"审核列表"}查看您的新闻`,
        placement:"bottomRight"
      });
    }
    )
  };
  useEffect(() => {
    axios.get("/categories").then((res) => {
      setselectlist(res.data);
      console.log(res.data);
    });
  }, []);
  useEffect(()=>{
    console.log(props.match.params.id)
axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
.then(res=>{let {title,categoryId,content}=res.data
 NewForm.current.setFieldsValue({
        title,categoryId
    })
    setContent(content)
}
    // setnewInfo(res.data)


    )



},[props.match.params.id])
  return (
    <div>
      <PageHeader
      onBack={()=>window.history.back()}
        title="更新新闻"
        subTitle="This is a subtitle"
        className="site-page-header"
        style={{ border: "1px solid rgb(235, 237, 240)" }}
      />

      <Steps
        style={{ marginTop: "20px" }}
        current={current}
        items={[
          {
            title: "基本信息",
            description: "新闻标题,新闻分类",
          },
          {
            title: "新闻内容",
            description: "新闻主题内容",
          },
          {
            title: "新闻提交",
            description: "保存草稿或提交审核",
          },
        ]}
      />
      <div style={{ marginTop: "50px" }}>
        {
          <div className={current === 0 ? "" : style.active}>
            <Form
              ref={NewForm}
              name="basic"
              // labelCol={{
              //   span: 2,
              // }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="新闻标题"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="新闻分类"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Select>
                  {selectlist.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
        }
        {
          <div className={current === 1 ? "" : style.active}>
            <NewsEditor
              getEditor={(value) => {
                setContent(value);
              }}
              content={content}
            ></NewsEditor>
          </div>
        }
        {<div className={current === 2 ? "" : style.active}></div>}
      </div>
      <div style={{ marginTop: "50px" }}>
        {current < 2 && (
          <Button type="primary" onClick={handNext}>
            下一步
          </Button>
        )}
        {current > 0 && (
          <Button type="primary" onClick={handBack}>
            上一步
          </Button>
        )}
        {current === 2 && (
          <span>
            <Button
              type="primary"
              onClick={() => {
                handleSave(0);
              }}
            >
              保存草稿箱
            </Button>
            <Button danger  onClick={() => {
              handleSave(1);
            }} >提交审核</Button>
          </span>
        )}
      </div>
    </div>
  );
}
