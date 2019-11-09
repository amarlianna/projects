import React from 'react'
import { connect } from 'react-redux';

const TodoListv2 = (props) => {
  const { inputValue, changeInputValue, addListItem, list } = props;
  return (
    <div>
      <div>
        <input 
          value={inputValue}
          onChange={changeInputValue}  
        />
        <button
          onClick={addListItem}
        >提交</button>
      </div>
      <ul>
        {
          list.map((item, index) => (
            <li>{item}</li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    },
    addListItem() {
      const action = {
        type: 'add_list_item'
      }
      dispatch(action)
    }
  }
}

// 把组件和store做连接，并传入连接规则
// mapStateToProps：把store里的state映射到组件里的props
// mapDispatchToProps: 改变store的内容,就要调用store.dispatch。这里把store.dispatch映射到props上
export default connect(mapStateToProps, mapDispatchToProps)(TodoListv2);
// 这里TodoListv2只是UI组件，connect把它和逻辑组合，返回一个容器组件