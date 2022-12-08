// import { Tag, Button, Table, Modal, Popover, Switch } from "antd";
// import {
//     SyncOutlined,
//     DeleteOutlined,
//     EditOutlined,
//     WarningOutlined,
//   } from "@ant-design/icons";
// export  const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       render: (id) => {
//         return <b>{id}</b>;
//       },
//     },
//     {
//       title: "新闻标题",
//       dataIndex: "title",
//     },
//     {
//       title: "作者",
//       dataIndex: "author",
//       render: (id) => {
//         return (
//           <Tag icon={<SyncOutlined spin />} color="#3b5999">
//             {id}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: "新闻分类",
//       dataIndex: "category",
//       render: (category) => {
//         return category.title;
//       },
//     },
//     {
//       title: "操作",
//       render: (item) => {
//         return (
//           <div>
//             <Button
//               type="primary"
//               shape="circle"
//               danger
//               ghost
//               onClick={() => {
//                 confirmMethod(item);
//               }}
//             >
//               <DeleteOutlined />
//             </Button>

//             <Button
//               type="primary"
//               shape="circle"
//               disabled={item.pagepermisson === undefined ? true : false}
//             >
//               <EditOutlined />
//             </Button>
//             <Button>提交审核</Button>
//           </div>
//         );
//       },
//     },
//   ];
 