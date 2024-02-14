import { gql } from '@apollo/client';

//creating getprojects query
const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
        } ${/*this part we paste same exactly how we put when calling graphql api from graphiql*/''}
    }
`;

//get individual projects details
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };
