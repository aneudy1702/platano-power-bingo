import _ from 'lodash';

export default class Groups {
  constructor(raw_groups = []) {    
    const that = this;
    that.columns = [];
    that.diagonals = {
      tl_br: [], //top_left -> bottom_right
      bl_tr: [] // bottom_left -> top_right
    }
    that.rows = [];



    _.forEach(raw_groups, function(g, i){
      _getColumn.call(that, g);
      _getDiagonals.call(that, g, i);
      _getRow.call(that, i, raw_groups);
    });        
  }
}

function _numbersState(numbers) {
  return _.map( numbers, num => _getSelected(num) );
}

function _getColumn(group) {
  return this.columns.push(_numbersState(group.numbers));
}

function _getDiagonals(group, index) {
  const diagonals = this.diagonals;
  
  // [top left -> bottom right] array[index]
  const tl_br = _getSelected( group.numbers[ index ] );
  
  // [bottom left -> top right] array[array.length - (index + 1)]
  const bl_tr = _getSelected( group.numbers[ group.numbers.length - (index + 1) ] );
  
  diagonals.tl_br.push(tl_br);
  diagonals.bl_tr.push(bl_tr);  
}

function _getSelected(num) {
  return num ? num.selected : true;
}

function _getNumberByIndex(index, raw_groups) {
  return _.map( raw_groups, g => ( _getSelected(g.numbers[index]) ) );
}

function _getRow(index, raw_groups) {
  const row = _getNumberByIndex(index, raw_groups);

  this.rows.push(row);
}