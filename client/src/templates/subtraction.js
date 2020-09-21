//"use strict";
exports.__esModule = true;
exports.subtractionOptions = void 0;
exports.subtractionOptions = [
    {
        type: 'Subtraction a <= 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 5, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1} - {2}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} - {2}'
        }
    },
    {
        type: 'Subtraction units digit a > b',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} - {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} - {3}'
        }
    },
    {
        type: 'Add Complements of 10s',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2} - {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} - {3}'
        }
    },
    {
        type: 'Subtract tens and ones no borrow from both digits',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} - {3}{4}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} - {3}{4}'
        }
    },
    {
        type: 'Subtract tens and ones borrow from units',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2} - {3}{4}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} - {3}{4}'
        }
    },
    {
        type: 'Subtract 4 digits no borrow',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow units',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow tens',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow tens and ones',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow hundreds only',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow hundreds and units',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow hundreds and tens',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Subtract 4 digits borrow hundreds tens units',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
                { type: 'RANDOMINT', min: 6, max: 10 },
            ],
            questionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}{3}{4} - {5}{6}{7}{8}'
        }
    },
    {
        type: 'Complement of 100',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 101, max: 190 },
                { type: 'RANDOMINT', min: 80, max: 99 },
            ],
            questionTemplate: '{1} - {2}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} - {2}'
        }
    },
];
