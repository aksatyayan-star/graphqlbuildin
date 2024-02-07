const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: { // want to restrict it to only couple of values
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, //automatically created mongodb id
        ref: 'Client', //ref: 'Client': This indicates that the clientId field references documents in another collection named 'Client'. 
        //This establishes a relationship between the current schema and the 'Client' collection. Specifically, it establishes a "foreign key" relationship in MongoDB terms.
    }
});

module.exports = mongoose.model('Project', ProjectSchema);