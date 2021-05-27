const express = require("express");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");

router.get("/",(req,res) =>{
    res.send("hello world from the server router.js")
});

//using promises
// router.post("/register", (req,res) =>{


//     const { name, email, phone, work, password, cpassword } = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){

//         return res.status(422).json({error: "please fill properly"});
//     }
    
//     User.findOne({email:email})
//     .then((userExist) =>{
//         if(userExist){
//             return res.status(422).json({error: "email already exist "});
//         }

//         const user  = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() =>{
//             res.status(201).json({message:"user registerd successfully"});
//         }).catch((err) => res.status(500).json({error:"failed to register"}));
//     }).catch(err => { console.log(err)});

// });

//using async await

router.post("/register", async(req,res) =>{


    const { name, email, phone, work, password, cpassword } = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){

        return res.status(422).json({error: "please fill properly"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error: "email already exist "});
        }else if(password != cpassword){
            return res.status(422).json({error: "password are not same "});
        }else{
            const user  = new User({name, email, phone, work, password, cpassword});


             await user.save();

        
            res.status(201).json({message:"user registerd successfully"});
        }

        
        
    }catch (err) {
        console.log(err);

    }

    
 

});


//login 

router.post("/signin", async (req,res) =>{
       
        try{
            let token;
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(400).json({error:"please fill the data"})
            }

            const userLogin = await User.findOne({email:email});
            if(userLogin){
                 const isMatch = await bcrypt.compare(password, userLogin.password);
                 token = await userLogin.generateAuthToken();

                 res.cookie("jwtoken",token, {
                     expires: new Date(Date.now() + 25892000000),
                     httpOnly:true
                 });

            if(!isMatch){
                res.status(400).json({error:"invalid password"});
            }else{
                res.json({message:"user signin successfull"});
            }

            }else{
                res.status(400).json({error:"invalid password"});
            }
            //console.log(userLogin);
           
            

        }catch(err){
            console.log(err);
        }
});

//about us page

router.get("/about",authenticate ,(req,res) =>{
    console.log("hello my about");
    res.send(req.rootUser);
});

//get user data for contact us and homepage

router.get("/getdata", authenticate,(req,res) => {
    console.log("hello my about");
    res.send(req.rootUser);
})


//contact us page

router.post("/contact", authenticate, async(req,res) =>{
    try{
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            console.log("error in contact form");
            return erres.json({error:"plzz fil yhe contact form"});
        }

        const userContact = await User.findOne({_id: req.userID});

        if(userContact){

            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();
            res.status(201).json({message:"user contact successfully"});
        }

    } catch (error) {
        console.log(error);
    }

});

//logout page

router.get("/logout" ,(req,res) =>{
    console.log("hello my logout page");
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User Logout');
});



module.exports= router;
