import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO, DELETE_DONE, TODO_TO_DONE, DONE_TO_TODO } from './actionType'

export const changeInputValue = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
}) 
export const addTodoItem = () => ({
  type: ADD_TODO_ITEM
})
export const deleteTodo = (index) => ({
  type: DELETE_TODO,
  index
}) 
export const deleteDone = (index) => ({
  type: DELETE_DONE,
  index
})
export const todoToDone = (index) => ({
  type: TODO_TO_DONE,
  index
}) 
export const doneToTodo = (index) => ({
  type: DONE_TO_TODO,
  index
}) 
