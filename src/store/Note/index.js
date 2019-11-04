import { createStore } from "redux";
import reducer from "./reducer";
import actions from "./actions";
export const Actions = actions;
export default createStore(reducer);
