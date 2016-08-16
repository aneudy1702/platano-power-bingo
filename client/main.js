import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import '../imports/startups/accounts-config.js';
 
angular.module('simple-todos', [
  angularMeteor,
  todosList.name,
  'accounts.ui'
]);