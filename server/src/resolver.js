// server/src/resolver.js

const scores = []
var nextId=1;
const LEADERBOARD_CHANNEL = 'LEADERBOARD_CHANNEL'

const resolvers = {
  Query: {
    scores(root, args, context) {
      return scores
    }
  },

  Mutation: {
    sendScore(root, { name, points, operation }, { pubsub }) {
      const score = { id: nextId++, name, points, operation }
      // track the top 10 scores
      if (scores.length === 10 && (score.points > scores[scores.length - 1].points)) {
        // only add a new score to the list if we already have 10 scores AND the new one belongs on the list
          scores.push(score);
          scores.sort(sortScores);
          scores.pop();
      }
      else{
        // if there aren't already 10 scores on the list, add this one
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