const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const {loginValidation, registerValidation, publishValidation} = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifytoken");


router.get('/posts',  async (req,res)=>{
    
    try{
        const blogs = await Blog.find();
        res.status(200).send(blogs);
    }catch(e){
        res.status(400).send(e);
    }
    

});

router.post('/user', verify, async (req,res)=>{
    try{
        const blogs = await Blog.find({email:req.body.email});
        res.status(200).send(blogs);
    }catch(e){
        res.status(400).send(e);
    }
});


router.post("/register" , async (req, res)=>{
    
    //VALIDATION BEFORE SAVING
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({"message":error.details[0].message});

    const puser = await User.findOne({email:req.body.email});
    if(puser){
        return res.status(400).json({"message":"Email Already Exists"});
    }

    //HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10); 
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    //CREATE A NEW BLOG
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user: user._id});
        
    }catch(err){  
        res.status(400).json({"message":err});
    }

});

router.post("/publish" ,verify, async (req, res)=>{
    
    //VALIDATION BEFORE SAVING
    const {error} = publishValidation(req.body);
    if(error) return res.status(400).json({"message":error.details[0].message});

    
    //CREATE A NEW BLOG
    const blog = new Blog({
        name: req.body.name,
        email: req.body.email,
        heading: req.body.heading,
        article: req.body.article
    });

    try{
        const savedBlog = await blog.save();
        res.send({blog: blog._id});
    }catch(err){  
        res.status(400).json({"message":err});
    }

});

router.post("/login", async (req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({"message":error.details[0].message});

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({"message":"Email doesn't exist"});
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({"message":"Incorrect Password"}); 

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.cookie('authtoken',token, { sameSite: 'none'});
    res.status(200).json({"token":token});

});


router.get("/logout", async (req,res)=>{
    res.clearCookie("authtoken");
    res.status(200).json({"message":"cookie cleared"});
})




module.exports= router;