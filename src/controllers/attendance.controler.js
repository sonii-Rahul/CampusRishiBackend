import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Student } from "../models/Student.model.js";
import { ClassCollection } from "../models/ClassCollection.model.js";
import {User} from "../models/User.Model.js"
import {Attendance} from "../models/Attendance.model.js"

const Studentattendance = asyncHandler(async (req, res) => {
    const attendanceData = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        throw new apiError("400", "Attendance data must be an array.");
    }

    // Iterate over each attendance record in the array
    for (const attendanceRecord of attendanceData) {
        const { studentname, classid, status } = attendanceRecord;

        if (!studentname || !classid || status === undefined) {
            throw new apiError("400", "All fields are required for each attendance record.");
        }

        // Find the user based on the provided full name
        const user = await User.findOne({ fullName: studentname });
        if (!user) {
            throw new apiError("404", `User "${studentname}" not found.`);
        }

        // Find the student associated with the user
        const student = await Student.findOne({ user: user._id });
        if (!student) {
            throw new apiError("404", `Student "${studentname}" not found.`);
        }

        // Find the class
        const classFound = await ClassCollection.findById(classid);
        if (!classFound) {
            throw new apiError("404", `Class with ID "${classid}" not found.`);
        }

        // Create the attendance record
        await Attendance.create({
            studentid: student._id,
            classid: classFound._id,
            date: Date.now(),
            status
        });
    }

    return res.status(201).json(new apiResponse(200, null, "Attendance records added successfully."));
});

const getAttendance = asyncHandler(async (req, res) => {
    const { studentname, classid } = req.body;

    if (!studentname || !classid) {
        throw new apiError("400", "Both student name and class ID are required.");
    }

    // Find the user based on the provided full name
    const user = await User.findOne({ fullName: studentname });
    if (!user) {
        throw new apiError("404", "User not found.");
    }

    // Find the student associated with the user
    const student = await Student.findOne({ user: user._id });
    if (!student) {
        throw new apiError("404", "Student not found.");
    }

    // Find the class
    const classFound = await ClassCollection.findById(classid);
    if (!classFound) {
        throw new apiError("404", "Class not found.");
    }

    // Find attendance records for the student and class
    const attendanceRecords = await Attendance.find({ studentid: student._id, classid: classFound._id });

    if (!attendanceRecords || attendanceRecords.length === 0) {
        return res.status(200).json(new apiResponse(200, [], "No attendance records found."));
    }

    return res.status(200).json(new apiResponse(200, attendanceRecords, "Attendance records retrieved successfully."));
});

export { getAttendance };

export {Studentattendance};
