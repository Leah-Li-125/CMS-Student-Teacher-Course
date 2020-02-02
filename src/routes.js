const express = require("express");
const studentRoute = require("./routes/student");
const teacherRoute = require("./routes/teacher");
const courseRoute = require("./routes/course");

const router = express.Router();

router.use("/students", studentRoute);
router.use("/teachers", teacherRoute);
router.use("/courses", courseRoute);

module.exports = router;
