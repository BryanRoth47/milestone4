import React, { Component } from 'react'
import Score from './Score';
import { updateScoresInPhaser } from '../phaserScores'

export class LeaderboardDisplay extends Component {

    componentDidMount() {
        this.props.subscribeToNewScores();
    }

    render() {
        updateScoresInPhaser(this.props.allScores);
        const scoresArr = this.props.allScores;
        let scoresToDisplay = null;
        if (scoresArr !== undefined && scoresArr.length > 0) {
            scoresToDisplay = scoresArr.map((score, index) => {
                return <Score position={index} key={score.id} score={score} />
            });
        }

        return (
            <div class="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div class="text-center">
                    <h2>Leaderboard</h2>
                    <div class='table-responsive'>
                        <table class='table'>
                            <thead>
                                <tr>
                                    <th scope="text-center"></th>
                                    <th scope="text-center">Player</th>
                                    <th scope="text-center">Operation</th>
                                    <th scope="text-center">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoresToDisplay}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeaderboardDisplay
