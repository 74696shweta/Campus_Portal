const express = require('express')
const adminRouter = express.Router();
const studentController = require('../Controller/StudentController');
const staffController = require('../Controller/StaffController');
const GalleryContoller = require('../Controller/GalleryController');
const NoticeBoard = require('../Controller/NoticeBoardController');
const AuthController = require('../Controller/AuthenticationController');
const uploadImages = require('../Middleware/upload');
const authMiddleware = require('../Middleware/authMiddleware');

adminRouter.get("/get-student",studentController.getStudent )

adminRouter.post("/add-student",uploadImages.single('image'),studentController.addStudent )

adminRouter.get("/get-student-by-id",studentController.getStudentById)

adminRouter.post("/update-student",studentController.updateStudent)
adminRouter.post("/update-student-image", uploadImages.single('image') ,  studentController.updateStudentImage)

adminRouter.post("/delete-student",studentController.deleteStudent)
adminRouter.post("/dashboard-data",AuthController.getDashBoardData)
adminRouter.post("/block-student",studentController.BlockStudent)
adminRouter.post("/checkblocked-student",studentController.showBlockedUser)
adminRouter.post("/unblock-student",studentController.UnblockStudent)

// *********************Staff Routes************************************************************************
adminRouter.get("/staff", staffController.getStaff )
adminRouter.get("/admin", staffController.getAdmin )
adminRouter.get("/staff-profile", staffController.getStaffProfile )
adminRouter.get("/student-profile", studentController.getStudentProfile )

adminRouter.post("/add-staff",uploadImages.single('image'),staffController.addStaff )

adminRouter.get("/get-staff-by-id",staffController.getStaffById)

adminRouter.post("/update-staff",staffController.updateStaff)
adminRouter.post("/update-staff-image", uploadImages.single('image') ,  staffController.updateStaffImage)

adminRouter.post("/delete-staff",staffController.deleteStaff)

//***************************Gallary Routes******************************************************************

adminRouter.get("/image", GalleryContoller.getimage )
adminRouter.get("/temp-image", GalleryContoller.getTempImage )
adminRouter.post("/add-temp-image",uploadImages.single('image'), GalleryContoller.addTempimage )
adminRouter.post("/add-staff-image",uploadImages.single('image'), GalleryContoller.addstaffimage )

adminRouter.post("/add-image",GalleryContoller.addimage )
adminRouter.post("/delete-image",GalleryContoller.deleteimage)
adminRouter.post("/delete-temp-image",GalleryContoller.deletetempimage)

// ***************************Notice Board Routes ************************************************************

adminRouter.get("/get-notice",NoticeBoard.getNotice)
adminRouter.get("/get-notice-by-role",NoticeBoard.getNoticeById)
adminRouter.get("/get-ten-notice",NoticeBoard.getTenNotice)
adminRouter.post("/add-notice",uploadImages.single('image'),NoticeBoard.AddNotice)
adminRouter.get("/get-notice-by-id",NoticeBoard.getNoticeById)
adminRouter.post("/update-notice",NoticeBoard.updateNotice)
adminRouter.post("/delete-notice",NoticeBoard.deleteNotice)
adminRouter.post("/update-notice-image", uploadImages.single('image') ,  NoticeBoard.updateNoticeImage)

module.exports = adminRouter;
