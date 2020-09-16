import React from 'react';
import { SEND_SCORE_MUTATION } from '../graphql';
import { ApolloProvider, useMutation } from 'react-apollo';
import { client } from '../index'

// use the boolean to ensure we don't send data on every render
var alreadySentScores = false;

// this only exists to wrap the function that calls useMutation in an <ApolloProvider>
export default function ScoreApolloWrapper({ name, operation, score }) {
    return (
        <ApolloProvider client={client}>
            <ScoreSendMutation name={name} operation={operation} score={score} />
        </ApolloProvider>
    )
}


function ScoreSendMutation({ name, operation, score }) {
    const [sendScore,] = useMutation(SEND_SCORE_MUTATION);
    if (name !== undefined && alreadySentScores === false) {
        alreadySentScores = true;
        sendScore({ variables: { name: name, points: score, operation: operation } });
    }
    //return (<p>aaaaaa</p>)    // use this return to force the score to render something, giving a visual indicator that it was called
    return null;
}