import Phaser from 'phaser';
import { instantiate } from '@ardentlabs/ardent-script';
import { additionOptions } from '../templates/addition';

var questionField;
var textEntry;
var keyEnter;

var DoorScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function DoorScene() {
            Phaser.Scene.call(this, 'doorScene');
        },

    init: function (data) {
        this.currentLevel = data.level;
        this.problemType = data.problemType;
        this.score = data.currentScore;
    },

    preload: function () {
        this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/qYVPd8T.png', { frameWidth: 640, frameHeight: 640, endFrame: 19 });
    },

    create: function () {
        // function that sets up the animation for opening the door
        var doorGif = this.createDoorAnimation();

        // function that creates the input field
        this.createAnswerField();

        this.input.once('pointerdown', function () {
            doorGif.play('openDoor');
        });

        this.input.keyboard.on('keydown', function (event) {
            // backspace - delete the last character
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE && textEntry.text.length > 0) {
                textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            // otherwise if its a negative sign or a valid number, add it to the field
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.NUMPAD_SUBTRACT ||
                event.keyCode === Phaser.Input.Keyboard.KeyCodes.MINUS ||
                (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                textEntry.text += event.key;
            }

        });

    },

    update: function () {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            textEntry.text = '';

            const temp = instantiate(additionOptions[1].template);

            console.log(temp);

            alert(temp.questionText);

        }
    },

    shutdown: function () {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },

    createAnswerField: function () {
        questionField = this.add.text(10, 10, '', { font: '32px Courier', fill: '#ffffff' });
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        textEntry = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });

    },

    createDoorAnimation: function () {
        var config = {
            key: 'openDoor',
            frames: this.anims.generateFrameNumbers('door-openAnimation', { start: 0, end: 18 }),
            frameRate: 19
        };

        this.anims.create(config);

        var doorGif = this.add.sprite(400, 300, 'door-openAnimation');

        doorGif.displayWidth = 300;
        doorGif.scaleY = doorGif.scaleX;

        return doorGif;
    }



});

export default DoorScene;