import React, {Component, Fragment} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
  render() {
    const list = this.state.list;
    return (
      <Fragment>
        <TransitionGroup>
        {
            list.map((item, index) => (
              <CSSTransition
                timeout={1000}
                classNames='my-node'
                unmountOnExit
                onEntered={(el) => {el.style.color='blue'}}
                key={index}
              >
                <div>{item}</div>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
        <button
          onClick={this.handleClick}
        >click</button>
      </Fragment>
    )
  }
}

export default Animation;