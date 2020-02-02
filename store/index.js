import { combineReducers, createStore } from "../redux/index";
import counter from "./modules/counter/reducer";
import todos from "./modules/todos/reducer";

// create store
const rootReducer = combineReducers({ todos, counter });

let store = null;

export const getStore = () => {
  if (!store) {
    store = new createStore(rootReducer);
  }
  return store;
};
