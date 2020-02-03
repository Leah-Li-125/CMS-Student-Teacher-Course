const express = require("express");

const router = express.Router();

const {
	getTeacher,
	getAllTeachers,
	addTeacher,
	updateTeacher,
	deleteTeacher,
	addCourse,
	deleteCourse
} = require("../controllers/teacher");

router.get("/", getAllTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.post("/:id/courses/:code", addCourse);
router.delete("/:id/courses/:code", deleteCourse);

module.exports = router;
