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
        // tracks how many locks were originally created
        this.startingLocks = this.currentLevel <= MAX_LOCKS ? this.currentLevel : MAX_LOCKS;
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
        // field to inform the user they submitted an incorect answer. Starts hidden and only appears if a wrong answer submitted
        this.incorrectAnswerField = null;
        // keyEnter needs to be saved so we know when user submits an answer
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },

    preload: function () {
        // door with blue animation
        //this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/r6sxy7Z.png', { frameWidth: 640, frameHeight: 640, endFrame: 19 });
        // door with yellow animation
        this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/bQVzDVV.png', { frameWidth: 640, frameHeight: 640, endFrame: 48 });
        // unlocking animation
        this.load.spritesheet('lock-animation', 'https://i.imgur.com/CqHC7Ac.png', { frameWidth: 640, frameHeight: 640, endFrame: 61 });
        // background image
        this.load.image('background', 'https://i.imgur.com/M5mzR72.jpg');
    },

    create: function () {
        // display the background image
        this.add.image(400, 300, 'background');

        // function that sets up the animation for opening the door
        this.createDoorAnimation();

        // function that creates the input field
        this.createTextFields();

        // create the locks
        this.createLocksArr();

        // generate the initial question
        this.createAndRenderQuestion();

        // start the round timer
        this.startTimer();

        // ensure the scene shuts down correctly
        this.events.on('shutdown', this.shutdown, this);
    },

    update: function () {
        // render the time remaining
        let time = this.startingTime - this.roundTimer.getElapsedSeconds();
        // ensure the timer renders in the same location regardless of how much time is left
        time = (time < 10) ? time.toPrecision(3) : time.toPrecision(4);
        this.timerField.setText('Timer:' + time);
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
        // create the incorrect answer field
        this.incorrectAnswerField = this.add.text(10, 90, 'Incorrect', { fontFamily: 'Courier', fontSize: '32px', color: 'red', fontStyle: 'bold' });
        this.incorrectAnswerField.removeInteractive();
        this.incorrectAnswerField.setVisible(false);
        // create the timer field -- will be filled in startTimer();
        this.timerField = this.add.text(575, 10, '', { font: '32px Courier', fill: 'red' });
        this.timerField.removeInteractive();
        // create the field to display the score
        this.scoreField = this.add.text(575, 50, 'Score:' + this.currentScore, { font: '32px Courier', fill: 'red' });
        this.scoreField.removeInteractive();
        // display instructions for the player
        this.add.text(200, 525, 'Press Enter to submit answers' +
            '\n Unlock all locks to advance', { font: '24px Courier', fill: '#00ff00' });
        // registers the allowed keystrokes for the input fields
        this.registerKeystrokes();
    },

    registerKeystrokes: function () {
        // create listeners for input keystrokes
        this.input.keyboard.on('keydown', function (event) {
            // enter - submit answer
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER && this.answerField.text.length > 0) {
                const answerIsCorrect = (parseFloat(this.answerField.text) === this.currentQuestionToSolve.solutionValue);
                if (answerIsCorrect) {
                    // hide the incorrect notice if it is visible
                    this.incorrectAnswerField.setVisible(false);
                    // unlock the next lock
                    this.unlockLock();
                    // increase score
                    this.currentScore += 10 * this.currentLevel;
                    this.scoreField.setText('Score: ' + this.currentScore);
                    // if there are more locks left, generate a new question
                    if (this.locksArr.length > 0) {
                        this.createAndRenderQuestion();
                    }
                }
                else {  // handle an incorrect answer   
                    this.incorrectAnswerField.setVisible(true);
                    this.time.delayedCall(1000, this.toggleIncorrectAnswerField,[], this);
                }
                this.answerField.setText('');
            }
            // backspace - delete the last character
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.answerField.text.length > 0) {
                this.answerField.text = this.answerField.text.substr(0, this.answerField.text.length - 1);
            }
            // otherwise if its a negative sign or a valid number, add it to the field
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.MINUS ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.PERIOD ||
                (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                this.answerField.text += event.key;
            }
        }, this);
    },

    toggleIncorrectAnswerField: function(){
        this.incorrectAnswerField.setVisible(false);
    },

    createDoorAnimation: function () {
        var config = {
            key: 'openDoor',
            frames: this.anims.generateFrameNumbers('door-openAnimation', { start: 0, end: 48 }),
            frameRate: 30
        };

        this.anims.create(config);

        this.doorGif = this.add.sprite(400, 325, 'door-openAnimation');

        this.doorGif.displayWidth = 500;
        this.doorGif.scaleY = this.doorGif.scaleX;

        // set up a listener so we can advance to the next level once the door animation finishes playing.
        this.doorGif.on('animationcomplete', () => {
            //
            this.roundTimer.remove();
            //this.scene.start('doorScene', { problemType: this.problemType, level: this.currentLevel + 1, score: this.currentScore });
            this.scene.restart({ problemType: this.problemType, level: this.currentLevel + 1, score: this.currentScore });
        }, this);
    },

    createAndRenderQuestion: function () {
        // select the array of possible templates for the next question
        // array either has 1 possible operation or several. If several are available, choose a random one.
        const chosenOperation = this.problemType.length === 1 ? this.problemType[0] : this.problemType[Math.floor((Math.random() * this.problemType.length))];
        // each operation has a number of possible problems. Choose one at random
        const templateIndex = Math.floor((Math.random() * chosenOperation.length));
        // use ardentScript to generate a random problem of the given type
        this.currentQuestionToSolve = instantiate(chosenOperation[templateIndex].template);
        this.questionField.setText('Solve: ' + this.currentQuestionToSolve.questionText);
    },

    // creates an array of a number of lock images
    createLocksArr: function () {
        for (let i = 0; i < this.startingLocks; i++) {
            let xCoord = ((i % 2) === 0) ? 225 : 575;
            let yCoord = 175 + (150 * Math.floor(i / 2));
            this.locksArr.push(this.createLock(i, xCoord, yCoord));
        }
        // we want to reverse the array so we can 'unlock' starting with the first (top left) lock
        this.locksArr = this.locksArr.reverse();
    },

    // create an individual lock image
    createLock: function (index, xCoord, yCoord) {
        var config = {
            key: 'unlock',
            //animation has 60 frames. Set end to 61 so it disappears once it 'unlocks'
            frames: this.anims.generateFrameNumbers('lock-animation', { start: 0, end: 61 }),
            frameRate: 60
        };
        this.anims.create(config);

        var lockGif = this.add.sprite(xCoord, yCoord, 'lock-animation');

        lockGif.displayWidth = 150;
        lockGif.scaleY = lockGif.scaleX;

        return lockGif;
    },

    unlockLock: function () {
        // remove the lock from this.locksArr and play the unlocking animation
        let tempLock = this.locksArr.pop();
        tempLock.play('unlock');
        // if that was the last lock, open the door
        if (this.locksArr.length === 0) {
            this.roundTimer.paused = true;
            tempLock.on('animationcomplete-unlock', () => {
                this.doorGif.play('openDoor');
            }, this);
        }
    },

    startTimer: function () {
        // game starts with 6 seconds on the clock, takes off 5 every round
        this.startingTime = 60 - ((this.currentLevel - 1) * 5);
        this.roundTimer = this.time.delayedCall(this.startingTime * 1000, this.endGame, [], this);
        this.timerField.setText('Timer:' + this.startingTime);
    },

    endGame: function () {
        this.shutdown();
        this.scene.launch('endScene', { score: this.currentScore, level: this.currentLevel });
    }
});

export default DoorScene;