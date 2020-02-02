// action types
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// todo store
const todoStore = (function() {
  // initial state
  const initState = {
    list: []
  };
  // reducer
  const reducer = function(state = initState, action) {
    switch (action.type) {
      case ADD_TODO:
        console.log("reducer ADD_TODO", action);
        return {
          ...state,
          list: [...state.list, action.payload]
        };
      case REMOVE_TODO:
        console.log("reducer REMOVE_TODO", action);
        return {
          ...state,
          list: state.list.filter(todo => todo !== action.payload)
        };
      default:
        return state;
    }
  };
  // create store
  const store = createStore(reducer);
  return store;
})();

// subscribe callback 1
var fn1 = state => {
  console.log("## subscribe1", state);
};

// subscribe callback 2
var fn2 = state => {
  console.log("## subscribe2", state);
};

// subscribe callbacks
todoStore.subscribe(fn1);
todoStore.subscribe(fn2);

// dispatch add todo
todoStore.dispatch({
  type: ADD_TODO,
  payload: "a"
});

// dispatch add todo
todoStore.dispatch({
  type: ADD_TODO,
  payload: "b"
});

// unsubscribe callback 1
todoStore.unsubscribe(fn1);

// dispatch add todo
todoStore.dispatch({
  type: ADD_TODO,
  payload: "c"
});

// dispatch remove todo
todoStore.dispatch({
  type: REMOVE_TODO,
  payload: "a"
});
