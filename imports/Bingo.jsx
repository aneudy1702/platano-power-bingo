import React, { Component } from 'react';
 
import Charts from './components/charts/charts.jsx';
 
// App component - represents the whole app
export default class Bingo extends Component {
  render() {
    return (
      <div className="container">        

        <Charts></Charts>

      </div>
    );
  }
}