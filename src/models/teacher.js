const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
			required: true,
			validate: {
				validator: email =>
					!Joi.validate(email, Joi.string().email()).error,
				msg: "Invalid email format"
			}
		},
		courses: [{ type: String, ref: "Course" }]
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
