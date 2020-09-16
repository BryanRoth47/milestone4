import React from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard';


export default function App() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Milestone 4</h1>
            <div id='phaser-game'></div>
            <Leaderboard />
        </div>
    );
}

//            <canvas id='phaser-game' />