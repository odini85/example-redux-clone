class Redux {
  constructor(reducer) {
    this.__init(reducer);
  }
  // 초기화
  __init(reducer) {
    if (typeof reducer === "function") {
      this.__reducer = reducer;
      this.__state = reducer(undefined, "reducer init!!");
    }
  }
  // 상태
  __state = null;
  // 구독 콜백 리스트
  __subscribers = [];
  // 리듀서
  __reducer = function() {};
  // 구독 콜백 리스트 호출
  __notify() {
    this.__subscribers.forEach(fn => {
      fn(this.getState());
    });
  }
  // 상태 반환
  getState() {
    return this.__state;
  }
  // 구독 등록
  subscribe(fn) {
    this.__subscribers.push(fn);
  }
  // 구독 취소
  unsubscribe(removeFn) {
    this.__subscribers = this.__subscribers.filter(fn => removeFn !== fn);
  }
  // 상태 변이
  dispatch(action) {
    this.__state = this.__reducer(this.getState(), action);
    this.__notify();
  }
}

function combineReducers(reducers) {
  const mergeReducer = {};
  for (let key in reducers) {
    mergeReducer[key] = reducers[key];
  }

  return function(state = {}, action) {
    console.log("##", mergeReducer);
    console.log("combine state", state);
    for (let key in mergeReducer) {
      state[key] = mergeReducer[key](state[key], action);
    }
    return state;
  };
}

// 스토어 생성
function createStore(reducer) {
  if (typeof reducer === "function") {
    return new Redux(reducer);
  }
}
