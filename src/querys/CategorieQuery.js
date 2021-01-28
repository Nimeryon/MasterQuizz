import { gql } from "@apollo/client";

const CategoriesQuery = gql`
  {
    categories {
      id
      title
    }
  }
`;

export default CategoriesQuery;