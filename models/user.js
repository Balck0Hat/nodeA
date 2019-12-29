const mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
    unique_id: Number,
    email: String,
    userId: String,
    username: String,
    password: String,
    token: String,
    type: String,
    country: String,
    isConfirmed: Boolean,
    longitude: {type: mongoose.Types.Decimal128, default: 0.0},
    latitude: {type: mongoose.Types.Decimal128, default: 0.0},
    passwordConf: String
}),
    User = mongoose.model('User', userSchema);

module.exports = User;