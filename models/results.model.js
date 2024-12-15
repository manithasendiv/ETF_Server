const mongoose = require('mongoose');

const Results = new mongoose.Schema(
    {
        sid: { type: Number, required: true, unique: true},
        etf: { type: String, required: true },
        wad: { type: String, required: true },
        oop: { type: String, required: true },
        se: { type: String, required: true },
        dbms: { type: String, required: true },
    },
    { collection: 'results' }
);

const model = mongoose.model('ResultsData', Results);

module.exports = model;