import React from 'react';
import ReactDOM from 'react-dom';
// import TodoList from './TodoList';
// import Animation from './Animation';
import TodoListv2 from './TodoListv2';
import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store}>
    <TodoListv2 />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
