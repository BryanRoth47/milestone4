import React from 'react'

// renders a single line of the React leaderboard 
export default function Score(props) {
    //const toDisplay = props.score.name + '\t\t'+props.score.operation + '\t\t'+props.score.points;
    return (
        //<li>{props.score.name + '\t\t'+props.score.operation + '\t\t'+props.score.points}</li>
        <tr>
            <th>{props.score.name}</th>
            <th>{props.score.operation}</th>
            <th>{props.score.points}</th>
        </tr>
    )
}
