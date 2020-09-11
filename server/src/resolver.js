// server/src/resolver.js

const scores = []
const LEADERBOARD_CHANNEL = 'LEADERBOARD_CHANNEL'

const resolvers = {
  Query: {
    scores(root, args, context) {
      return scores
    }
  },

  Mutation: {
    sendScore(root, { name, points, operation }, { pubsub }) {
      const score = { id: scores.length + 1, name, points, operation }
      if (scores.length > 10) {
        if (score.points > scores[scores.length - 1]) {
          scores.push(score);
          scores.sort(sortScores);
          scores.pop();
        }
      }
      else{
        scores.push(score);
        scores.sort(sortScores);
      }

      pubsub.publish('LEADERBOARD_CHANNEL', { scoreAdded: score })

      return score
    }
  },

  Subscription: {
    scoreAdded: {
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