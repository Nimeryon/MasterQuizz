import { gql } from "@apollo/client";

const QuestionsQuery = gql`
  {
    questions {
      id
      title
      answers
      correct
    }
  }
`;

export default QuestionsQuery;