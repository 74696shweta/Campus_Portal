const express = require('express')
const router = express.Router();
const AuthController = require('../Controller/AuthenticationController');

router.post("/student-login",AuthController.StudentLogin);
router.post('/staff-login',AuthController.StaffLogin)
router.get('/student-session',AuthController.SessionManage)
router.get('/staff-session',AuthController.SessionManageForStaff)
router.get('/logout',AuthController.Logout)
router.post('/forgot-password-student', AuthController.StudentForgotPassword)
router.post('/verify-password-student', AuthController.verify_passwordForStudent)
router.post('/resend-otp-student', AuthController.resendOtpStudent)
router.post('/forgot-password-staff', AuthController.StaffForgotPassword)
router.post('/verify-password-staff', AuthController.verify_passwordForStaff)
router.post('/resend-otp-staff', AuthController.resendOtpStaff)
router.post('/send-mail', AuthController.sendEmail)

module.exports = router