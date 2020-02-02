const express = require("express");

const router = express.Router();

const {
	getTeacher,
	getAllTeachers,
	addTeacher,
	updateTeacher,
	deleteTeacher
} = require("../controllers/teacher");

router.get("/", getAllTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
