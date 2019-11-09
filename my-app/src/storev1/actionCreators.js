import { ADD_TODO_ITEM, CHANGE_INPUT_VALUE, DELETE_ITEM, INIT_LIST, GET_INIT_LIST} from './actionType';
import axios from 'axios';

export const deleteItem = (index) => ({
  type: DELETE_ITEM,
  value: index
})
export const changeInputValue = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})
export const addTodoItem = (value) => ({
  type: ADD_TODO_ITEM,
  value
})
export const initListAction = (value) => ({
  type: INIT_LIST,
  value
})
// export const getTodoList = () => {
//   return (dispatch) => {
//     axios.get('http://mock-api.com/9n6154gV.mock/api/todolist')
//     .then((res) => {
//       // console.log(res)
//       const data = res.data;
//       const action = initListAction(data);
//       dispatch(action);
//     })
//     .catch((error) => {
//       console.log('error'+error)
//     })
//   }
// }

export const getInitList = (value) => ({
  type: GET_INIT_LIST,
  value
})