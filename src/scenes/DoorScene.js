import Phaser from 'phaser';
import { instantiate } from '@ardentlabs/ardent-script';

const MAX_LOCKS = 6;

var questionField;
var answerField;
var timerField;
var keyEnter;


var DoorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function DoorScene() {
            Phaser.Scene.call(this, 'doorScene');
        },

    init: function (data) {
        // contains the current level, used to determine time limit and score multiplier
        this.currentLevel = data.level;
        // an array of arrays containing the templates for the chosen operations.
        // Top level array will either be size 1 (i.e. just doing addition problems) or size 4 (doing all 4 operations)
        this.problemType = data.problemType;
        // tracks the cumulative score
        this.score = data.currentScore;
        // determine how many locks this level will have
        this.numLocksRemaining = this.currentLevel <= MAX_LOCKS ? this.currentLevel : MAX_LOCKS;
        // create an empty array to hold the locks
        this.locksArr = [];
        // holds the current question
        this.currentQuestionToSolve = null;
        // tracks the starting amount of time
        this.startingTime = 0;
        // round timer
        this.roundTimer = null;
    },

    preload: function () {
        // door with blue animation
        //this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/qYVPd8T.png', { frameWidth: 640, frameHeight: 640, endFrame: 19 });
        //door with yellow animation
        this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/gmsX0UV.png', { frameWidth: 640, frameHeight: 640, endFrame: 48 });
        // unlocking animation
        this.load.spritesheet('lock-animation', 'https://i.imgur.com/Ni1Kr3F.png', { frameWidth: 640, frameHeight: 640, endFrame: 61 });
    },

    create: function () {
        // function that sets up the animation for opening the door
        var doorGif = this.createDoorAnimation();

        // function that creates the input field
        this.createTextFields();

        this.input.once('pointerdown', function () {
            doorGif.play('openDoor');
        });

        // create the locks
        //this.locksArr = this.createLocksArr();
        // generate the initial question
        this.createAndRenderQuestion();
        // start the round timer
        this.startTimer();
    },

    update: function () {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            if (this.isAnswerCorrect()) {
                alert("correct");
                this.unlockLock();
                if (this.numLocksRemaining === 0) {
                    this.roundTimer.clearPendingEvents();
                    alert('done');

                }
                else {
                    this.createAndRenderQuestion();
                }
            }
            else {
                alert('wrong');
                // handle an incorrect answer   
            }
            answerField.setText = '';
        }
        let time = this.startingTime - this.roundTimer.getElapsedSeconds();
        time = (time < 10) ? time.toPrecision(3) : time.toPrecision(4);
        timerField.setText('Time: ' + time);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },

    createTextFields: function () {
        // create the question field
        questionField = this.add.text(10, 10, '', { font: '32px Courier', fill: '#ffffff' });
        questionField.removeInteractive();
        // create the answer field
        answerField = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });
        // create the timer field -- will be filled in startTimer();
        timerField = this.add.text(10, 100, '', { font: '32px Courier', fill: 'red' });
        timerField.removeInteractive();
        // registers the allowed keystrokes for the input fields
        this.registerKeystrokes();
    },

    registerKeystrokes: function () {
        // setup text input keystrokes
        this.input.keyboard.on('keydown', function (event) {
            // backspace - delete the last character
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && answerField.text.length > 0) {
                answerField.text = answerField.text.substr(0, answerField.text.length - 1);
            }
            // otherwise if its a negative sign or a valid number, add it to the field
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.MINUS ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.PERIOD ||
                (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                answerField.text += event.key;
            }

        });
        // register the enter key with Phaser to simplify submitting answers
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },

    createDoorAnimation: function () {
        var config = {
            key: 'openDoor',
            frames: this.anims.generateFrameNumbers('door-openAnimation', { start: 0, end: 48 }),
            frameRate: 30
        };

        this.anims.create(config);

        var doorGif = this.add.sprite(400, 300, 'door-openAnimation');

        doorGif.displayWidth = 500;
        doorGif.scaleY = doorGif.scaleX;

        return doorGif;
    },

    createAndRenderQuestion: function () {
        // select the array of possible templates for the next question
        const chosenOperation = this.problemType.length === 1 ? this.problemType[0] : Math.floor((Math.random() * this.problemType.length));
        const templateIndex = Math.floor((Math.random() * chosenOperation.length));
        let questionToReturn = instantiate(chosenOperation[templateIndex].template);
        questionField.setText(questionToReturn.questionText);
        this.currentQuestionToSolve = questionToReturn;
        //return questionToReturn;
    },

    // creates an array of a number of lock images
    createLocksArr: function () {
        for (let i = 0; i < this.numLocksRemaining; i++) {
            let xCoord = ((i % 2) == 0) ? 100 : 400;
            let yCoord = 100 * i;
            this.locksArr.push(this.createLock(i, xCoord, yCoord));
        }
    },

    // create an individual lock image
    createLock: function (index, xCoord, yCoord) {
        console.log('x:', xCoord, 'y:', yCoord);
        var config = {
            key: 'lock' + index,
            frames: this.anims.generateFrameNumbers('lock-animation', { start: 0, end: 60 }),
            frameRate: 60
        };
        console.log(config);
        this.anims.create(config);

        var lockGif = this.add.sprite(xCoord, yCoord, 'lock-animation');

        lockGif.displayWidth = 200;
        lockGif.scaleY = lockGif.scaleX;

        return lockGif;
    },

    //checks if the submitted answer is correct
    isAnswerCorrect: function () {
        /*
        console.log("question:", this.currentQuestionToSolve);
        console.log('type:',typeof this.currentQuestionToSolve.solutionValue);
        console.log("answer:", answerField.text);
        console.log('type:',typeof answerField.text);
        console.log('returning:',answerField.text === this.currentQuestionToSolve.solutionValue);
        */
        if (typeof this.currentQuestionToSolve.solutionValue === 'number') {
            return (parseFloat(answerField.text) === this.currentQuestionToSolve.solutionValue);
        }
        return (answerField.text === this.currentQuestionToSolve.solutionValue);
    },

    unlockLock: function () {
        this.numLocksRemaining--;
        // increase score here
    },

    startTimer: function () {
        // game starts with 6 seconds on the clock, takes off 5 every round
        this.startingTime = 60 - ((this.currentLevel - 1) * 5);
        alert(this.startingTime);
        this.roundTimer = this.time.delayedCall(this.startingTime * 1000, this.endGame, [], this);
    },

    endGame: function () {
        alert('time expired');
    }
});

export default DoorScene;