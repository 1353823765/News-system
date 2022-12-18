
import { isLoading } from "../constants/constant";
export const LoadingReducer = (state = { isLoading: false }, action ) => {
 const { type,pyload } = action;
 let newLoading = { ...state };
 switch (type) {
   case isLoading:
    newLoading.isLoading = pyload
     return newLoading;
   default:
     return newLoading;
 }
};