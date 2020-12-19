const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
  bookIssue: {
    type: String,
    require: true
  },
  issueName: {
    type: String,
    require: true
  },
  issueDoB: {
    type: String,
    require: true
  },
  issueAddress: {
    type: String,
    require: true
  },
},

  {
    timestamps: true
  }
);
module.exports = mongoose.model('issuer', issueSchema);