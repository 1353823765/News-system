import React from 'react'
import { Provider } from 'react-redux'
import IndexRouter from  "./router/IndexRouter"
import "./App.css"
import store from './redux/store'
export default function App() {
  return (
    //Provider
   <Provider store={store}>
  <IndexRouter></IndexRouter>
   </Provider>
  )
}
