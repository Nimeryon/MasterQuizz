var { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Categorie {
    id: ID!
    title: String!
  }

  type Question {
    id: ID!
    categories: [String!]
    title: String!
    answers: [String!]
    correct: String!
  }

  type Query {
    question(id: ID!): Question
    questions: [Question]
    categorie(id: ID!): Categorie
    categories: [Categorie]
  }

  type Mutation {
    createCategorie(title: String!): Categorie
    updateCategorie(id: ID!, title: String!): Boolean
    deleteCategorie(id: ID!): Boolean
    createQuestion(title: String!, categories: [String!], answers: [String!], correct: String!): Question
    updateQuestion(id: ID!, title: String!, categories: [String!], answers: [String!], correct: String!): Boolean
    deleteQuestion(id: ID!): Boolean
  }
`);

module.exports = schema;