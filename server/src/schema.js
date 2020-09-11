    // server/src/schema.js

    const typeDefs = `
      type Score {
        id: Int!
        name: String!
        points: Int!
        operation: String!
      }
      type Query {
        scores: [Score]
      }

      type Mutation {
        sendMessage(name: String!, points: Int!, operation: String!): Score
      }

      type Subscription {
        scoreAdded: Score
      }
    `
    module.exports = typeDefs