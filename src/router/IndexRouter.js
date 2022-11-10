import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/Login/Login'
import NewsSandBox from '../views/Newsandbox/NewsSandBox'
export default function IndexRouter() {
  return (
    <HashRouter>
    <Switch>
       <Route path='/login' component={Login}></Route>
       <Route path='/' render={()=>
        localStorage.getItem("token")?
        <NewsSandBox></NewsSandBox>:<Redirect to="/login" ></Redirect>}>
        </Route>
        
       </Switch>
    </HashRouter>
  )
}
