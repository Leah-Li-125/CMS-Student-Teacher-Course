const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		title: {
			type: String
		},
		email: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true
		},
		id: false
	}
);

schema.virtual("fullName").get(function() {
	return `${this.title} ${this.firstName} ${this.lastName}`;
});

const model = mongoose.model("Teacher", schema);

module.exports = model;
