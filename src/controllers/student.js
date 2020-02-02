const Student = require("../models/student");

async function addStudent(req, res) {
	const { firstName, lastName, email } = req.body;
	const student = new Student({
		firstName,
		lastName,
		email
	}); //run in server
	await student.save(); //then use .save() to same the data above to database
	return res.json(student); //if save() is resolved, then return this single student document back
}

async function getAllStudents(req, res) {
	const students = await Student.find(); //here Student is a model, above the student is a document. so here is to find all from a colloction
	return res.json(students);
}

async function getStudent(req, res) {
	const { id } = req.params;
	const student = await Student.findById(id);
	if (!student) {
		return res.status(404).json("Student not found");
	}
	return res.json(student);
}

async function updateStudent(req, res) {
	const { id } = req.params;
	const { firstName, lastName, email } = req.body;
	const student = await Student.findByIdAndUpdate(
		id,
		{
			firstName,
			lastName,
			email
		},
		{ new: true }
	);
	if (!student) {
		return res.status(404).send("Student not found");
	}
	return res.json(student);
}

async function deleteStudent(req, res) {
	const { id } = req.params;
	const student = await Student.findByIdAndDelete(id);
	if (!student) {
		return res.status(404).send("Student not found");
	}
	// return res.json(student);
	return res.sendStatus(200);
}

module.exports = {
	addStudent,
	getStudent,
	getAllStudents,
	updateStudent,
	deleteStudent
};
