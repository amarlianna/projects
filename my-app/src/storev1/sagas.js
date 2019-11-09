import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { initListAction } from './actionCreators';

function* initList() {
  try {
    const res = yield axios.get('http://mock-api.com/9n6154gV.mock/api/todolist');
    const action = initListAction(res.data);
    yield put(action);
  } catch(e) {

  }
}

function* todoSagas() {
  yield takeEvery("get_init_list", initList); // saga接受到“get_init_list”的action后，就触发initList函数
}

export default todoSagas;