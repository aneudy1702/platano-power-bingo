import angular from 'angular';
import _ from 'lodash';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import template from './bingo-chart.html';
import common from './utils/common';
// import { Tasks } from '../../api/tasks.js';
 
const bingoChart = angular.module('bingo-chart', []);

class Groups {
  constructor(raw_groups = []) {    

    this.columns = [];
    this.diagonals = {
      tl_br: [], //top_left -> bottom_right
      bl_tr: [] // bottom_left -> top_right
    }
    this.rows = [];

    _.forEach(groups, function(g, i){
      _getColumn(g);
      _getDiagonals(g, i);
      _getRow(i)
    });

    function _numbersState(numbers) {
      return _.map( numbers, num => num.selected );
    }

    function _getColumn(group) {
      return this.columns.push(_numbersState(group.numbers));
    }

    function _getDiagonals(group, index) {
      const diagonals = this.diagonals;
      
      // [top left -> bottom right] array[index]
      const tl_br = group[ index ].selected;
      // [bottom left -> top right] array[array.length - (index + 1)]
      const bl_tr = group[ group.length - (index + 1) ].selected;
      
      diagonals.tl_br.push(tl_br);
      diagonals.bl_tr.push(bl_tr);
      
    }
    
    function _getNumberByIndex(index) {
      return _.map( raw_groups, g => g[index].selected );
    }
    
    function _getRow(index) {
      const row = _getNumberByIndex(index);

      this.rows.push(row);
    }    
  }
}

const detectorHelper = {
  // selectedNums is a list 
  isWinnerArray(selectedNums = [true, false]) {
    // Creates an array with all falsey values removed
    return _.compact(selectedNums).length == 5;
  },

  isWinnerColRow(sets) {
    
    let isWinner = false;
    
    _.forEach(sets, (set, index) => {
      if (this.isWinnerArray(set)) {
        isWinner = true;
      }      
    });
    
    return isWinner;
  }
};

class WinnerDetector {
  constructor(allGroups){
    this.groups = new Groups(allGroups);    
  }  

  haveWinnerColumn(){
    return detectorHelper.isWinnerColRow(this.groups.columns);
  }

  haveWinningDiagonal(){
    const winner_tl_br = detectorHelper.isWinnerArray(this.groups.diagonals.tl_br);
    const winner_bl_tr = detectorHelper.isWinnerArray(this.groups.diagonals.bl_tr);
    
    return winner_tl_br || winner_bl_tr;
  }

  haveWinningRow(){
    return detectorHelper.isWinnerColRow(this.groups.rows);
  }

  // todo: create haveFourDots, deal with ties
}

class BingoCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    
    this.groups = [];
    this.selectedNumbers = [];
    // this.subscribe('tasks');

    var letters = ['B', 'I', 'N', 'G', 'O'];
    
    this.groups = _.map(letters, function(letter, index) {
      return {
        letter: letter,
        numbers: common.getRamdomFive(index * 15)
      };
    });
 
    // this.helpers({

    // });
  }


  soyUnGanador() {
    
    /*
      @param: eachColumnNumbers

      eachColumnNumbers: this is an array of columns.
      each column is an array of numbers.
      each number is an object.
      the object consists of
      number -> {
        digit: integer,
        selected: boolean
      }
    */    
  }  

  selectNumber(num) {
    if (!num) return false;

    num.selected = true;
    
    this.soyUnGanador();
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
      return numModel(num);
    })
    .value();
  if (increment == 30) {
    fiveNumbers[2] = null;
  }

  return fiveNumbers
}

function numModel(num = 0) {
  return {
    digit: num,
    selected: false
  };
}

 
export default angular
  .module('bingo-chart', [
    angularMeteor
  ])
  .component('bingoChart', {
    templateUrl: 'imports/components/bingo/bingo-chart.html',
    controller: ['$scope', BingoCtrl]
  });