// import express
const express = require("express");

//import controller
const userController = require("../controller/userController");
const upload = require("../multerConfig/storageConfig");

//create router for express
const router = new express.Router();

//defune routes for each http request
router.post(
  "/student/register",
  upload.single('user_profile'),
  userController.register
);

//define route for get all student details

router.get('/student/get-all-student-details',userController.getusers)

//define route for view profile

router.get('/student/view-profile/:id',userController.viewprofile)

//delete user
router.delete('/student/delete-profile/:id',userController.deleteuser)

//update user
router.put('/student/update-profile/:id',upload.single('user_profile'),userController.updateuser)

//export router
module.exports = router;
