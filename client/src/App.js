import React from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard';


export default function App() {
    return (
        <React.Fragment>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Milestone 4</h1>

            <div class='container-fluid'>
                <div class="row justify-content-md-center">
                    <div class='col-md-auto'>
                        <div id='phaser-game'></div>
                    </div>
                    <div class='col col-sm-1'></div>
                    <div class='col col-md-2 my-auto'>
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

//            <canvas id='phaser-game' />