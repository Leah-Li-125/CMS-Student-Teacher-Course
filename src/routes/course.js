const express = require("express");

const router = express.Router();

const {
	getCourse,
	getAllCourses,
	addCourse,
	updateCourse,
	deleteCourse
} = require("../controllers/course");

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
