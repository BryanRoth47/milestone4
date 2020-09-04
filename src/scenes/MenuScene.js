import Phaser from 'phaser';

var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Menu() {
            Phaser.Scene.call(this, 'menu');
        },

    create: function () {
        this.add.text(10, 10, 'Choose your questions:', { font: '16px Courier', fill: '#00ff00' });
        this.add.text(10, 25, '1. Addition:', { font: '12px Courier', fill: '#00ff00' });
        this.add.text(10, 40, '2. Subtraction:', { font: '12px Courier', fill: '#00ff00' });
        this.add.text(10, 55, '3. Multiplication:', { font: '12px Courier', fill: '#00ff00' });
        this.add.text(10, 70, '4. Division:', { font: '12px Courier', fill: '#00ff00' });
        this.add.text(10, 85, '5. All of the above:', { font: '12px Courier', fill: '#00ff00' });


        this.input.keyboard.once('keyup_ONE', function () {

            this.scene.start('doorScene', { problemType: 1, level:1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_TWO', function () {

            this.scene.start('doorScene', { problemType: 2, level:1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_THREE', function () {

            this.scene.start('doorScene', { problemType: 3, level:1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_FOUR', function () {

            this.scene.start('doorScene', { problemType: 4, level:1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_FIVE', function () {

            this.scene.start('doorScene', { problemType: 5, level:1, currentScore: 0 });

        }, this);

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});

export default MenuScene;