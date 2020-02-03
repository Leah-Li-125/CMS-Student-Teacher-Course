const express = require("express");
const studentRoute = require("./routes/student");
const teacherRoute = require("./routes/teacher");
const courseRoute = require("./routes/course");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authGuard = require("./middleware/authGuard");

const router = express.Router();

//only user with a authorization token which can pass the verification of authGuard can access the private database collections: students, teachers, courses
router.use("/students", authGuard, studentRoute);
/*
if only admin user can access this route, you can add adminGuard middleware before the Route
if you want to control only admin can access as well as write the data any route, you can go to the js files in routes to add adminGuard middleware before the small route
// router.use("/students", authGuard, adminGuard, studentRoute);
*/
router.use("/teachers", authGuard, teacherRoute);
router.use("/courses", authGuard, courseRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);

module.exports = router;
