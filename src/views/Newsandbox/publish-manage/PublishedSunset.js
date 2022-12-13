
import React from "react";
import { Button,Tooltip } from "antd";
import {DeleteOutlined } from "@ant-design/icons";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import { usePublish} from "../../../components/publish-manage/usePublish";
export default function Published() {
  const { dataSource,handlePublishedSunset} = usePublish(3);
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(item)=>
        <Tooltip title="删除">
        <Button   onClick={()=>{handlePublishedSunset(item)
          
         }} type="primary"   danger shape="circle"  icon={<DeleteOutlined />} >
        </Button></Tooltip>

      }></NewsPublish>
    </div>
  );
}
