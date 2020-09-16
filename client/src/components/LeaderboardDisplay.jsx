import React, { Component } from 'react'
import Score from './Score';

export class LeaderboardDisplay extends Component {

    componentDidMount(){
        this.props.subscribeToNewScores();
    }

    render() {
        const scoresArr = this.props.allScores;
        let scoresToDisplay = null;
        if (scoresArr !== undefined && scoresArr.length > 0) {
            scoresToDisplay = scoresArr.map((score, index) => {
                return <Score key={score.id} score={score} />
            });
        }

        return (
            <ol id='leaderboardList' type='1'>
                {scoresToDisplay}
            </ol>
        )
    }
}

export default LeaderboardDisplay
