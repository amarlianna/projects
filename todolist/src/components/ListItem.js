import React from 'react';

const ListItem = (props) => {
  const { list, deleteItem, todoTitle, itemClick } = props;
  return (
    <div>
      <h2>{todoTitle}</h2>
      <ul>
        {
          list.map((item, index) => (
            <li key={item.toString()}>
              <span 
                style={{display: 'inline-block', width:'200px'}}
                onClick={itemClick.bind(this, index, todoTitle)}
              >{item}</span>
              <span 
                onClick={deleteItem.bind(this, index, todoTitle)}
              >| Delete</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ListItem;