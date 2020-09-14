// copy of the scores stored by React for the leaderboard
var scores = [];
// function to allow Scenes to access the scores
function getScores() {
    return scores;
}
// function to let React update the scores
function updateScoresInPhaser(newScores) {
    if (newScores !== undefined) {
        scores = newScores;
    }
}

export { getScores, updateScoresInPhaser };