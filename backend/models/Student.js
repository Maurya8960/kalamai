const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    degree: String,
    year: String,
    semester: String,
    course: String
});
module.exports = mongoose.model('Student', studentSchema);
