import React from 'react';
import ReactDOM from 'react-dom';
import Todolist from './components/Todolist';
import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store}>
    <Todolist />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));