// action types
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// todo store
const todoReducer = (function() {
  // initial state
  const initState = {
    list: []
  };
  // reducer
  const reducer = function(state = initState, action) {
    switch (action.type) {
      case ADD_TODO: {
        console.log("ADD_TODO before", state);
        const newState = {
          ...state,
          list: [...state.list, action.payload]
        };
        console.log("ADD_TODO after", newState);
        return newState;
      }
      case REMOVE_TODO: {
        console.log("REMOVE_TODO before", state);
        const newState = {
          ...state,
          list: state.list.filter(todo => todo !== action.payload)
        };
        console.log("REMOVE_TODO after", newState);
        return newState;
      }
      default:
        return state;
    }
  };
  return reducer;
})();

// create store
const store = createStore(combineReducers({ todo: todoReducer }));
console.log("## create store", store);

// subscribe callback 1
var fn1 = state => {
  console.log("## subscribe1", state);
};

// subscribe callback 2
var fn2 = state => {
  console.log("## subscribe2", state);
};

// subscribe callbacks
store.subscribe(fn1);
store.subscribe(fn2);

// dispatch add todo
store.dispatch({
  type: ADD_TODO,
  payload: "a"
});

// dispatch add todo
store.dispatch({
  type: ADD_TODO,
  payload: "b"
});

// unsubscribe callback 1
store.unsubscribe(fn1);

// dispatch add todo
store.dispatch({
  type: ADD_TODO,
  payload: "c"
});

// dispatch remove todo
store.dispatch({
  type: REMOVE_TODO,
  payload: "a"
});
