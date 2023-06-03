const express = require("express");
const teacherController = require("../controllers/teachersControllers");
const router = express.Router();

// post request to create a new teacher
router.post("/", teacherController.createTeacher);

// get request to get all teachers
router.get("/", teacherController.getAllTeachers);

// get request to get a teacher by id
router.get("/:staffIdNo", teacherController.getTeacherById);

// put request to update a teacher
router.put("/:staffIdNo", teacherController.updateTeacher);

// patch request to update a teacher
router.patch("/:staffIdNo", teacherController.updateTeacher);

// delete request to delete a teacher
router.delete("/:staffIdNo", teacherController.deleteTeacher);

// pagination
router.get("/page/:page", teacherController.getTeacherByPage);

module.exports = router;
