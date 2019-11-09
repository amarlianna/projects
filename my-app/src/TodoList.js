import React from 'react';
// import './style.css';
import 'antd/dist/antd.css'; 
import { Input, List } from 'antd';
import store from './store';
import { changeInputValue, addTodoItem, deleteItem, getTodoList, initListAction, getInitList } from './store/actionCreators';
import axios from 'axios';

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleValChange = this.handleValChange.bind(this)
    this.handleTodoClick = this.handleTodoClick.bind(this)
    this.handleDoneClick = this.handleDoneClick.bind(this)
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  handleItemDelete(index, list) {
    if (list === 'done') {
      const doneList = this.state.doneList.slice(0);
      doneList.splice(index,1); 
      this.setState({
        doneList: doneList
      })
    } else if (list === 'todo') {
      const action = deleteItem(index);
      store.dispatch(action);
    }
  }
  handleValChange(e) {
    const action = changeInputValue(e.target.value);
    store.dispatch(action);
  }
  handleAddTodo(inputVal) {
    const action = addTodoItem(inputVal);
    store.dispatch(action);
  }
  
  handleTodoClick(index) {
    const doneList = this.state.doneList.slice(0);
    const todoList = this.state.todoList.slice(0);
    doneList.push(todoList[index]);
    todoList.splice(index,1); // splice会改变原数组，返回被删除的数组
    this.setState({
      todoList: todoList,
      doneList: doneList
    })
  }
  handleDoneClick(index) {
    const doneList = this.state.doneList.slice(0);
    const todoList = this.state.todoList.slice(0);
    todoList.push(doneList[index]);
    doneList.splice(index,1); 
    this.setState({
      todoList: todoList,
      doneList: doneList
    })
  }
  componentDidMount() {
    // const action = getTodoList();
    // store.dispatch(action);

    // axios.get('http://mock-api.com/9n6154gV.mock/api/todolist')
    // .then((res) => {
    //   // console.log(res)
    //   const data = res.data;
    //   const action = initListAction(data);
    //   store.dispatch(action);
    // })

    const action = getInitList();
    store.dispatch(action); // 因为配置了saga 所以此时的action不仅store能收到 saga也能收到
  }

  render() {
    const inputVal = this.state.inputVal 
    const todoList = this.state.todoList 
    const doneList = this.state.doneList 
    return (
      <div className="todolist"  style={{margin:'10px', width:'300px'}}>
        <Header 
          inputVal={inputVal}
          handleValChange={this.handleValChange}
          handleAddTodo={this.handleAddTodo}
        />
        <Todo 
          inputVal={inputVal}
          todoList={todoList}
          handleTodoClick={this.handleTodoClick}
          handleItemDelete={this.handleItemDelete}
        />
        <Done 
          inputVal={inputVal}
          doneList={doneList}
          handleDoneClick={this.handleDoneClick}
          handleItemDelete={this.handleItemDelete}
        />
      </div>
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleEnter = this.handleEnter.bind(this)
  }
  handleChange(e) {
    console.log(this.input)
    this.props.handleValChange(e)
  }
  handleEnter(e) {
    if (e.keyCode === 13){
      console.log(e.target.value)
      this.props.handleAddTodo(e.target.value)
    }
  }
  render() {
    const inputVal = this.props.inputVal
    return (
      <div className="header">
        <span className="title">TodoList</span>
        <Input
          type="text"
          value={inputVal}
          onChange={this.handleChange}
          onKeyDown={this.handleEnter}
          placeholder="添加to do"
          ref = {(input) => {this.input = input}}
        />
      </div>
    )
  }
}
class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick= this.handleClick.bind(this)
    this.handleDeletClick= this.handleDeletClick.bind(this)
  }
  handleDeletClick(index) {
    this.props.handleItemDelete(index, 'todo')
  }
  handleClick(index) {
    console.log(index)
    this.props.handleTodoClick(index)
  }
  render() {
    const todoList = this.props.todoList
    const todoEle = 
    <List 
      size="large"
      header={<h2>正在进行 <span>{todoList.length}</span></h2>}
      bordered
      dataSource={todoList}
      renderItem={(item, index) => 
        (<List.Item key={item.toString()}>
          <div onClick={this.handleClick.bind(this, index)}>
            {item}
          </div>
          <div 
            onClick={this.handleDeletClick.bind(this, index)}
            style={{marginLeft: '150px'}}
          >
            删除
          </div>
        </List.Item>)
      }
    />
    
    // todoList.map((item, index)=>(
    //   <li key={item.toString()}>
    //     <span onClick={this.handleClick.bind(this, index)}>
    //       {item}
    //     </span>
    //     <span onClick={this.handleDeletClick.bind(this, index)}>
    //       删除
    //     </span>
    //   </li>
    // ))
    return (
      <div className="todo">
        {todoEle}
      </div>
    )
  }
}
class Done extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick= this.handleClick.bind(this)
    this.handleDeletClick= this.handleDeletClick.bind(this)
  }
  handleClick(index) {
    console.log(index)
    this.props.handleDoneClick(index)
  }
  handleDeletClick(index) {
    this.props.handleItemDelete(index, 'done')
  }
  render() {
    const doneList = this.props.doneList
    const doneEle = doneList.map((item, index)=>(
      <li key={item.toString()}>
        <span onClick={this.handleClick.bind(this, index)}>
          {item}
        </span>
        <span onClick={this.handleDeletClick.bind(this, index)}>
          删除
        </span>
      </li>
    ))
    return (
      <div className="todo">
        <h2>已经完成 <span>{doneList.length}</span></h2>
        <ul>
          {doneEle}
        </ul>
      </div>
    )
  }
}


export default TodoList;