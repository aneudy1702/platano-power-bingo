import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Bingo from '../imports/Bingo.jsx';
 
Meteor.startup(() => {
  render(<Bingo />, document.getElementById('bingo-container'));
});