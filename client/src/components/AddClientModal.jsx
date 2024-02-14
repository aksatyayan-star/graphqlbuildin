import { useState } from "react"; //we will have form and each field will be a piece of comp state
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";


export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // we need to connect the value to a piece of state, using these in input below label classes

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: {addClient} }) { //second method of using cache
            const { clients } = cache.readQuery({ query:
            GET_CLIENTS });

            cache.writeQuery({
              query: GET_CLIENTS,
              //data: { clients: clients.concat([addClient])} //below line is doing the same thing using spread operator
              data: { clients: [...clients, addClient]},
            });
          }
    });

    const onSubmit = (e) => { //this is gonna submit the form
        e.preventDefault(); 
        
        if(name === "" || email === "" || phone === ""){
            return alert("Please fill in all fields");
        }

        addClient(name, email, phone);

        setName('');
        setEmail('');
        setPhone(''); //emptying the fields after adding it in db
    };

  return ( //whole code copied from Modal section of getbootstrap.com

    <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
            <div className="d-flex align-items-centre">
                <FaUser className="icon" />
                <div>Add Client</div>
            </div>
        </button>

        <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={ (e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" value={phone} onChange={ (e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-seondary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
