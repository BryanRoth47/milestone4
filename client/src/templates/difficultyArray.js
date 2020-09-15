import { additionOptions } from '../templates/addition';
import { subtractionOptions } from '../templates/subtraction';
import { multiplicationOptions } from '../templates/multiplication';
import { divisionOptions } from '../templates/division';

const addition = {
    name: 'Addition',
    templates: additionOptions,
    // these need to be an array of array(s) so we can handle sending multiple ranges when we do 'all' operations
    'easy': [0, 2],       // 'single digit addition' & 'complement of 10s'
    'medium': [3, 6],    // 'pair of 10s (3x to 5x)' & 'add 10s and 1s units'
    'hard': [7, 15]       // 'pair of 10s (6x)' & 'add 10s and 1s units' & 'split addition'
};

const subtraction = {
    name: 'Subtraction',
    templates: subtractionOptions,
    // these need to be an array of array(s) so we can handle sending multiple ranges when we do 'all' operations
    'easy': [0, 3],       // 'subtraction a<=b' & 'subtraction a>b' & 'add complements of 10s' & 'subtract 10s and 1s no borrow'
    'medium': [4, 9],     // 'subtract 10s and 1s borrow' & 'subtract 4 digits w/only one borrow'
    'hard': [10, 13]       // 'subtract 4 digits w/multiple borrow' & 'complement of 100'
};

const multiplication = {
    name: 'Multiplication',
    templates: multiplicationOptions,
    // these need to be an array of array(s) so we can handle sending multiple ranges when we do 'all' operations
    'easy': [0, 3],       // 'single digit multiply' & 'multuple by 11' & 'doubling no carry'
    'medium': [4, 8],     // 'doubling w/carry' & 'factor out 11' & 'double and double'
    'hard': [9, 12]        // 'factor out 10 wo or w/o distribution' & 'multiply by adding 0s' & 'distribution property'
};

const division = {
    name: 'Division',
    templates: divisionOptions,
    // these need to be an array of array(s) so we can handle sending multiple ranges when we do 'all' operations
    'easy': [0, 1],       // 'divide by 2 even' & 'divide by 2 10s odd' --> hopefully no fractions involved
    'medium': [2, 4],     // 'divide by 2 units odd' & 'divide by 2 all odd' & 'half and half'
    'hard': [5, 7]        // 'divide by 5, 10, or 25'
};

// create 'all' by combining the above objects. That way, if we change the difficulty of one of the problem types, we don't also have to update 'all'
const all = {
    name: 'All',
    templates: [additionOptions, subtractionOptions, multiplicationOptions, divisionOptions],
    'easy': [addition['easy'], subtraction['easy'], multiplication['easy'], division['easy']],
    'medium': [addition['medium'], subtraction['medium'], multiplication['medium'], division['medium']],
    'hard': [addition['hard'], subtraction['hard'], multiplication['hard'], division['hard']]
};

const DIFFICULTY_ARRAY = {
    'addition': { ...addition },
    'subtraction': { ...subtraction },
    'multiplication': { ...multiplication },
    'division': { ...division },
    'all': { ...all }
};

function getTemplatesArray(operation, difficulty) {
    const operationName = operation.toLowerCase();
    const currentOperation = DIFFICULTY_ARRAY[operationName];
    console.log(currentOperation);
    let min, max, tempArr = null;
    if (operationName !== 'all') {
        min = currentOperation[difficulty][0];
        max = currentOperation[difficulty][1];
        tempArr = currentOperation['templates'].slice(min, max + 1);
    }
    else {
        tempArr = getTemplatesArray('addition', difficulty);
        tempArr = tempArr.concat(getTemplatesArray('subtraction', difficulty));
        tempArr = tempArr.concat(getTemplatesArray('multiplication', difficulty));
        tempArr = tempArr.concat(getTemplatesArray('division', difficulty));
    }
    return tempArr;
}

export { DIFFICULTY_ARRAY, getTemplatesArray };