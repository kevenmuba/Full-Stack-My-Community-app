// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();

// import users 
const Users = require('./users.routes');
// import  posts
const Posts= require('./posts.route')
// comments
const Comment = require('./comments.route')
// messages
const Message = require('./messages.route')
//Attendance
const Attendance = require('./attendance.routes')
// income
const Income = require('./income.route')
//expenses
const Expense = require('./expense.routes')
//wages
const Wage = require('./wages.route')
// leave-request
const leaveRequest = require('./leave-request.route')
// financial-reports
const financial_reports = require('./financial-report.route')
//faq
const faq = require('./faq.route')


router.use(Users)
router.use(Posts)
router.use(Comment)
router.use(Message)
router.use(Attendance)
router.use(Income)
router.use(Expense)
router.use(Wage)
router.use(leaveRequest)
router.use(financial_reports)
router.use(faq)


// Export the router
module.exports = router; 