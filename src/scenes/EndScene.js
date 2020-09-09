import Phaser from 'phaser';

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
                               '\nLevels Completed: ' + this.completedLevels + 
                               '\nFinal Score: ' + this.finalScore;

        this.add.text(150, 250, stringToOutput, { font: '32px Courier', fill: '#000000' });
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
});

export default EndScene;