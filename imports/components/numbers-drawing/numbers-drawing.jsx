import React, { Component } from 'react';
 
import classNames from 'classnames';
 
// App component - represents the whole app
export default class Charts extends Component {
  constructor(){
    super();   
  }

  render() {
    
    return (
      <div className="drawing-container">        
        <div className="ball"></div>
      </div>
    );
  }

}