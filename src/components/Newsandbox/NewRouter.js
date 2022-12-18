import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import {  Spin } from 'antd';
import axios from "axios";
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
import NewUpdate from "../../views/Newsandbox/news-manage/NewUpdate";
import NewCategory from "../../views/Newsandbox/news-manage/NewCategory";
import NewDraft from "../../views/Newsandbox/news-manage/NewDraft";
import NewsPreview from "../../views/Newsandbox/news-manage/NewsPreview";
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewAdd,
  "/news-manage/draft": NewDraft,
 "/news-manage/preview/:id":NewsPreview,
"/news-manage/update/:id":NewUpdate,
  "/news-manage/category": NewCategory,
  "/audit-manage/audit": NewAudit,
  "/audit-manage/list": NewAuditList,
  "/publish-manage/unpublished": Nnpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": PublishedSunset,
};
 function NewRouter(props) {
  
  const {isLoading}=props
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
     return LocalRouterMap[item.key]&&(item.pagepermisson||item.routepermisson)
  }
  const checkNotPremission=(item)=>{
  return rights.includes(item.key)
  }
 
  return (
    <Spin size="large"  spinning={isLoading}>
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
      {Backlist.length > 0 && (
        <Route path="*" component={NotPremission}></Route>
      )}
      <Redirect from="/" to="/home" exact></Redirect>
      
    </Switch>
    </Spin>
  )
}
const mapStateToProps = (state, ownProps) => {
 
return {
  isLoading:state.LoadingReducer.isLoading
}
}
 export default connect(mapStateToProps)(NewRouter)