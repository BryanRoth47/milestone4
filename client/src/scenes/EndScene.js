import Phaser from 'phaser';
import { getScores } from '../phaserScores'
import ScoreApolloWrapper from '../components/ScoreSubmittal'

//var alreadySentScores = false;

var EndScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EndScene() {
            Phaser.Scene.call(this, 'endScene');
        },

    init: function (data) {
        // contains the final score achieved by the player
        this.finalScore = data.score;
        // contains the number of levels fully completed by the player
        this.completedLevels = data.level - 1;
        // contains the operation the player chose (first leter capitalized)
        this.chosenOperation = data.operation.replace(/\b\w/g, c => c.toUpperCase());
        // contains the difficulty the player chose (first leter capitalized)
        this.chosenDifficulty = data.difficulty.replace(/\b\w/g, c => c.toUpperCase());
        // stores the player's name
        this.playerName = '';
    },
    /*
        preload: function () {
    
        },
    */
    create: function () {
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffcc33, 1);

        graphics.fillRect(100, 200, 600, 300);

        const stringToOutput = 'Game Over' +
            '\nOperation: ' + this.chosenOperation +
            '\nDifficulty: ' + this.chosenDifficulty +
            '\nLevels Completed: ' + this.completedLevels +
            '\nFinal Score: ' + this.finalScore;

        this.add.text(250, 225, stringToOutput, { font: '24px Courier', fill: '#000000' });
        this.nameField = this.add.text(150, 375, 'Enter Name:', { font: '32px Courier', fill: 'purple' });
        this.nameField.removeInteractive();
        this.nameSubmit = this.add.text(150, 425, '', { font: '32px Courier', fill: 'purple' });

        this.registerKeystrokes();
    },

    registerKeystrokes: function () {
        // create listeners for input keystrokes
        this.input.keyboard.on('keydown', function (event) {
            // enter - submit answer
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER && this.nameSubmit.text.length > 0) {
                this.playerName = this.nameSubmit.text;
                // to simplify, the game always submits the score to the server. The server gets to decide if it belongs on the list
                this.submitHighScore();
                //tempDom.destroy();
                this.nameField.destroy();
                this.nameSubmit.destroy();
                this.displayHighScores();

            }
            // backspace - delete the last character
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && this.nameSubmit.text.length > 0) {
                this.nameSubmit.text = this.nameSubmit.text.substr(0, this.nameSubmit.text.length - 1);
            }
            // otherwise if its a negative sign or a valid number, add it to the field
            else if ((event.keyCode >= Phaser.Input.Keyboard.KeyCodes.A && event.keyCode <= Phaser.Input.Keyboard.KeyCodes.Z)
                || event.keyCode === Phaser.Input.Keyboard.KeyCodes.QUOTES || event.keyCode === Phaser.Input.Keyboard.KeyCodes.MINUS) {
                this.nameSubmit.text += event.key;
            }
        }, this);
    },


    displayHighScores: function () {
        var currentHighScores = getScores();
        /*
            It is difficult to ensure Phaser renders the high score list AFTER the server sends the updated list via subscription. 
            As such, Phaser will just display the highest score, and will manually determine if the new score is the highest, without
            waiting for the server.

        // the below code will display the high score list, if you can get it to synch properly.
        if (currentHighScores.length > 0) {
            this.add.text(150, 500, 'Current High Scores');
            this.add.text(200, 375, 'Name\t\t\tOperation\t\t\tScore');

            var textFieldsArray = [];
            for (let i = 0; i < currentHighScores.length; i++) {
                textFieldsArray.push(this.add.text(150, 400 + 25 * i, i + 1 + '.\t' + currentHighScores[i].name + '\t\t\t' + currentHighScores[i].operation + '\t\t\t' + currentHighScores[i].points));
            }
        }
        */

        // code below just displays the single highest score
        var scoreToDisplay = {};
        if (currentHighScores.length === 0 || this.finalScore > currentHighScores[0].points) {
            scoreToDisplay.name = this.playerName;
            scoreToDisplay.operation = this.chosenOperation;
            scoreToDisplay.score = this.finalScore;
        }
        else{
            console.log(currentHighScores);
            scoreToDisplay.name = currentHighScores[0].name;
            scoreToDisplay.operation = currentHighScores[0].operation;
            scoreToDisplay.score = currentHighScores[0].points;
        }

        this.add.text(300, 375, 'Current Highest Score', {fill:'black'});
        this.add.text(275, 400, 'Name\t\t\tOperation\t\t\tScore', {fill:'black'});
        this.add.text(250, 425,'1.\t' + scoreToDisplay.name + '\t\t\t\t' + scoreToDisplay.operation + '\t\t\t\t' + scoreToDisplay.score, {fill:'black'});
    },


    submitHighScore: function () {
        console.log('here');
        // create the React Component, triggering useMutation to send the data to the server
        this.add.reactDom(ScoreApolloWrapper, { name: this.playerName, operation: this.chosenOperation, score: this.finalScore });
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
});

export default EndScene;