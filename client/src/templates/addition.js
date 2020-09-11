//"use strict";
exports.__esModule = true;
exports.additionOptions = void 0;
exports.additionOptions = [
    {
        type: 'Single Digit Addition c >= 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
            ],
            questionTemplate: '{1} + {2}',
            solutionType: 'EVALUATE',
            solutionTemplate: '10'
        }
    },
    {
        type: 'Single Digit Addition c < 10',
        template: {
            variables: [
                { name: 'sum', type: 'RANDOMINT', min: 10, max: 30 },
                { type: 'EVALUATE', expression: 'round(random({sum} - 1)) + 1' },
                { type: 'EVALUATE', expression: '{sum} - {2}' },
            ],
            questionTemplate: '{2} + {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{sum}'
        }
    },
    {
        type: 'Complement of 10s',
        template: {
            variables: [{ type: 'RANDOMINT', min: 1, max: 10 }],
            questionTemplate: '{1} + ? = 10',
            solutionType: 'EVALUATE',
            solutionTemplate: '10 - {1}'
        }
    },
    {
        type: 'Pair of 10s 3x',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
            ],
            questionTemplate: '{1} + {2} + {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} + {2} + {3}'
        }
    },
    {
        type: 'Pair of 10s 4x cd < 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
                { name: 'secondsum', type: 'RANDOMINT', min: 3, max: 11 },
                { type: 'EVALUATE', expression: 'round(random({secondsum}))' },
                { type: 'EVALUATE', expression: '{secondsum} - {4}' },
                {
                    name: 'expression',
                    type: 'SHUFFLEADD',
                    variables: ['1', '2', '4', '5']
                },
            ],
            questionTemplate: '{expression}',
            solutionType: 'EVALUATE',
            solutionTemplate: '10 + {secondsum}'
        }
    },
    {
        type: 'Pair of 10s 4x >= 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
                { name: 'secondsum', type: 'RANDOMINT', min: 3, max: 23 },
                { type: 'EVALUATE', expression: 'round(random({secondsum}))' },
                { type: 'EVALUATE', expression: '{secondsum} - {4}' },
                {
                    name: 'expression',
                    type: 'SHUFFLEADD',
                    variables: ['1', '2', '4', '5']
                },
            ],
            questionTemplate: '{expression}',
            solutionType: 'EVALUATE',
            solutionTemplate: '10 + {secondsum}'
        }
    },
    {
        type: 'Pair of 10s 5x',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {3}' },
                { type: 'RANDOMINT', min: 1, max: 10 },
                {
                    name: 'expression',
                    type: 'SHUFFLEADD',
                    variables: ['1', '2', '3', '4', '5']
                },
            ],
            questionTemplate: '{expression}',
            solutionType: 'EVALUATE',
            solutionTemplate: '20 + {5}'
        }
    },
    {
        type: 'Pair of 10s 6x ef < 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {3}' },
                { name: 'lastsum', type: 'RANDOMINT', min: 3, max: 11 },
                { type: 'EVALUATE', expression: 'round(random({lastsum}))' },
                { type: 'EVALUATE', expression: '{lastsum} - {6}' },
                {
                    name: 'expression',
                    type: 'SHUFFLEADD',
                    variables: ['1', '2', '3', '4', '6', '7']
                },
            ],
            questionTemplate: '{expression}',
            solutionType: 'EVALUATE',
            solutionTemplate: '20 + {lastsum}'
        }
    },
    {
        type: 'Pair of 10s 6x ef >= 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {1}' },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'EVALUATE', expression: '10 - {3}' },
                { name: 'lastsum', type: 'RANDOMINT', min: 3, max: 23 },
                { type: 'EVALUATE', expression: 'round(random({lastsum}))' },
                { type: 'EVALUATE', expression: '{lastsum} - {6}' },
                {
                    name: 'expression',
                    type: 'SHUFFLEADD',
                    variables: ['1', '2', '3', '4', '6', '7']
                },
            ],
            questionTemplate: '{expression}',
            solutionType: 'EVALUATE',
            solutionTemplate: '20 + {lastsum}'
        }
    },
    {
        type: 'Add tens and ones units < 10',
        template: {
            variables: [
                { name: 'tens', type: 'RANDOMINT', min: 1, max: 3 },
                { name: 'ones', type: 'RANDOMINT', min: 1, max: 6 },
                { name: 'add', type: 'RANDOMINT', min: 1, max: 10 },
            ],
            questionTemplate: '{tens}{ones} + {add}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{tens}{ones} + {add}'
        }
    },
    {
        type: 'Add tens and ones units > 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 3 },
                { type: 'RANDOMINT', min: 5, max: 10 },
                { type: 'RANDOMINT', min: 5, max: 10 },
            ],
            questionTemplate: '{1}{2} + {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} + {3}'
        }
    },
    {
        type: 'Add tens and tens units < 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} + {3}{4}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} + {3}{4}'
        }
    },
    {
        type: 'Add tens and tens units >= 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
            ],
            questionTemplate: '{1}{2} + {3}{4}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} + {3}{4}'
        }
    },
    {
        type: 'Split addition no carry',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}'
        }
    },
    {
        type: 'Split addition carry tens',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}'
        }
    },
    {
        type: 'Split addition carry tens and ones',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} + {5}{6}{7}{8}'
        }
    },
];
