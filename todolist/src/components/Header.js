import React from 'react';

const Header = (props) => {
  const { inputValue, handleChange, addListItem } = props;
  return (
    <div>
      <input 
        value={inputValue}
        onChange={handleChange}
        placeholder="add todos"
      />
      <button
        onClick={addListItem}
      >提交</button>
    </div>
  )
}

export default Header;