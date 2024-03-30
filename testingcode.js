const Attendance = require('./path/to/attendanceModel'); // Assuming your attendance model file is named attendanceModel.js
const Student = require('./path/to/studentModel'); // Assuming your student model file is named studentModel.js

// Function to retrieve attendance records based on user ID
async function getAttendanceByUserId(userId, startDate, endDate) {
    try {
        // Find the student document associated with the user ID
        const student = await Student.findOne({ user: userId }).exec();
        if (!student) {
            throw new Error('Student not found');
        }

        // Find attendance records based on the student ID
        const attendanceRecords = await Attendance.find({
            studentid: student._id, // Use the student ID to filter attendance records
            date: { $gte: startDate, $lte: endDate } // Filter by date range
        }).exec();

        return attendanceRecords;
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
}

// Example usage
const userId = 'YourUserId';
const startDate = new Date('2024-03-01'); // Start date of the range
const endDate = new Date('2024-03-31'); // End date of the range

getAttendanceByUserId(userId, startDate, endDate)
    .then(attendanceRecords => {
        console.log('Attendance records:', attendanceRecords);
        // Handle attendance records as needed
    })
    .catch(error => {
        // Handle error
    });










    const Attendance = require('./path/to/attendanceModel'); // Assuming your attendance model file is named attendanceModel.js
const Student = require('./path/to/studentModel'); // Assuming your student model file is named studentModel.js

// Function to retrieve all attendance records for a student and calculate attendance percentage
async function getOverallAttendancePercentageByUserId(userId) {
    try {
        // Find the student document associated with the user ID
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
        const attendancePercentage = (daysPresent / totalDays) * 100;

        return { totalDays, daysPresent, attendancePercentage };
    } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
    }
}

// Example usage
const userId = 'YourUserId';

getOverallAttendancePercentageByUserId(userId)
    .then(({ totalDays, daysPresent, attendancePercentage }) => {
        console.log('Total days:', totalDays);
        console.log('Days present:', daysPresent);
        console.log('Attendance percentage:', attendancePercentage.toFixed(2) + '%'); // Round to 2 decimal places
        // Handle attendance percentage as needed
    })
    .catch(error => {
        // Handle error
    });
