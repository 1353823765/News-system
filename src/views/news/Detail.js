import React, { useEffect, useState } from "react";
import { Descriptions, PageHeader } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
export default function Detail(props) {
  const [newsInfo, setnewInfo] = useState(null);
  const publishlist = ["未发布", "已发布", "已上线", "已下线"];
  const publishcolor = ["red", "gold", "green", "red"];
  useEffect(() => {
    axios
      .get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
      .then((res) => {
        setnewInfo({
          ...res.data,
          view: res.data.view + 1,
        });
        return res.data;
      })
      .then((res) => {
        axios.patch(`/news/${props.match.params.id}`, {
          view: res.view + 1,
        });
      });
  }, [props.match.params.id]);
  const handleStar = () => {
    setnewInfo({
      ...newsInfo,
      star: newsInfo.star + 1,
    });
    axios.patch(`/news/${props.match.params.id}`, {
      star: newsInfo.star + 1,
    });
  };
  return (
    <div>
      {newsInfo && (
        <div>
          <PageHeader
            onBack={() => window.history.back()}
            ghost={false}
            title={newsInfo.title}
            subTitle={
              <div>
                {newsInfo.category.title}
                <HeartTwoTone
                  twoToneColor="#eb2f96"
                  onClick={() => {
                    handleStar();
                  }}
                />
              </div>
            }
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">
                {newsInfo.author}
              </Descriptions.Item>

              <Descriptions.Item label="发布时间">
                {newsInfo.publishTime
                  ? moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")
                  : "-"}
              </Descriptions.Item>

              <span style={{ color: publishcolor[newsInfo.publishState] }}>
                {publishlist[newsInfo.publishState]}
              </span>

              <Descriptions.Item label="访问数量">
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  {newsInfo.view}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="点赞数量">
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  {newsInfo.star}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="评论数量">
                {" "}
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  20110
                </span>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div
            dangerouslySetInnerHTML={{
              __html: newsInfo.content,
            }}
            style={{ border: "1px solid gray", margin: "0 24px" }}
          ></div>
        </div>
      )}
    </div>
  );
}
