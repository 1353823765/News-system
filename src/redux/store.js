import {legacy_createStore,combineReducers} from "redux"
import { Collapsereducer } from "../redux/reducers/CollapsedReducer"


// CollapserReducer
//合并reducer为了更好的管理reducers
  const reducers= combineReducers({Collapsereducer})
    
const store=legacy_createStore(reducers)
export default store