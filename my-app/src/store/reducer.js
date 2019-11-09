import { ADD_TODO_ITEM, CHANGE_INPUT_VALUE, DELETE_ITEM, INIT_LIST } from './actionType';

const defaultState = {
  inputVal: '',
  todoList: [],
  doneList: [],
  test: ''
}

// reducer 可以接收state，但是绝不能修改state
export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputVal = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.todoList = [...state.todoList, action.value];
    newState.inputVal = '';
    return newState;
  }
  if (action.type === INIT_LIST) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.todoList = action.value;
    return newState;
  }
  if (action.type === DELETE_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.todoList.splice(action.value, 1);
    return newState;
  }
  return state;
}