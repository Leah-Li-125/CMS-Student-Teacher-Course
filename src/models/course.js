const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		_id: {
			type: String,
			uppercase: true,
			alias: "code" //same as virtual('code')
		},
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: "this is a description"
		},
		__v: {
			type: Number,
			select: false
			/*
            when mongoose compiles object to json, will not select __v field.
            (when you dont use mongoose, the data you get from db is json. however, if you use mongoose to get data, the mongoose will transfer the json to a mongoose object and then transfer back to json, so using mongoose will be slower then directly get data from db. the advantage of using mongoose is you can use mongoose api like select)
            */
		}
	},
	{
		timestamps: true,
		/* 
        add createAt and updateAt when you do a post
        the second argument here is a config argument defining how you will store your documents into database. if you deal with the __v ignoration here, the database will not store any field about __v;
        the first arguemnt above is your blueprint which you defined in schema, like _id, name etc, defining which field you will store and how to deal with each field. if you deal with the __v ignoration there, the database will still store the field of __v but will not diplay it.
        */
		toJSON: {
			virtuals: true //virtuals means virtual existence so it will not be stored in db but show in server when mongoose transfer the object back toJSON. for example, you want to have a field full name containing firstName and lastName, you can use virtual to combine them and display it before return the data back to the requestor.
		},
		id: false // do not display the virtual id just display code
	}
);

// schema.virtual("code").get(function() {
// 	return this._id;
// });

const model = mongoose.model("Course", schema);

module.exports = model;
