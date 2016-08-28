import React, { Component } from 'react';
import ColumnDigit from './column-digit.jsx';
 
// App component - represents the whole app
export default class Charts extends Component {

  render() {    
    const handleSelected = this.props.handleSelected;
    return (
      <div className="column">
        <div className="column-header">
          {this.props.letter}
        </div>

        {
          this.props.numbers.map(function (number, i){
            return ( <ColumnDigit handleSelected={handleSelected} key={i} number={number}></ColumnDigit> );
          })
        }
      </div>      
    );
  }
}


  
