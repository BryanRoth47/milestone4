import Phaser from 'phaser';
//ArdentScript
import { additionOptions } from '../templates/addition';
import { subtractionOptions } from '../templates/subtraction';
import { multiplicationOptions } from '../templates/multiplication';
import { divisionOptions } from '../templates/division';

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

            this.scene.start('doorScene', { problemType: [additionOptions], level: 6, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_TWO', function () {

            this.scene.start('doorScene', { problemType: [subtractionOptions], level: 1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_THREE', function () {

            this.scene.start('doorScene', { problemType: [multiplicationOptions], level: 1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_FOUR', function () {

            this.scene.start('doorScene', { problemType: [divisionOptions], level: 1, currentScore: 0 });

        }, this);

        this.input.keyboard.once('keyup_FIVE', function () {

            this.scene.start('doorScene', {
                problemType: [additionOptions, subtractionOptions, multiplicationOptions, divisionOptions],
                level: 1,
                currentScore: 0
            });

        }, this);

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }

});

export default MenuScene;