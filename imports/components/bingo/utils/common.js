export default {
	getRamdomFive: function(increment) {

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
}