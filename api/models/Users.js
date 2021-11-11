const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var today = new Date()

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profileImg:{
		type: String,
		default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		required: false
	},
	highScore: {
		type: Number,
		default:0,
		required: false
	}

}, {collection: "users"});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;