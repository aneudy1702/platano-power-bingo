import React, { Component } from 'react';
import Columns from './columns.jsx';
 
// App component - represents the whole app
export default class Chart extends Component {    

  render() {            
    
    return (
  		<div className="chart">
        <Columns/>
      </div>    	
    );
  }

}
