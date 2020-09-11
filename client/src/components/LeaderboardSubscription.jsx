import React, { Component } from 'react'
import {SCORES_QUERY} from '../graphql'
import { useQuery } from 'react-apollo';

// useQuery() requires a function, not a Component. This just gets allChats and calls a Component to render everything
export default function LeaderboardSubscription(props) {
    var { data: allScores } = useQuery(SCORES_QUERY);

    return (
        <Leaderboard allScores={allScores}/>
    )
}
