import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todosList.html';
import { Meteor } from 'meteor/meteor';
// import { Tasks } from '../../api/tasks.js';
 
const bingoChart = angular.module('bingo-chart', []);

class BingoCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.
    this.groups = [];
    this.selectedNumbers = [];
    // this.subscribe('tasks');

    
 
    // this.helpers({

    // });
  }

  

  getSelectedState (num) {
    return num ? num.selected : true
  }

  isSelected(isSelected) {
    return !!isSelected;
  }

  getNumbersSeletecState(eachColumnNumbers) {
    return _.map(eachColumnNumbers, (groupNumberObjects) => {
      return _.map(groupNumberObjects, (numObject) => numObject.selected);
    });
  }

  isWinnerSet(selectedNumbersArray) {
    return selectedNumbersArray.length === 5;
  }
  
  haveAWinningColumn(eachColumnNumbers = []) {
    var winningColumn = false;

    var selectedNumbersByColumn = this.getNumbersSeletecState(eachColumnNumbers);

        
    return winningColumn;
  }

  haveAWinningRow() {
    return false;
  }

  haveAWinningDiagonal() {

    // [top left -> bottom right] array[index]
    // [bottom left -> top right] array[array.length - (index + 1)]


    return false;
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
    var eachColumnNumbers = _.map(this.groups, (g) => g.numbers);

    this.winner = (
      this.haveAWinningColumn(eachColumnNumbers) ||
      this.haveAWinningRow(eachColumnNumbers) ||
      this.haveAWinningDiagonal(eachColumnNumbers)
    );
  }

  getRamdomFive(increment) {

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

  selectNumber(num) {
    if (!num) return false;

    num.selected = true;
    
    this.soyUnGanador();
  }
}
  
  



var letters = ['B', 'I', 'N', 'G', 'O'];

$scope.groups = _.map(letters, function(letter, index) {
  return {
    letter: letter,
    numbers: getRamdomFive(index * 15)
  };
})

// $scope.chartNumbers = chartNumbers;

}]);

 

 
export default angular
  .module('todosList', [
    angularMeteor
  ])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });