//initially put graphql query here but later on will move it to a diff specific folder, can see the commented out GET_CLIENTS query

import { gql, useQuery } from '@apollo/client'; //gql is used to make the query and to use that query we use useQuery hook
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries'; //this when queries we move to separate file

//creating getclients query
/*
const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        } 
    }
`;
*/

export default function Clients() {
    //to get data from the above query, we will be using useQuery hook, we can destructure that to get other things as well 
    // apollo acts as a state manager, how redux helps in case of rest api
    const { loading, error, data } = useQuery(GET_CLIENTS);

    //if(loading) return <p>Loading...</p>
    if(loading) return <Spinner />; //here inserted spinner component
    if(error) return <p>Error...</p>
    
    return(
        <>
            {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/*here we will loop through the clients and it's data*/}
                    {data.clients.map(client => (
                        <ClientRow key ={client.id} client={client} />
                    ))}
                </tbody>
            </table>
            )}
        </>
    );
}
