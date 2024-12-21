const mongoose = require('mongoose');

// Define the Results schema
const ResultsSchema = new mongoose.Schema(
    {
        sid: { type: Number, required: true, unique: true },
        etf: { type: String, required: true },
        wad: { type: String, required: true },
        oop: { type: String, required: true },
        se: { type: String, required: true },
        dbms: { type: String, required: true },
    },
    { collection: 'results' }
);

// Create the Results model based on the schema
const Results = mongoose.model('ResultsData', ResultsSchema);

// Export the Results model to be used in other files
module.exports = Results;
