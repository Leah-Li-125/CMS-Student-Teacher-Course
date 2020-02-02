const Teacher = require("../models/teacher");

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
	const teachers = await Teacher.find();
	return res.json(teachers);
}

async function getTeacher(req, res) {
	const { id } = req.params;
	const teacher = await Teacher.findById(id);
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
	);
	if (!teacher) {
		return res.status(404).send("Teacher not found");
	}
	return res.json(teacher);
}

async function deleteTeacher(req, res) {
	const { id } = req.params;
	const teacher = await Teacher.findByIdAndDelete(id);
	if (!teacher) {
		return res.status(404).send("Teacher not found");
	}
	// return res.json(teacher);
	return res.sendStatus(200);
}

module.exports = {
	addTeacher,
	getTeacher,
	getAllTeachers,
	updateTeacher,
	deleteTeacher
};
