import { Pie } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
export const DemoPie = () => {
  const { username } = JSON.parse(localStorage.getItem("token"));
  const [allList, setallList] = useState([]);
  useEffect(() => {
    axios
      .get("/news?publishState=2&_expand=category")
      .then((res) => setallList(res.data));
  }, []);
  var currentList = allList.filter((item) => item.author === username);
  var groupObj = _.groupBy(currentList, (item) => item.category.title);
  var List = [];
  for (var i in groupObj) {
    List.push({
      type: i,
      value: groupObj[i].length,
    });
  }
  const data = List;
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 30,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
