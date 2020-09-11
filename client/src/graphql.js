import gql from 'graphql-tag'

export const SCORES_QUERY = gql`
  query ScoresQuery {
    scores {
      id
      name
      points
      operation
    }
  }
`

export const SEND_SCORE_MUTATION = gql`
mutation SendScoreMutation($name: String!, $points: Int!, $operation: String!) {
  sendScore(
    name: $from,
    points: $points,
    operation: $operation
  ) {
    id
    name
    points
    operation
  }
}
`

export const SCORE_SENT_SUBSCRIPTION = gql`
subscription ScoreSentSubscription {
  scoreAdded {
    id
    name
    points
    operation
  }
}
`