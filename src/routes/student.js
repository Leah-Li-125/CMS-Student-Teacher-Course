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
// if you want to control only admin can access as well as write, like delete, the data any route, you can go to the js files in routes to add adminGuard middleware before the small route
// router.delete("/:id/courses/:code", adminGuard, deleteCourse);

module.exports = router;
