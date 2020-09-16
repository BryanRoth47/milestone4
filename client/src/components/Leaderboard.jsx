import React from 'react'
import { SCORES_QUERY, SCORE_SENT_SUBSCRIPTION } from '../graphql';
import { useQuery } from 'react-apollo';
import LeaderboardDisplay from './LeaderboardDisplay';
import { updateScoresInPhaser } from '../phaserScores'

// useQuery() requires a function, not a Component. This just gets allChats and calls a Component to render everything
export default function Leaderboard(props) {
    var { subscribeToMore, data: allScores } = useQuery(SCORES_QUERY);
    // React appears to render the page once, then calls useQuery(). We have to ensure allScores.scores is defined for that first call
    if (allScores === undefined) {
        allScores = {};
    }
    if (allScores.scores === undefined) {
        allScores.scores = [];
    }

    updateScoresInPhaser(allScores.scores);
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div id='leaderboardDiv' >
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
            </div>
        </div>
    )
}
//<button onClick={() => SendToServer('test',400, 'addition')}>Click</button>

