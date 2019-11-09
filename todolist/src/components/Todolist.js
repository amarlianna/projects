import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import ListItem from './ListItem';

import { changeInputValue, addTodoItem, deleteTodo, deleteDone, todoToDone, doneToTodo } from '../store/actionCreators'

const Todolist = (props) => {
  const { inputValue, list, doneList, handleChange, addListItem, deleteItem, itemClick} = props;
  return (
    <div>
      <Header 
        inputValue={inputValue}
        handleChange={handleChange}
        addListItem={addListItem}
      />
      <ListItem 
        todoTitle="Todos"
        list={list}
        deleteItem={deleteItem}
        itemClick={itemClick}
      />
      <ListItem 
        todoTitle="Dones"
        list={doneList}
        deleteItem={deleteItem}
        itemClick={itemClick}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list,
    doneList: state.doneList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange(e) {
      const action = changeInputValue(e.target.value);
      dispatch(action);
    },
    addListItem() {
      const action = addTodoItem();
      dispatch(action);
    },
    deleteItem(index, todoTitle) {
      console.log(index, todoTitle)
      if (todoTitle === 'Todos') {
        const action = deleteTodo(index);
        dispatch(action);
      } else if (todoTitle === 'Dones') {
        const action = deleteDone(index);
        dispatch(action);
      }
    },
    itemClick(index, todoTitle) {
      if (todoTitle === 'Todos') {
        const action = todoToDone(index);
        dispatch(action);
      } else if (todoTitle === 'Dones') {
        const action = doneToTodo(index);
        dispatch(action);
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);