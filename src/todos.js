import { getStore } from "../store";
import {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
  SET_FILTER,
  CLEAR_TODO
} from "../store/modules/todos/reducer";

class Todos {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.stateChange);
    this.prevState = this.store.getState();
  }
  init = () => {
    this.bindEvent();
    this.stateChange();
  };
  stateChange = () => {
    this.renderFilter();
    this.renderList();
    this.prevState = this.store.getState();
  };
  renderFilter = () => {
    const {
      todos: { filter }
    } = this.store.getState();

    const isCancelRender = (() => {
      return this.prevState.todos.filter === filter;
    })();

    if (isCancelRender) {
      return;
    }

    const $filterAll = document.querySelector("#todos-filter-all");
    const $filterComplete = document.querySelector("#todos-filter-completed");
    if (filter.type === "all") {
      $filterAll.classList.add("is--active");
      $filterComplete.classList.remove("is--active");
    } else {
      $filterAll.classList.remove("is--active");
      $filterComplete.classList.add("is--active");
    }
  };
  renderList = () => {
    const {
      todos: { list, filter }
    } = this.store.getState();

    const isCancelRender = (() => {
      return (
        this.prevState.todos.list === list &&
        this.prevState.todos.filter === filter
      );
    })();

    if (isCancelRender) {
      return;
    }

    let filterList = list;
    if (filter.type === "completed") {
      filterList = list.filter(item => {
        return item.isCompleted === true;
      });
    }
    const $count = document.querySelector("#todo-count");
    $count.innerHTML = `${filterList.length} / ${list.length}`;
    const $list = document.querySelector("#todos-list");
    const html = filterList
      .map(item => {
        return `<li class="${item.isCompleted ? "is--completed" : ""}">
                  <div class="text">${item.text}</div>
                  <div class="controls">
                    <button type="button" data-type="complete" data-id="${
                      item.id
                    }">${item.isCompleted ? "완료됨" : "미완료"}</button>
                    <button type="button" data-type="remove" data-id="${
                      item.id
                    }">삭제</button>
                  </div>
                </li>`;
      })
      .join("");

    $list.innerHTML = html;
  };
  handleSumit = e => {
    e.preventDefault();
    const $input = document.querySelector("#todos-input");
    const value = $input.value.trim();
    if (value.length === 0) {
      alert("1글자 이상 입력");
      return;
    }
    this.store.dispatch({
      type: ADD_TODO,
      payload: $input.value
    });
    $input.value = "";
  };
  handleListClick = e => {
    const { target } = e;
    if (target.tagName === "BUTTON") {
      const buttonType = target.getAttribute("data-type");
      const id = Number(target.getAttribute("data-id"));
      if (buttonType === "complete") {
        this.handleCompleteItem(id);
      }
      if (buttonType === "remove") {
        this.handleRemoveItem(id);
      }
    }
  };
  handleCompleteItem = id => {
    this.store.dispatch({
      type: COMPLETE_TODO,
      payload: id
    });
  };
  handleRemoveItem = id => {
    this.store.dispatch({
      type: REMOVE_TODO,
      payload: id
    });
  };
  handleSetFilterAll = () => {
    this.store.dispatch({
      type: SET_FILTER,
      payload: "all"
    });
  };
  handleSetFilterComplete = () => {
    this.store.dispatch({
      type: SET_FILTER,
      payload: "completed"
    });
  };
  handleClear = () => {
    this.store.dispatch({
      type: CLEAR_TODO
    });
  };
  bindEvent = () => {
    const $form = document.querySelector("#todos-form");
    const $list = document.querySelector("#todos-list");
    const $filterAll = document.querySelector("#todos-filter-all");
    const $filterComplete = document.querySelector("#todos-filter-completed");
    const $clear = document.querySelector("#todos-filter-clear");
    $form.addEventListener("submit", this.handleSumit);
    $list.addEventListener("click", this.handleListClick);
    $filterAll.addEventListener("click", this.handleSetFilterAll);
    $filterComplete.addEventListener("click", this.handleSetFilterComplete);
    $clear.addEventListener("click", this.handleClear);
  };
}

// 인스턴스 생성
const instance = new Todos(getStore());

export default instance.init;
