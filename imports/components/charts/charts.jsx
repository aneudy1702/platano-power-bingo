import React, { Component } from 'react';
 
import Chart from '../chart/chart.jsx';

import SwipeableViews from 'react-swipeable-views';
 
// App component - represents the whole app
export default class Charts extends Component {
  constructor(){
    super();

    this.state = {
      charts: [{}, {}, {}].map(function(dummy, index){
        return {
          front: index === 0
        };
      }),

      currentChart: 0
    }
  }

  getCharts(){
    
    return this.state.charts.map(function(chart, i){
      return (<Chart key={i} front={chart.front} onSwipe=""/>);
    });
  }

  
  onChartSwitch(index, type) {
    if (type == 'end') {
      this.setState({
        currentChart: index
      });
    }
    
  }

  render() {
    
    return (
      <div className="container">
        <SwipeableViews onSwitching={this.onChartSwitch.bind(this)}>
            
            { this.getCharts() }
        </SwipeableViews>
        
        <center>
          {this.state.currentChart + 1} out of {this.state.charts.length}
        </center>
      </div>
    );
  }

}