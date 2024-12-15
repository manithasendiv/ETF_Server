const mongoose = require('mongoose');

const Subjects = new mongoose.Schema(
    {
        subject: { type: String, required: true },
        title: { type: String, required: true },
        path: { type: String, required: true }
    },
    { collection: 'subjects' }
);

const model = mongoose.model('SubjectData', Subjects);

module.exports = model;