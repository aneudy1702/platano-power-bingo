import React, { Component } from 'react';
import _ from 'lodash';

import Column from './column.jsx';

import WinnerDetector from '../winner-detector/WinnerDetector';
 

export default class Columns extends Component {
  constructor(){    
    super();

    const columnLetters = ['B', 'I', 'N', 'G', 'O'];    

    this.columns = _.map(columnLetters, function(letter, index) {
      return {
        letter: letter,
        numbers: getRamdomFive(index * 15)        
      };
    }); 
    this.getColumns = this.getColumns.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(){

    const detector = new WinnerDetector(this.columns);
    console.log('here', detector)
    var winner = {
      column: detector.haveWinnerColumn(),
      diagonal: detector.haveWinningDiagonal(),
      row: detector.haveWinningRow()
    };
    
    if (winner.column || winner.diagonal || winner.row) {
      alert('Bingo');
    }

  }

  getColumns(){
    const handleSelected = this.handleSelected;
    return this.columns.map(function(col, i){
      return <Column handleSelected={handleSelected.bind(this)} key={i} {...col}></Column>
    });
  }

  render() {
    
    return (
      <div className="columns">
        {this.getColumns()}
      </div>
    );
  }
}


function getRamdomFive(increment) {

  var numbersArray = new Array(15);
  var fiveNumbers = _.chain(numbersArray)
    .map(function(spot, index) {
      return index + 1 + (increment || 0);
    })
    .shuffle()
    .slice(0, 5)
    .map(function(num) {
      return {
        digit: num,
        selected: false
      }
    })
    .value();


  if (increment == 30) {
    fiveNumbers[2] = null;
  }

  return fiveNumbers
}