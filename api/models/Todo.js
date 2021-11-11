const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var today = new Date()

const CaseSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	accused: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	owner: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
	}
}, {collection: "cases"});

const Case = mongoose.model("Case", CaseSchema);

module.exports = Case;