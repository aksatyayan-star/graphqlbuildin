import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client'; //similar to useQuery hook
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
//we can bring any query or mutation into any comp using apollo client that's why it's a state manager

export default function ClientRow({ client }) { //we can do props.client or using destructure to pass client

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {id: client.id}, //passing second param as variables where we will pass the client id to be deleted
    refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
    //refetchQueries: [{query: GET_CLIENTS}], //first method of refetching
    /* update(cache, {data: {deleteClient} }) { //second method of using cache
      const { clients } = cache.readQuery({ query:
      GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.filter(client => client.id !== deleteClient.id)}
      });
    } */ //here commenting out this as we have to update two things clients and projects, so used refetch queries method
  });
  //now this function will delete the client but won't be reflected in ui unless we refresh
  //to deal with that we have two options : we can refetch the query i.e call GET_CLIENTS again
  //or we update the cache instead of making a complete request(GET_CLIENTS) again

  return (
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  );
}
