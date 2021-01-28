import { gql } from "@apollo/client";

const CreateQuestionMutation = gql`
  mutation createQuestion($title: String!, $categories: [String!], $answers: [String!], $correct: String!) {
    createQuestion(title: $title, categories: $categories, answers: $answers, correct: $correct) {
      id
    }
  }
`;

export default CreateQuestionMutation;