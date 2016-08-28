import _ from 'lodash';
import Groups from './Groups';


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

export default class WinnerDetector {
  constructor(allGroups){
    this.groups = new Groups(allGroups);    
  }  

  haveWinnerColumn(){
    return detectorHelper.isWinnerColRow(this.groups.columns);
  }

  haveWinningDiagonal(){
    const winner_tl_br = detectorHelper.isWinnerArray(this.groups.diagonals.tl_br);
    const winner_bl_tr = detectorHelper.isWinnerArray(this.groups.diagonals.bl_tr);
    // console.log(winner_tl_br, winner_bl_tr);
    return winner_tl_br || winner_bl_tr;
  }

  haveWinningRow(){
    return detectorHelper.isWinnerColRow(this.groups.rows);
  }

  // todo: create haveFourDots, deal with ties
}
