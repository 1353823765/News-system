import NewsPublish from "../../../components/publish-manage/NewsPublish";
import { Button,Tooltip } from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {usePublish} from "../../../components/publish-manage/usePublish";
export default function Nnpublished() {
  const { dataSource,handleNnpublished} = usePublish(1);
  return (
    <div>
    <NewsPublish dataSource={dataSource}  button={(id)=><Tooltip title="发布">
    <Button onClick={()=>{handleNnpublished(id)}}   type="primary" shape="circle"   icon={<CheckOutlined />}>
    </Button></Tooltip>} ></NewsPublish> 
    </div>
  );
}
