import {gql} from '@apollo/client';

//creating getclients query
const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        } ${/*this part we paste same exactly how we put when calling graphql api from graphiql*/''}
    }
`;

export {GET_CLIENTS};