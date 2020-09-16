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

        this.add.text(150, 250, stringToOutput, { font: '24px Courier', fill: '#000000' });
        var currentHighScores = getScores();
        if (currentHighScores.length > 0) {
            this.add.text(150, 350, 'Current High Scores');
            this.add.text(200, 375, 'Name\t\t\tOperation\t\t\tScore');

            var textFieldsArray = [];
            for (let i = 0; i < currentHighScores.length; i++) {
                textFieldsArray.push(this.add.text(150, 400 + 25 * i, i + 1 + '.\t' + currentHighScores[i].name + '\t\t\t' + currentHighScores[i].operation + '\t\t\t' + currentHighScores[i].points));
            }/*
            if (this.finalScore > currentHighScores[currentHighScores.length - 1].points) {
                this.submitHighScore(currentHighScores);
            }
        }
        else {
            */
            //let tempDom = this.submitHighScore(currentHighScores);
            //tempDom.destroy();
        }
        // to simplify, the game always submits the score to the server. The server gets to decide if it belongs on the list
            let tempDom = this.submitHighScore(currentHighScores);
            tempDom.destroy();
    },


    submitHighScore: function (currentHighScores) {
        //if (alreadySentScores === false) {
           // alreadySentScores = true;
            // create the React Component, triggering useMutation to send the data to the server
            return this.add.reactDom(ScoreApolloWrapper, { name: 'test', operation: this.chosenOperation, score: this.finalScore });
            // then destroy the component, since we no longer need it
       // }
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
});

export default EndScene;