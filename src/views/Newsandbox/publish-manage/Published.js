import React from "react";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import { Button,Tooltip } from "antd";
import {VerticalAlignBottomOutlined } from "@ant-design/icons";
import {usePublish} from "../../../components/publish-manage/usePublish";
export default function Published() {
  const { dataSource,handlePublished} = usePublish(2);
  return (
    <div>
      <NewsPublish dataSource={dataSource}  button={(item)=><Tooltip title="下线">
      <Button onClick={()=>{handlePublished(item)}}  type="primary" shape="circle"  icon={<VerticalAlignBottomOutlined />}>
      </Button></Tooltip>} ></NewsPublish> 
    </div>
  );
}
