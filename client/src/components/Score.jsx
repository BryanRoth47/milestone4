import React from 'react'

// renders a single line of the React leaderboard 
export default function Score(props) {
    /*
        Output is formatted so that names and operations are capitalized, score is displayed as 2,000
    */
    return (
        <tr>
            <th scope="row">{props.position + 1}</th>
            <td style={{ textTransform: 'capitalize' }}>{props.score.name}</td>
            <td style={{ textTransform: 'capitalize' }}>{props.score.operation}</td>
            <td>{props.score.points.toLocaleString("en-US")}</td>
        </tr>
    )
}
