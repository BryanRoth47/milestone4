import Phaser from 'phaser';
import { getScores } from '../phaserScores'
//import {sendScoreToServer} from '../components/Leaderboard'

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
        if (currentHighScores !== undefined && currentHighScores.length > 0) {
            this.add.text(150, 350, 'Current High Scores');
            this.add.text(200, 375, 'Name\t\t\tOperation\t\t\tScore');

            var textFieldsArray = [];
            for (let i = 0; i < currentHighScores.length; i++) {
                textFieldsArray.push(this.add.text(150, 400 + 25 * i, i + 1 + '.\t' + currentHighScores[i].name + '\t\t\t' + currentHighScores[i].operation + '\t\t\t' + currentHighScores[i].points));
            }
            if (400 > currentHighScores[currentHighScores.length - 1].points) {
                //sendScoreToServer();
            }
        }
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
});

export default EndScene;