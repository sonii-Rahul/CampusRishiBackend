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
    const { userId} = req.body;

    const student = await Student.findOne({ user: userId }).exec();
    if (!student) {
        throw new Error('Student not found');
    }

    // Find all attendance records based on the student ID
    const allAttendanceRecords = await Attendance.find({
        studentid: student._id // Use the student ID to filter attendance records
    }).exec();

    // Calculate the total number of days and days present
    const totalDays = allAttendanceRecords.length;
    const daysPresent = allAttendanceRecords.filter(record => record.status === true).length;

    // Calculate attendance percentage
    const attendancePercentage = ((daysPresent / totalDays) * 100).toFixed(2);

   return res.status(201).json(new apiResponse(200, { totalDays, daysPresent, attendancePercentage }, "Attendance records added successfully."));
});

export { getAttendance };

export {Studentattendance};

