import { gql } from "@apollo/client";

const QuestionsQuery = gql`
  {
    questions {
      id
      title
      answers
      correct
      categories
    }
  }
`;

export default QuestionsQuery;