import React, { Component } from 'react';
import Column from './column-digit.jsx';
import classNames from 'classnames';
 
// App component - represents the whole app
export default class Charts extends Component {
  constructor() {
    super();
    
    this.state = {
      selected: false
    };
    
  }

  handleSelected() {
    if (this.props.number && !this.state.selected) {
      this.setState({
        selected: true
      });  

      this.props.number.selected = true;
      this.props.handleSelected();      
    }
  }

  getDigitContent(number) {    
    if (number) {
      return (
        
        <span className="number">

          {number.digit}
        
        </span>

      );
    } else {
      return (
        
        <span className="circle">

          

        </span>

      );
    }
  }

  render() {
     // ng-class="{'extra-padding':!number, 'selected': (number && number.selected)}"
    // ng-click="selectNumber(number, $index);" 

    const digitClassNames = classNames({
      'column-digit': true,
      'selected': this.state.selected,
      'empty': !this.props.number
    });   

    return (
      
      <div className={digitClassNames} onClick={this.handleSelected.bind(this)}>
        {this.getDigitContent(this.props.number)}
      </div>

    );
  }
}


  

