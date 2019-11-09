import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO, DELETE_DONE , TODO_TO_DONE, DONE_TO_TODO } from './actionType'

const defaultState = {
  inputValue: '',
  list: ["makeup", "eating", "studying"],
  doneList: ["working"]
}

export default (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;  
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = '';
    return newState;  
  }
  if (action.type === DELETE_TODO) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1)
    return newState;  
  }
  if (action.type === DELETE_DONE) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.doneList.splice(action.index, 1)
    return newState;  
  }
  if (action.type === TODO_TO_DONE) {
    const newState = JSON.parse(JSON.stringify(state));
    const item = newState.list.splice(action.index, 1);
    newState.doneList.push(item);
    return newState;  
  }
  if (action.type === DONE_TO_TODO) {
    const newState = JSON.parse(JSON.stringify(state));
    const item = newState.doneList.splice(action.index, 1);
    newState.list.push(item);
    return newState;  
  }
  return state;
}