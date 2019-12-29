const mongoose = require('mongoose');
var Schema = mongoose.Schema;

groupSchema = new Schema({
    unique_id: Number,
    groupId: String,
    users: {type: Array, default: []},
    groupName: String,
    groupImage: {type: String, default: ""},
    password: {type: String, default: ""},
    type: {type: String, enum: ['Public', 'Private'], default: "Public"},
    isVisible: Boolean,
    country: String
}),
    Group = mongoose.model('Group', groupSchema);

module.exports = Group;