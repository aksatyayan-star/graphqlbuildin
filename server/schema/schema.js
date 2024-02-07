//const g = require('gridfs-stream');
//const {projects, clients} = require('../sampleData.js') //importing projects and clients by destructuring from sampledata js file
//required when using js file as db

//Mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client'); //importing client and project mongooose models, so that we can us them to query the db

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLScalarType } = require('graphql');

//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType, // this is how we add relationships to diff resources
            resolve(parent,args){
                //return clients.find(client => client.id === parent.clientId); // finding client where clientid matches the parentid ie of project
                //as client is basically a child of a project...in our sample data in projects we do have a client id field
                return Client.findById(parent.clientId); //parent is project so we are returning client whose id is mentioned in the project's client id field
            }
        }
    })
});
//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id : {type: GraphQLID},
        name : {type: GraphQLString},
        email : {type: GraphQLString},
        phone : {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //return projects.find(project => project.id === args.id); //when js db
                return Project.findById(args.id); //using mongoose model and it's functions to query the db
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent,args){
                //return projects; // when js db then using this
                return Project.find(); //using mongoose model querying the db for all projects
            }
        },
        clients: {
            type: GraphQLList(ClientType), // as we are getting all clients so list..no args req here as simply getting all clients
            resolve(parent,args){
                //return clients; //simply returning the array when using js db
                return Client.find();
            }
        },
        client: {
            type: ClientType, // as we are getting individual client by id
            args: {id :{type: GraphQLID}}, //passing arg as id
            resolve(parent,args){
                //return clients.find(client => client.id === args.id);
                return Client.findById(args.id);
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}, //wrapping the name type inside GraphQLNonNull 
                //so that name field can't be passed as an empty string when calling this mutation to add new client details.
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client = new Client({ //cretaing a new client using mongoose client model
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save(); // here saving the client to the db...again mongoose function
            }
        },
        deleteClient: {
            type: ClientType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return Client.findByIdAndDelete(args.id); //mongoose method to delete by id
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: { //corresponding key value pairs
                            'new': {value: 'Not Started'}, 
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        }
                    }),
                    defaultValue: 'Not Started',
                }, //enum allows to specify a certain range of values that it can be 
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });
                return project.save();
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return Project.findByIdAndDelete(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate', //this name should be unique, as used ProjectStatus name above, hence here using ProjectStatusUpdate
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        }
                    })
                }
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    {new: true} //if project not there will create a new one
                );
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})