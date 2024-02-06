//const g = require('gridfs-stream');
const {projects, clients} = require('../sampleData.js') //importing projects and clients by destructuring from sampledata js file

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

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
                return clients.find(client => client.id === parent.clientId); // finding client where clientid matches the parentid ie of project
            }// as client is basially a child of a project...in our sample data in projects we do have a client id field
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
                return projects.find(project => project.id === args.id);
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent,args){
                return projects;
            }
        },
        clients: {
            type: GraphQLList(ClientType), // as we are getting all clients so list..no args req here as simply getting all clients
            resolve(parent,args){
                return clients; //simply returning the array
            }
        },
        client: {
            type: ClientType, // as we are getting individual client by id
            args: {id :{type: GraphQLID}}, //passing arg as id
            resolve(parent,args){
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})