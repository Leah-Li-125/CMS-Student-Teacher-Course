const Student = require("../models/student");
const Course = require("../models/course");

async function addStudent(req, res) {
	const { firstName, lastName, email } = req.body;
	const student = new Student({
		firstName,
		lastName,
		email
	}); //run in server
	/*
	try {
		await student.save();
	} catch (e) {
		next(e);
	} //here all functions below need try{}catch{} to contain resolved promise which will let DRY occur. the better way is to use a library to do that: express async error
	*/
	await student.save(); //then use .save() to same the data above to database

	return res.json(student); //if save() is resolved, then return this single student document back
}

async function getAllStudents(req, res) {
	const students = await Student.find().exec(); //here Student is a model, above the student is a document. so here is to find all from a colloction
	return res.json(students);
}

async function getStudent(req, res) {
	const { id } = req.params;
	// const { fullName } = req.body;
	// const student = await Student.findById(id);
	const student = await Student.findById(id)
		.populate("courses", "code name")
		.exec();
	if (!student) {
		return res.status(404).json("Student not found");
		/*
		standard json format design returned when you design your restful api:
		{
			"status": "ok"/"error",
			"data": //if ok return this data 
			"message": //if error return this message
		}
		*/
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
	).exec();
	if (!student) {
		return res.status(404).send("Student not found");
	}
	return res.json(student);
}

async function deleteStudent(req, res) {
	const { id } = req.params;
	const student = await Student.findByIdAndDelete(id).exec();
	if (!student) {
		return res.status(404).send("Student not found");
	}

	await Course.updateMany(
		{ _id: { $in: student.courses } },
		{ $pull: { students: student._id } }
	).exec();
	// return res.json(student);
	return res.sendStatus(200);
}

async function addCourse(req, res) {
	const { code, id } = req.params; //{ courseId, studentId }
	const student = await Student.findById(id).exec();
	const course = await Course.findById(code).exec();

	if (!student || !course) {
		return res.status(404).json("Student or course not found");
	}
	student.courses.addToSet(course._id);
	//use set instead of push, will store non-repeated data
	//and here only change the student in server but not stored in db
	course.students.addToSet(student._id); //n to n, if only do the student.courses will be 1 to n
	await student.save(); // now the student data has been stored in db
	await course.save(); //n to n
	return res.json(student);
}

async function deleteCourse(req, res) {
	const { code, id } = req.params;
	const student = await Student.findById(id).exec();
	const course = await Course.findById(code).exec();

	if (!student || !course) {
		return res.status(404).json("Student or course not found");
	}
	const oldCount = student.courses.length;
	student.courses.pull(course._id);
	if (student.courses.length === oldCount) {
		return res.status(404).json("Enrolment does not exist");
	}
	course.students.pull(student._id);

	await student.save();
	await course.save();
	return res.json(student);
}

module.exports = {
	addStudent,
	getStudent,
	getAllStudents,
	updateStudent,
	deleteStudent,
	addCourse,
	deleteCourse
};
