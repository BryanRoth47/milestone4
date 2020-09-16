// server/src/resolver.js

const scores = []
const MAX_SCORES_KEPT = 2;
const LEADERBOARD_CHANNEL = 'LEADERBOARD_CHANNEL';
var nextId = 1;

const resolvers = {
  Query: {
    scores(root, args, context) {
      return scores
    }
  },

  Mutation: {
    sendScore(root, { name, points, operation }, { pubsub }) {
      const score = { id: nextId++, name, points, operation }
      // track the top MAX_SCORES_KEPT scores
      if (scores.length >= MAX_SCORES_KEPT && (score.points > scores[scores.length - 1].points)) {
        console.log('top');
        // only add a new score to the list if we already have 10 scores AND the new one belongs on the list
        scores.push(score);
        scores.sort(sortScores);
        scores.pop();
        // could also iterate through array, use scores.splice() to add in the new score, then pop() --> maybe better performance?. 
        //The above seemed simpler to implement, given this is just proof of concept
      }
      else if (scores.length < MAX_SCORES_KEPT) {
        console.log('bottom');
        // if there aren't already MAX_SCORES_KEPT scores on the list, add this one
        scores.push(score);
        scores.sort(sortScores);
      }

      pubsub.publish('LEADERBOARD_CHANNEL', { newScores: scores })

      return score;
    }
  },

  Subscription: {
    newScores: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(LEADERBOARD_CHANNEL)
      }
    }
  }
}

function sortScores(firstEl, secondEl) {
  if (firstEl.points > secondEl.points) {
    return -1;
  }
  else if (firstEl.points < secondEl.points) {
    return 1;
  }
  else return 0;
}

module.exports = resolvers