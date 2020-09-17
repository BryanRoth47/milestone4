// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Phaser import
import Phaser from 'phaser';
// plugin to allow Phaser to communicate with React
import phaserReact from "phaser3-react";
// Import the Scenes Phaser will render
import MenuScene from './scenes/MenuScene';
import DoorScene from './scenes/DoorScene';
import EndScene from './scenes/EndScene';
// server stuff
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


var phaserConfig = {
  parent: 'phaser-game',
  dom: { createContainer: true },
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  //canvas: document.getElementById('phaser-game'), // removed, since plugin PhaserReact requires 'parent' property
  audio: { noAudio: true },
  scene: [MenuScene, DoorScene, EndScene],
  plugins: {
    global: [
      {
        key: 'phaser-react',
        plugin: phaserReact,
        start: true
      }
    ]
  }
};


var game = new Phaser.Game(phaserConfig);
game.getTime(); // this line is only here to supress React's warning about unused variables

export {client}