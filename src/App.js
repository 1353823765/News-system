import React from 'react'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import IndexRouter from  "./router/IndexRouter"
import "./App.css"
import {store ,persistor}from './redux/store'
export default function App() {
  return (
    //Provider
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
  <IndexRouter></IndexRouter>
  </PersistGate>
   </Provider>
  )
}
