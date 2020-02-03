const Teacher = require("../models/teacher");
const Course = require("../models/course");

async function addTeacher(req, res) {
	const { firstName, lastName, title, email } = req.body;
	const teacher = new Teacher({
		firstName,
		lastName,
		title,
		email
	});
	await teacher.save();
	return res.json(teacher);
}

async function getAllTeachers(req, res) {
	const teachers = await Teacher.find().exec();
	return res.json(teachers);
}

async function getTeacher(req, res) {
	const { id } = req.params;
	const teacher = await Teacher.findById(id).exec();
	if (!teacher) {
		return res.status(404).json("Teacher not found");
	}
	return res.json(teacher);
}

async function updateTeacher(req, res) {
	const { id } = req.params;
	const { firstName, lastName, title, email } = req.body;
	const teacher = await Teacher.findByIdAndUpdate(
		id,
		{
			firstName,
			lastName,
			title,
			email
		},
		{ new: true }
	).exec();
	if (!teacher) {
		return res.status(404).send("Teacher not found");
	}
	return res.json(teacher);
}

async function deleteTeacher(req, res) {
	const { id } = req.params;
	const teacher = await Teacher.findByIdAndDelete(id).exec();
	if (!teacher) {
		return res.status(404).send("Teacher not found");
	}

	await Course.updateMany(
		{ _id: { $in: teacher.courses } },
		{ $pull: { teachers: teacher._id } }
	).exec();
	// return res.json(teacher);
	return res.sendStatus(200);
}

async function addCourse(req, res) {
	const { code, id } = req.params;
	const teacher = await Teacher.findById(id).exec();
	const course = await Course.findById(code).exec();

	if (!teacher || !course) {
		return res.status(404).json("Teacher or course not found");
	}
	teacher.courses.addToSet(course._id);
	course.teachers.addToSet(teacher._id);
	await teacher.save();
	await course.save();
	return res.json(teacher);
}

async function deleteCourse(req, res) {
	const { code, id } = req.params;
	const teacher = await Teacher.findById(id).exec();
	const course = await Course.findById(code).exec();

	if (!teacher || !course) {
		return res.status(404).json("Teacher or course not found");
	}
	const oldCount = teacher.courses.length;
	teacher.courses.pull(course._id);
	if (teacher.courses.length === oldCount) {
		return res.status(404).json("Enrolment does not exist");
	}
	course.teachers.pull(teacher._id);

	await teacher.save();
	await course.save();
	return res.json(teacher);
}

module.exports = {
	addTeacher,
	getTeacher,
	getAllTeachers,
	updateTeacher,
	deleteTeacher,
	addCourse,
	deleteCourse
};
