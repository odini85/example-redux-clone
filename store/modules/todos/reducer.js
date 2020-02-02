// action types
export const SET_FILTER = "todos/SET_FILTER";
export const ADD_TODO = "todos/ADD_TODO";
export const REMOVE_TODO = "todos/REMOVE_TODO";
export const CLEAR_TODO = "todos/CLEAR_TODO";
export const COMPLETE_TODO = "todos/COMPLETE_TODO";

// initial state
const initState = {
  id: 0,
  filter: {
    type: "all"
  },
  list: []
};
// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return {
        ...state,
        filter: {
          ...state.filter,
          type: action.payload
        }
      };
    }
    case ADD_TODO: {
      const newState = {
        ...state,
        id: state.id + 1,
        list: [
          {
            id: state.id,
            text: action.payload,
            isCompleted: false,
            timestamp: Math.floor(new Date().valueOf() / 1000)
          },
          ...state.list
        ]
      };
      return newState;
    }
    case REMOVE_TODO: {
      const newState = {
        ...state,
        list: state.list.filter(({ id }) => id !== action.payload)
      };
      return newState;
    }
    case CLEAR_TODO: {
      return {
        ...state,
        list: state.list.length === 0 ? state.list : []
      };
    }
    case COMPLETE_TODO: {
      const newState = {
        ...state,
        list: state.list.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              isCompleted: !item.isCompleted
            };
          } else {
            return item;
          }
        })
      };
      return newState;
    }
    default:
      return state;
  }
}
