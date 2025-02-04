const express = require("express");
const User = require("../models/User.js");
const { body } = require("express-validator");
const { query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser=require("../Middleware/fetchuser.js")
const router = express.Router();
const jwt = require("jsonwebtoken");
const user_auth = "vivekyouaregreat";
router.post(
  "/createuser",
  [
    body("email", "enter the valid email").isEmail(),
    body("name", "enter the valid name").isLength({ min: 3 }),
    body("password", "enter the valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    //check whether a email of the user exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      //securing the password with bcyrpt password
      const salt = await bcrypt.genSalt(10);
      securepassword = await bcrypt.hash(req.body.password, salt);
      //   suppose login to your websites what we do will you give him the password details to user ? no we give thema token
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: securepassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtdata = jwt.sign(data, user_auth); //which data i wants to shows it to user
      console.log(jwtdata);
      success=true
      // res.send(user)
      res.send({ success,usertoken: jwtdata });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
    // .then(user=>res.json(user))
    //   .catch(err=>console.log(err))

    // const user = new User(req.body);
    // user.save()
    //     .then(() => res.status(201).send(user))
    //     .catch(err => res.status(500).json({ error: 'Failed to save user' }));
  }
);

router.post(
  '/login',
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists()
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({email:email});
      if (!user) {
        return res.status(400).json({ success,error: "Wrong Credentials" });
      }
      const psswdcompare =await bcrypt.compare(password, user.password);
      if (!psswdcompare) {
        return res.status(500).json({success, error: "Wrong Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        }
      };
      const jwtdata = jwt.sign(data, user_auth);
      success=true
      res.json({success, usertoken: jwtdata });
    } catch (err) {
        console.log(err.message)
      res.status(500).send("some error occured");
    }
  }
); 

//route3 :get loggedin user details
router.post('/userdetails',fetchuser,async(req,res)=>{
    try {
      const userid=req.user.id;
    let user=await User.findById(userid).select("-password")
    res.send(user)
    }
     catch (error) {
        console.log(error.message)
          res.status(500).send("Internal error occured");
    }
})


module.exports = router;
