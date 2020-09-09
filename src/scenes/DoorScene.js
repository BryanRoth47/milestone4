import Phaser from 'phaser';
import { instantiate } from '@ardentlabs/ardent-script';

const MAX_LOCKS = 6;

var DoorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function DoorScene() {
            Phaser.Scene.call(this, 'doorScene');
        },

    init: function (data) {
        // contains the current level, used to determine time limit and score multiplier
        this.currentLevel = data.level;
        // an array containing the templates for the chosen operations. (so an array of arrays)
        // Top level array will either be size 1 (i.e. just doing addition problems) or size 4 (doing all 4 operations)
        this.problemType = data.problemType;
        // tracks the cumulative score
        this.currentScore = data.score;
        // determine how many locks this level will have
        this.numLocksRemaining = this.currentLevel <= MAX_LOCKS ? this.currentLevel : MAX_LOCKS;
        // create an empty array to hold the locks
        this.locksArr = [];
        // holds the door animation object
        this.doorGif = null;
        // holds the current question
        this.currentQuestionToSolve = null;
        // tracks the starting amount of time
        this.startingTime = 0;
        // round timer
        this.roundTimer = null;
        // the field that will display the question to be solved
        this.questionField = null;
        // the field where the user enters their answer
        this.answerField = null;
        // the display field for the timer
        this.timerField = null;
        // the display field for the score
        this.scoreField = null;
        // keyEnter needs to be saved so we know when user submits an answer
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },

    preload: function () {
        // door with blue animation
        //this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/r6sxy7Z.png', { frameWidth: 640, frameHeight: 640, endFrame: 19 });
        //door with yellow animation
        this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/bQVzDVV.png', { frameWidth: 640, frameHeight: 640, endFrame: 48 });
        // unlocking animation
        this.load.spritesheet('lock-animation', 'https://i.imgur.com/CqHC7Ac.png', { frameWidth: 640, frameHeight: 640, endFrame: 61 });
    },

    create: function () {
        // function that sets up the animation for opening the door
        this.createDoorAnimation();

        // function that creates the input field
        this.createTextFields();

        /*
        this.input.once('pointerdown', function () {
            doorGif.play('openDoor');
        });
        */

        // create the locks
        this.createLocksArr();

        // generate the initial question
        this.createAndRenderQuestion();

        // start the round timer
        this.startTimer();

    },

    update: function () {
        
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            if (this.isAnswerCorrect()) {
                this.unlockLock();
                if (this.numLocksRemaining === 0) {
                    this.roundTimer.remove();
                    this.doorGif.play('openDoor');
                }
                else {
                    this.createAndRenderQuestion();
                }
            }
            else {
                alert('wrong');
                // handle an incorrect answer   
            }
            this.answerField.setText('');
        }
        let time = this.startingTime - this.roundTimer.getElapsedSeconds();
        time = (time < 10) ? time.toPrecision(3) : time.toPrecision(4);
        this.timerField.setText('Time: ' + time);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },

    createTextFields: function () {
        // create the question field
        this.questionField = this.add.text(10, 10, '', { font: '32px Courier', fill: '#ffffff' });
        this.questionField.removeInteractive();
        // create the answer field
        this.answerField = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });
        // create the timer field -- will be filled in startTimer();
        this.timerField = this.add.text(550, 10, '', { font: '32px Courier', fill: 'red' });
        this.timerField.removeInteractive();
        // create the field to display the score
        this.scoreField = this.add.text(550, 50, 'Score: ' + this.currentScore, { font: '32px Courier', fill: 'red' });
        this.scoreField.removeInteractive();
        // registers the allowed keystrokes for the input fields
        this.registerKeystrokes();
    },

    registerKeystrokes: function () {
        // setup text input keystrokes
        this.input.keyboard.on('keydown', function (event) {
            // backspace - delete the last character
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.answerField.text.length > 0) {
                this.answerField.text = this.answerField.text.substr(0, this.answerField.text.length - 1);
            }
            // otherwise if its a negative sign or a valid number, add it to the field
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.MINUS ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.PERIOD ||
                (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                this.answerField.text += event.key;
            }

        }.bind(this));
    },

    createDoorAnimation: function () {
        var config = {
            key: 'openDoor',
            frames: this.anims.generateFrameNumbers('door-openAnimation', { start: 0, end: 48 }),
            frameRate: 30
        };

        this.anims.create(config);

        this.doorGif = this.add.sprite(400, 300, 'door-openAnimation');

        this.doorGif.displayWidth = 500;
        this.doorGif.scaleY = this.doorGif.scaleX;

        this.doorGif.on(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            alert('next Level');
            this.scene.start('doorScene', { problemType: this.problemType, level: this.currentLevel + 1, score: this.currentScore });
        }, this);
    },

    createAndRenderQuestion: function () {
        // select the array of possible templates for the next question
        const chosenOperation = this.problemType.length === 1 ? this.problemType[0] : Math.floor((Math.random() * this.problemType.length));
        const templateIndex = Math.floor((Math.random() * chosenOperation.length));
        let questionToReturn = instantiate(chosenOperation[templateIndex].template);
        this.questionField.setText(questionToReturn.questionText);
        this.currentQuestionToSolve = questionToReturn;
        //return questionToReturn;
    },

    // creates an array of a number of lock images
    createLocksArr: function () {
        for (let i = 0; i < this.numLocksRemaining; i++) {
            let xCoord = ((i % 2) === 0) ? 225 : 575;
            let yCoord = 150 + (150 * Math.floor(i / 2));
            this.locksArr.push(this.createLock(i, xCoord, yCoord));
        }
        // we want to reverse the array so we can 'unlock' starting with the first (top left) lock
        this.locksArr = this.locksArr.reverse();
    },

    // create an individual lock image
    createLock: function (index, xCoord, yCoord) {
        //console.log('x:', xCoord, 'y:', yCoord);
        var config = {
            key: 'unlock',
            //animation has 60 frames. Set end to 61 so it disappears once it 'unlocks'
            frames: this.anims.generateFrameNumbers('lock-animation', { start: 0, end: 61 }),
            frameRate: 60
        };
        //console.log(config);
        this.anims.create(config);

        var lockGif = this.add.sprite(xCoord, yCoord, 'lock-animation');

        lockGif.displayWidth = 150;
        lockGif.scaleY = lockGif.scaleX;

        return lockGif;
    },

    //checks if the submitted answer is correct
    isAnswerCorrect: function () {
        if (typeof this.currentQuestionToSolve.solutionValue === 'number') {
            return (parseFloat(this.answerField.text) === this.currentQuestionToSolve.solutionValue);
        }
        return (this.answerField.text === this.currentQuestionToSolve.solutionValue);
    },

    unlockLock: function () {
        let tempLock = this.locksArr.pop();
        tempLock.play('unlock');
        this.numLocksRemaining--;
        // increase score here
        this.currentScore += 10 * this.currentLevel;
        this.scoreField.setText('Score: ' + this.currentScore);
    },

    startTimer: function () {
        // game starts with 6 seconds on the clock, takes off 5 every round
        this.startingTime = 60 - ((this.currentLevel - 1) * 5);
        this.roundTimer = this.time.delayedCall(this.startingTime * 1000, this.endGame, [], this);
    },

    endGame: function () {
        this.shutdown();
        this.scene.launch('endScene', { score: this.currentScore, level: this.currentLevel });
    }
});

export default DoorScene;