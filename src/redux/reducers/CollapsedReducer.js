import { Collapseds } from "../constants/constant";
 export const Collapsereducer = (state = { isCollapsed: false }, action = {}) => {
  const { type } = action;
  let tureCollapsed = { ...state };
  switch (type) {
    case Collapseds:
      tureCollapsed.isCollapsed = !state.isCollapsed;
      return tureCollapsed;
    default:
      return tureCollapsed;
  }
};

