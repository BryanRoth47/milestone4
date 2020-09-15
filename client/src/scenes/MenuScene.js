import Phaser from 'phaser';
//ArdentScript
/*
import { additionOptions } from '../templates/addition';
import { subtractionOptions } from '../templates/subtraction';
import { multiplicationOptions } from '../templates/multiplication';
import { divisionOptions } from '../templates/division';
*/
//import { DIFFICULTY_ARRAY } from '../templates/difficultyArray'


var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Menu() {
            Phaser.Scene.call(this, 'menu');
        },

    init: function (data) {
        // holds the operation the player chooses
        this.chosenOperation = null;
        // holds the text to display
        this.menuTextField = null;
        // tracks the chosen difficulty
        this.chosenDifficulty = null;
    },

    create: function () {
        this.menuTextField = this.add.text(10, 10, 'Choose your questions:' +
            '\n1. Addition' +
            '\n2. Subtraction' +
            '\n3. Multiplication' +
            '\n4. Division' +
            '\n5. All of the above', { font: '24px Courier', fill: '#00ff00' });
        this.menuTextField.removeInteractive();

        this.input.keyboard.on('keydown', function (event) {
            switch (event.code) {
                case 'Digit1':
                    //this.chosenOperation = [additionOptions];
                    this.chosenOperation = 'addition';
                    break;
                case 'Digit2':
                    //this.chosenOperation = [subtractionOptions];
                    this.chosenOperation = 'subtraction';
                    break;
                case 'Digit3':
                    //this.chosenOperation = [multiplicationOptions];
                    this.chosenOperation = 'multiplication';
                    break;
                case 'Digit4':
                    //this.chosenOperation = [divisionOptions];
                    this.chosenOperation = 'division';
                    break;
                case 'Digit5':
                    //this.chosenOperation = [additionOptions, subtractionOptions, multiplicationOptions, divisionOptions];
                    this.chosenOperation = 'all'
                    break;
                default:
                    // if its not one of those keys, do nothing
                    break;
            }
            if (this.chosenOperation !== null) {
                // we're using a switch statement instead of keyboard.once(), so the event will fire while selecting the difficulty unless we remove it
                this.input.keyboard.removeListener('keydown');
                this.selectDifficulty();
            }
        }, this);

        this.events.on('shutdown', this.shutdown, this);
    },

    selectDifficulty: function () {
        //console.log(DIFFICULTY_ARRAY[this.chosenOperation]);
        this.menuTextField.setText('Choose Difficulty:' +
            '\n1. Easy' +
            '\n2. Medium' +
            '\n3. Hard'
        );


        this.input.keyboard.on('keydown', function (event) {
            switch (event.code) {
                case 'Digit1':
                    this.chosenDifficulty = 'easy';
                    break;
                case 'Digit2':
                    this.chosenDifficulty = 'medium';
                    break;
                case 'Digit3':
                    this.chosenDifficulty = 'hard';
                    break;
                default:
                    // if its not one of those keys, do nothing
                    break;
            }
            if (this.chosenDifficulty !== null) {
                this.scene.start('doorScene', {
                    //problemType: {...DIFFICULTY_ARRAY[this.chosenOperation]},
                    problemType: this.chosenOperation,
                    difficulty: this.chosenDifficulty,
                    level: 1,
                    score: 0
                });
            }
        }, this);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});

export default MenuScene;