const express = require("express")
const { createUser, userLogin, userLogOut, forgotPassword, ressetPassword, getUserDetails, updatePassword, 
updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controller/userController")
const router = express.Router()
const { isAuthentacated, authorizeRole }= require("../middleware/auth")
router.route("/register").post(createUser)
router.route("/login").post(userLogin)
router.route("/logout").get(userLogOut)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(ressetPassword)
router.route("/me").get(isAuthentacated, getUserDetails)
router.route("/password/update").put(isAuthentacated, updatePassword)
router.route("/me/update").put(isAuthentacated, updateProfile)
router.route("/admin/users").get(isAuthentacated, authorizeRole("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthentacated, authorizeRole("admin"),getSingleUser)
.put(isAuthentacated, authorizeRole("admin"),updateUserRole)
.delete(isAuthentacated, authorizeRole("admin"),deleteUser)


module.exports = router