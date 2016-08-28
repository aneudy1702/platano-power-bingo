import angular from 'angular';
import angularMeteor from 'angular-meteor';
import bingoChart from '../imports/components/bingo/bingo-chart';
import '../imports/startups/accounts-config.js';
 
angular.module('bingo', [
  angularMeteor,
  bingoChart.name
]);


