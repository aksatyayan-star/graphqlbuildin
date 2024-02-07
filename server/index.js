const express = require('express'); //creating express server
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema'); // importing schema file that's inside schema folder
const connectDB = require('./config/db'); // importing the db connection function, after connecting we need to call it
const port = process.env.PORT || 4000; // will first look in the env var for port, if not found then will connect to 5000
const app = express();

//connect to db
connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development' //instead of directly setting it to true, im doing when we are in dev
}))
app.listen(port, console.log(`Server running on port ${port}`));