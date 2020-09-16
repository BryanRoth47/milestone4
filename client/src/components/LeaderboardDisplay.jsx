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
                return <Score key={score.id} score={score} />
            });
        }

        return (
            /*
            <ol id='leaderboardList' type='1'>
                {scoresToDisplay}
            </ol>
            */
            <React.Fragment>
                <h4 style={{ textAlign: 'center', width: '50%' }}>Leaderboard</h4>
                <table style={{ width: '50%' }}>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Operation</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoresToDisplay}
                    </tbody>
                </table>
            </React.Fragment>

        )
    }
}

export default LeaderboardDisplay
