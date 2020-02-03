const express = require("express");

const router = express.Router();
const {
	addStudent,
	getStudent,
	getAllStudents,
	updateStudent,
	deleteStudent,
	addCourse,
	deleteCourse
} = require("../controllers/student");

router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/:id/courses/:code", addCourse);
router.delete("/:id/courses/:code", deleteCourse);

module.exports = router;
