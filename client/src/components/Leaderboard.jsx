import React from 'react'
import { SCORES_QUERY, SCORE_SENT_SUBSCRIPTION, SEND_SCORE_MUTATION } from '../graphql';
import { useQuery, useMutation } from 'react-apollo';
import LeaderboardDisplay from './LeaderboardDisplay';
import { updateScoresInPhaser } from '../phaserScores'

// useQuery() requires a function, not a Component. This just gets allChats and calls a Component to render everything
export default function Leaderboard(props) {
    var { subscribeToMore, data: allScores } = useQuery(SCORES_QUERY);

    // React appears to render the page once, then calls useQuery. We have to ensure allScores.scores is defined for that first call
    if (allScores === undefined) {
        allScores = {};
    }
    if (allScores.scores === undefined) {
        allScores.scores = [];
    }

    //const [sendScore] = useMutation(SEND_SCORE_MUTATION);

    updateScoresInPhaser(allScores.scores);
    return (
        <div id='leaderboardDiv'>
            <h6>Leaderboard</h6>
            <LeaderboardDisplay allScores={allScores.scores} subscribeToNewScores={() =>
                subscribeToMore({
                    document: SCORE_SENT_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newScores = Object.assign({}, prev, {
                            scores: subscriptionData.data.newScores
                        });
                        updateScoresInPhaser(newScores.scores);
                        return newScores;
                    }
                })
            } />
            <button onClick={() => SendToServer('test',400, 'addition')}>Click</button>
        </div>
    )
}

function SendToServer(name, points, operation){
    const [sendScore,] = useMutation(SEND_SCORE_MUTATION);
    sendScore({variables:{name:'test',points:400, operation:'addition'}});
    return(
        null
        );
}
//<button onClick={() => sendScore({variables:{name:'test',points:400, operation:'addition'}})}>Click</button>