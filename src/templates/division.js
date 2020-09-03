"use strict";
exports.__esModule = true;
exports.divisionOptions = void 0;
exports.divisionOptions = [
    {
        type: 'Divide by 2 both digits even',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '{1} * 2' },
                { type: 'EVALUATE', expression: '{2} * 2' },
            ],
            questionTemplate: '{3}{4} / 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2}'
        }
    },
    {
        type: 'Divide by 2 tens odd',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '{1} * 2 + 1' },
                { type: 'EVALUATE', expression: '{2} * 2' },
            ],
            questionTemplate: '{3}{4} / 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{3}{4} / 2'
        }
    },
    {
        type: 'Divide by 2 units odd',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '{2} * 2' },
                { type: 'EVALUATE', expression: '{1} * 2 + 1' },
            ],
            questionTemplate: '{3}{4} / 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{3}{4} / 2'
        }
    },
    {
        type: 'Divide by 2 all odd',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                { type: 'EVALUATE', expression: '{1} * 2 + 1' },
                { type: 'EVALUATE', expression: '{2} * 2 + 1' },
            ],
            questionTemplate: '{3}{4} / 2',
            solutionType: 'EVALUATE',
            solutionTemplate: '{3}{4} / 2'
        }
    },
    {
        type: 'Half and Half',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 3 },
                { type: 'RANDOMINT', min: 1, max: 3 },
                { type: 'EVALUATE', expression: '{1} * 4' },
                { type: 'EVALUATE', expression: '{2} * 4' },
            ],
            questionTemplate: '{3}{4} / 4',
            solutionType: 'EVALUATE',
            solutionTemplate: '{3}{4} / 4'
        }
    },
    {
        type: 'Divide by 5',
        template: {
            variables: [
                { type: 'RANDOMINT', min: 1, max: 5 },
                { type: 'RANDOMINT', min: 1, max: 5 },
            ],
            questionTemplate: '{1}{2} / 5',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1}{2} / 5'
        }
    },
    {
        type: 'Divide by 10',
        template: {
            variables: [
                { name: 'numerator', type: 'RANDOMINT', min: 20, max: 70 },
                { type: 'RANDOMINT', min: 1, max: 4 },
                {
                    name: 'denominator',
                    type: 'EVALUATE',
                    expression: '[10, 100, 1000][{2}]'
                },
            ],
            questionTemplate: '{numerator}/{denominator}',
            solutionType: 'EVALUATE',
            solutionTemplate: '{numerator}/{denominator}'
        }
    },
    {
        type: 'Divide by 25',
        template: {
            variables: [{ type: 'RANDOMINT', min: 20, max: 70 }],
            questionTemplate: '{1} / 25',
            solutionType: 'EVALUATE',
            solutionTemplate: '{1} / 25'
        }
    },
];
