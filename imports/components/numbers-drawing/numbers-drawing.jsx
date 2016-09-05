import React, { Component } from 'react';
import { getRamdon75 } from '../utils/arrays';
import classNames from 'classnames';
 
// App component - represents the whole app
export default class Charts extends Component {
  constructor(){
    super();    
    this.state = {
      numbers: getRamdon75(),
      currentIndex: 0
    };
  }

  componentDidMount(){
    setInterval(() => {
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    }, 5 * 1000);
  }

  
  render() {
    const ballState = classNames({
      'drawing-container': true,
      'active': this.state.active
    });

    const number = this.state.numbers[this.state.currentIndex];

    return (
      <div className={ballState}>
        <div className="ball flex-container-all-center">          
          <span className="child letter">{number.letter}</span>
          <span className="child number">{number.number}</span>
        </div>
      </div>
    );
  }

}