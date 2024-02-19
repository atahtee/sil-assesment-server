const express = require('express');
const router = express.Router();
const passport = require("passport")
const cors = require('cors');
const {test, registerUser, loginUser, getProfile} = require('../controllers/authController')

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));
router.get("/login/success", (req, res) => {
    if (req.user){
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user
        })
    }
})
router.get("/login/failed", (req, res) => {
    if (req.user){
        res.status(200).json({
            success: false,
            message: "failure"
        })
    }
})
router.get
router.get("/google/callback", passport.authenticate("google",{
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/login"
}))
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/dashboard")
})
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router