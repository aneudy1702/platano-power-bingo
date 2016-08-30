import React, { Component } from 'react';
 
import Chart from '../chart/chart.jsx';

import SwipeableViews from 'react-swipeable-views';

import classNames from 'classnames';
 
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

    const leftArrowClass = classNames({
      'icon-arrow-left2': true,
      hidden: !this.state.currentChart
    });

    const rightArrowClass = classNames({
      'icon-arrow-right2': true,
      hidden: (this.state.currentChart + 1) == this.state.charts.length
    })
    
    return (
      <div className="container">
        <SwipeableViews onSwitching={this.onChartSwitch.bind(this)}>
            
            { this.getCharts() }
        </SwipeableViews>
        
        <center>
          <span className={leftArrowClass}></span>
          <span>
            {this.state.currentChart + 1} out of {this.state.charts.length} 
          </span>
          <span className={rightArrowClass}></span>
        </center>
      </div>
    );
  }

}