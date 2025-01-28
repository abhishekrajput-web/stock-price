import express from "express";
const router = express.Router();
import {registerController, loginController, changeUserStatus, testController, getAllStudentsController, getStudentDetails, deleteStudent, updateProfileController} from "../controllers/authController.js";
import {requireSignIn, isAdmin} from "../middlewares/authMiddleware.js";
// user route 

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin,  testController);

// user auth protect routes || dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).json({ok: true});
});

// admin auth protect routes || admin dashboard
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ok: true});
});


// /admin access all students
router.get("/get-all-students", requireSignIn, isAdmin, getAllStudentsController);

// get student detail by id
router.get("/get-student/:id", requireSignIn, isAdmin, getStudentDetails);

// delete stduent by id
router.delete("/delete-student/:id", requireSignIn, isAdmin, deleteStudent);

// update profile by id
router.post("/user/update-profile", updateProfileController);

// admin change ststus route
router.put("/admin/change-status", requireSignIn, isAdmin, changeUserStatus); // adminAuthMiddleware is a middleware to check if the user is an admin

export default router;