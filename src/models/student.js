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

const model = mongoose.model("Student", schema);

schema.virtual("fullName").get(function() {
	return `${this.firstName} ${this.lastName}`;
});

module.exports = model;
