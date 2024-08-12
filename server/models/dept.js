const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    sno: Number,
    subcode: String,
    sub: String,
    credit: Number
  });

const deptSchema = new mongoose.Schema({
    sem: Number,
    subjects: [subjectSchema]
  });
  
function getDepartmentModel(collectionName) {
    return mongoose.model('Department', deptSchema, collectionName);
}
  
module.exports = getDepartmentModel;
