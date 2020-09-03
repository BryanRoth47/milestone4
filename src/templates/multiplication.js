"use strict";
exports.__esModule = true;
exports.multiplicationOptions = void 0;
exports.multiplicationOptions = [
    {
        type: 'Single digit multiply',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 2, max: 12 },
                { type: 'RANDOMINT', min: 2, max: 12 },
            ],
            questionTemplate: '{1} * {2}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} * {2}'
        }
    },
    {
        type: 'Multiply by 11',
        template: {
            variables: [{ type: 'RANDOMINT', min: 2, max: 50 }],
            questionTemplate: '{1} * 11',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} * 11'
        }
    },
    {
        type: 'Doubling numbers unit digit=5',
        template: {
            variables: [{ type: 'RANDOMINT', min: 1, max: 10 }],
            questionTemplate: '{1}5 * 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}5 * 2'
        }
    },
    {
        type: 'Doubling numbers no carry',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} * 5',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} * 5'
        }
    },
    {
        type: 'Doubling numbers unit carry',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 5, max: 10 },
            ],
            questionTemplate: '{1}{2} * 5',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} * 5'
        }
    },
    {
        type: 'Doubling numbers tens carry',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 5, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} * 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} * 2'
        }
    },
    {
        type: 'Doubling numbers all carry',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 5, max: 10 },
                { type: 'RANDOMINT', min: 5, max: 10 },
            ],
            questionTemplate: '{1}{2} * 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} * 2'
        }
    },
    {
        type: 'Factor out 11',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 2, max: 9 },
                { type: 'EVALUATE', expression: '{1}{1}' },
                { type: 'RANDOMINT', min: 15, max: 67 },
            ],
            questionTemplate: '{2} * {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{2} * {3}'
        }
    },
    {
        type: 'Double and Double',
        template: {
            variables: [{ type: 'RANDOMINT', min: 21, max: 30 }],
            questionTemplate: '{1} * 4',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} * 4'
        }
    },
    {
        type: 'Factor out 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 10 },
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'EVALUATE', expression: '{2} * 2' },
            ],
            questionTemplate: '{1}{3} * 5',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{3} * 5'
        }
    },
    {
        type: 'Distribution and Factor out 10',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 9 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '{2} * 2 + 1' },
            ],
            questionTemplate: '{1}{3} * 5',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{3} * 5'
        }
    },
    {
        type: "Multiply by adding 0's",
        template: {
            variables: [
                { type: 'RANDOMINT', min: 20, max: 70 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '[10, 100, 1000][{2}]' },
            ],
            questionTemplate: '{1} * {3}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} * {3}'
        }
    },
    {
        type: 'Distribution Property',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 21, max: 30 },
                { type: 'RANDOMINT', min: 11, max: 20 },
            ],
            questionTemplate: '{1} * {2}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} * {2}'
        }
    },
];
