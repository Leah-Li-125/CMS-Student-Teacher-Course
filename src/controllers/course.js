const Course = require("../models/course");

async function addCourse(req, res) {
	const { name, code, description } = req.body;
	const course = new Course({
		name,
		code,
		description
	});
	await course.save();
	return res.json(course);
}

async function getAllCourses(req, res) {
	const courses = await Course.find();
	return res.json(courses);
}

async function getCourse(req, res) {
	const { id: code } = req.params;
	//{ id:code } to rename the name you defined in js file in routes /:id
	const course = await Course.findById(code);
	if (!course) {
		return res.status(404).send("Course not found");
	}
	return res.json(course);
}

async function updateCourse(req, res) {
	const { id: code } = req.params;
	const { name, description } = req.body;
	//findByIdAndUpdate(code) is same as updateOne(code)
	//if you need to do some validation, you must use .save() instead of using findByIdAndUpdate() straight away. you can usenfindById() first to get the document and then use course.name = name etc to update the content and then use course.save() to store the updated doc to db and do the db validation like limit of length here.
	const course = await Course.findByIdAndUpdate(
		code,
		{
			name,
			description
		},
		//return the updated data , if false it will return the non-updated data
		{ new: true }
	);
	if (!course) {
		return res.status(404).send("Course not found");
	}
	return res.json(course);
}
async function deleteCourse(req, res) {
	const { id: code } = req.params;
	const course = await Course.findByIdAndDelete(code);
	if (!course) {
		return res.status(404).send("Course not found");
	}
	return res.json(course); //return the deleted course after deleting
	// return res.json(); // return nothing after deleting
}

module.exports = {
	addCourse,
	getCourse,
	getAllCourses,
	updateCourse,
	deleteCourse
};
