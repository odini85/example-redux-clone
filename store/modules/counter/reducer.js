// action types
export const INCREASE = "counter/INCREASE";
export const DECREASE = "counter/DECREASE";

// initial state
const initState = {
  count: 0
};
// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREASE: {
      const newState = {
        count: state.count + 1
      };
      return newState;
    }
    case DECREASE: {
      const newState = {
        count: state.count - 1
      };
      return newState;
    }
    default:
      return state;
  }
}
