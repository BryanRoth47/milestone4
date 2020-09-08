import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import DoorScene from './scenes/DoorScene';

var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  canvas: document.getElementById('phaser-game'),
  scene: [MenuScene, DoorScene]/*{
    preload: preload,
    create: create,
    update: update
  }
  */
};

var game = new Phaser.Game(config);
//var keyEnter;
//var textEntry;

/*
function preload() {
  this.load.spritesheet('door-openAnimation', 'https://i.imgur.com/qYVPd8T.png', { frameWidth: 640, frameHeight: 640, endFrame: 19 });

}
*/


/*
function create() {
  // function that sets up the animation for opening the door
  var doorGif = createDoorAnimation(this);

  // function that creates the input field
  createAnswerField(this);

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

}
*/
/*
function update() {
  if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
    textEntry.text = '';

    const temp = instantiate(additionOptions[1].template);

    console.log(temp);

    alert(temp.questionText);

  }
}
*/

/*
function createDoorAnimation(phaserGame) {
  var config = {
    key: 'openDoor',
    frames: phaserGame.anims.generateFrameNumbers('door-openAnimation', { start: 0, end: 18 }),
    frameRate: 19
  };

  phaserGame.anims.create(config);

  var doorGif = phaserGame.add.sprite(400, 300, 'door-openAnimation');

  doorGif.displayWidth = 300;
  doorGif.scaleY = doorGif.scaleX;

  return doorGif;
}

function createAnswerField(phaserGame) {
  phaserGame.add.text(10, 10, 'Answer:', { font: '32px Courier', fill: '#ffffff' });
  textEntry = phaserGame.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });
  keyEnter = phaserGame.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
}

*/
function openLock(player, lock) {
  /*
    //try this??
      function collectStar (player, star)
      {
        star.disableBody(true, true);
      }
  */
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
