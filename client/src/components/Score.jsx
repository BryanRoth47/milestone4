import React from 'react'

export default function Score(props) {
    const toDisplay = props.score.name + '\t\t'+props.score.operation + '\t\t'+props.score.points;
    return (
        <li>{toDisplay}</li>
    )
}
