// server/src/resolver.js

const chats = []
const LEADERBOARD_CHANNEL = 'LEADERBOARD_CHANNEL'

const resolvers = {
  Query: {
    chats (root, args, context) {
      return scores
    }
  },

  Mutation: {
    sendMessage (root, { name, points, operation }, { pubsub }) {
      const score = { id: scores.length + 1, name, points, operation }

      scores.push(score)
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

module.exports = resolvers