import {legacy_createStore} from "redux"
import { persistedReducer } from "./reducers/rootReducer"
import { persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage' 
//合并reducer为了更好的管理reducers
// const persistConfig = {
//     key: 'rootReducers',
//     storage,
//   }
  
//   const persistedReducer = persistReducer(persistConfig, rootReducers)
const store=legacy_createStore(persistedReducer)
let persistor = persistStore(store)
export { store,persistor}
