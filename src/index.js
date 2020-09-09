// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Phaser import
import Phaser from 'phaser';
// Import the Scenes Phaser will render
import MenuScene from './scenes/MenuScene';
import DoorScene from './scenes/DoorScene';
import EndScene from './scenes/EndScene';


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


var config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  canvas: document.getElementById('phaser-game'),
  audio: { noAudio: true },
  scene: [MenuScene, DoorScene, EndScene]
};


var game = new Phaser.Game(config);
game.getTime(); // this line is only here to supress React's warning about unused variables

