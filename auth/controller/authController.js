const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.signin = async (req,res)=>{
    const {password, email} = req.body;
    console.log(password,email)
    const currentUser = await User.findOne({email})
    
    if(!currentUser){
        return res.status(400).json({
            error:'invalid password or email'
        })
    }else{
        const isMatch = await bcrypt.compare(password,currentUser.password);

        if(!isMatch){
            return res.status(400).json({
                error:'invalid password or email'
            })
        }


        currentUser.password = undefined;
        console.log('[currentUser]',currentUser);

        const payload = {
            _id:currentUser._id,
            name:currentUser.name,
            phone:currentUser.phone,
            email:currentUser.email
        }

        const token = jwt.sign(payload,process.env.JWT_KEY)

    
        

        const cookieOptions = {
            expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
            domain:'localhost',
            withCredentials: true
        };
        req.session = {
            jwt:token
        };

        res.cookie('jwt',token,cookieOptions);

        res.status(200).json({
            message:"user Loginned",
            user:currentUser,
        })
    }
}


exports.signup = async (req,res)=>{
    console.log(req.body);

    const oldUser = await User.findOne({email:req.body.email});
   
    if(oldUser){
        return res.status(400).json({
            error :"User already exists, please login"
        })
    }
    if(req.body.password !== req.body.ConfirmPassword){
        return res.status(400).json({
            error :"Your Passwords are not matching, please try again"
        })
    }
    const pass = await bcrypt.hash(req.body.password,10);

    
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password : pass,
    })

    await user.save();
    
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email
    }

    const token = jwt.sign(payload,process.env.JWT_KEY)

    console.log('[token]',token);

    const cookieOptions = {
        expires: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        withCredentials: true
      };
    req.currentUser = payload
    // req.session.jwt = token;
    res.cookie('jwt',token,cookieOptions);

    res.status(200).json({
        message :"you are signed up successfully",
        user,
        token
    })
}

exports.logout = async (req, res, next )=>{
    res.clearCookie('jwt');
    return res.status(200).json({
        message:null
    })
}


exports.currentUser = async (req,res,)=>{
    console.log(req.currentUser)
    if(!req.currentUser){
        return res.status(401).json({
            error:'you are not authenticated'
        })
    }
    return res.status(200).json({
        data:req.currentUser
    })
}