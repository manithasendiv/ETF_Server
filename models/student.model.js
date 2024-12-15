const mongoose = require('mongoose');

const Student = new mongoose.Schema(
    {
        sid: { type: Number, required: true, unique: true},
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        nearCity: { type: String, required: true },
        course: [String],
        guardian: { type: String, required: true },
        subjects: [String]
    },
    { collection: 'students' }
);

const model = mongoose.model('StudentData', Student);

module.exports = model;