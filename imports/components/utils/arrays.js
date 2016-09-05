import _ from 'lodash';

function requiredParam(name) {
	throw new Error(`Missing Parameter "${name}"`);
}

const letters = [ 'B', 'I', 'N', 'G', 'O' ];

function getRange(index) {
	return ( index + 1 ) * 15;
}


function getNumberLetter(number) {
	return _.filter(letters, function(letter, index){
		return number <= getRange(index);
	})[0];
}

function getNumberObject(number) {
	return {
		letter: getNumberLetter(number),
		number
	};
}

function getNumbersArray({
	length = requiredParam('length')
} = {}){
	return _.map(new Array(length), (dummy, index) => getNumberObject(index));
}

function getRamdonArray({
	length = requiredParam('length')
} = {}) {
	return _.shuffle(
		getNumbersArray({
			length: length
		})
	);
}

function getRamdon75() {
	return getRamdonArray({length: 75});
}

export {
	getNumbersArray,
	getRamdonArray,
	getRamdon75
};