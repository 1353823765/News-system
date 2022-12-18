import { combineReducers } from "redux";
import { Collapsereducer } from "./CollapsedReducer";
import { LoadingReducer } from "./LoadingReducer";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'rootReducers',
  storage,
  blacklist: ['LoadingReducer']
}
 const rootReducers = combineReducers({
  Collapsereducer,LoadingReducer
});
  const persistedReducer = persistReducer(persistConfig, rootReducers)
  export {persistedReducer}