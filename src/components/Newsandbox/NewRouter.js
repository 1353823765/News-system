import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UserList from "../../views/Newsandbox/uesr-manage/UserList";
import RightList from "../../views/Newsandbox/right-manage/RightList";
import RoleList from "../../views/Newsandbox/right-manage/RoleList";
import NotPremission from "../../views/Newsandbox/notpremission/NotPremission";
import Home from "../../views/Newsandbox/home/Home";
import NewAdd from "../../views/Newsandbox/news-manage/NewAdd";
import NewAudit from "../../views/Newsandbox/audit-manage/NewAudit";
import Nnpublished from "../../views/Newsandbox/publish-manage/Nnpublished";
import Published from "../../views/Newsandbox/publish-manage/Published";
import PublishedSunset from "../../views/Newsandbox/publish-manage/PublishedSunset";
import NewAuditList from "../../views/Newsandbox/audit-manage/NewAuditList";
import NewCategory from "../../views/Newsandbox/news-manage/NewCategory";
import NewDraft from "../../views/Newsandbox/news-manage/NewDraft";
import { useEffect } from "react";
import axios from "axios";
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewAdd,
  "/news-manage/draft": NewDraft,
  "/news-manage/category": NewCategory,
  "/audit-manage/audit": NewAudit,
  "/audit-manage/list": NewAuditList,
  "/publish-manage/unpublished": Nnpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": PublishedSunset,
};
export default function NewRouter() {
  const [Backlist, setBacklist] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get(`/rights`),
      axios.get(`/children`),
    ]).then((res) => {
      setBacklist([...res[0].data, ...res[1].data]);
    });
  }, []);
  const {role:{rights}}=JSON.parse(localStorage.getItem("token"))
  
  const checkRouter=(item)=>{
     return LocalRouterMap[item.key]&&item.pagepermisson
  }
  const checkNotPremission=(item)=>{
  return rights.includes(item.key)
  }
  return (
    <Switch>
      {Backlist.map((item) => {
        
        if(checkRouter(item)&&checkNotPremission(item)){
          return <Route
          path={item.key}
          key={item.key}
          component={LocalRouterMap[item.key]}
          exact
        ></Route>
        }
       return null
      })}
      <Redirect from="/" to="/home"></Redirect>
      {Backlist.length > 0 && (
        <Route path="*" component={NotPremission}></Route>
      )}
    </Switch>
  );
}
