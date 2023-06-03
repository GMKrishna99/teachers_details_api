const Teacher = require("../models/teachersModels");

// post method to create teacher
const createTeacher = async (req, res) => {
  const teacher = req.body;

  try {
    // Check if a teacher with the same staffIdNo already exists
    const existingTeacher = await Teacher.findOne({
      staffIdNo: teacher.staffIdNo,
    });

    if (existingTeacher) {
      return res
        .status(409)
        .json({ message: "Teacher with the same staffIdNo already exists" });
    }

    const newTeacher = new Teacher(teacher);
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get method to get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get method to get a teacher by staffIdNo
const getTeacherById = async (req, res) => {
  const staffIdNo = req.params.staffIdNo;

  try {
    const teacher = await Teacher.findOne({ staffIdNo });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update method to update a teacher by staffIdNo
const updateTeacher = async (req, res) => {
  const staffIdNo = req.params.staffIdNo;
  const updates = req.body;

  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { staffIdNo: staffIdNo },
      updates,
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete method to delete a teacher by staffIdNo
const deleteTeacher = async (req, res) => {
  const staffIdNo = req.params.staffIdNo;

  try {
    const deletedTeacher = await Teacher.findOneAndDelete({
      staffIdNo: staffIdNo,
    });

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// pagination to get teachers by page

const getTeacherByPage = async (req, res) => {
  const page = req.params.page;
  const limit = 3;
  const skip = (page - 1) * limit;

  try {
    // to show how many pages are there
    const totalPages = await Teacher.countDocuments();
    // to get the teachers
    const teacher = await Teacher.find().limit(limit).skip(skip);
    // if there are no pages to show then throw an error message
    if (teacher.length === 0) {
      throw new Error("No Pages Found");
    }
    // if there is data in pages then shown with page number
    res.status(200).json({
      teacher,
      currentPage: page,
      totalPages: Math.ceil(totalPages / limit),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getTeacherByPage,
};
