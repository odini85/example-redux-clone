import { getStore } from "../store";
import { INCREASE, DECREASE } from "../store/modules/counter/reducer";

class Counter {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.stateChange);
  }
  init = () => {
    this.bindEvent();
    this.stateChange();
  };
  stateChange = () => {
    this.render();
  };
  render = () => {
    const $count = document.querySelector("#count");
    const {
      counter: { count }
    } = this.store.getState();

    $count.innerHTML = count;
  };
  handleIncrease = () => {
    this.store.dispatch({ type: INCREASE });
  };
  handleDecrease = () => {
    this.store.dispatch({ type: DECREASE });
  };
  bindEvent = () => {
    const $increase = document.querySelector("#counter-increase");
    const $decrease = document.querySelector("#counter-decrease");
    $increase.addEventListener("click", this.handleIncrease);
    $decrease.addEventListener("click", this.handleDecrease);
  };
}
// 인스턴스 생성
const instance = new Counter(getStore());

export default instance.init;
