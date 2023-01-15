const Users = require('../models/Task')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "MyKey"



const signup = async (req, res)=>{
    const {firstName,lastName, email,phoneNumber,password }= req.body     
    const hashedPassword = bcrypt.hashSync(req.body.password);
    let   emailExist;
    // 
    const user = new Users({
        firstName,
        lastName,
        email,
        phoneNumber,
        password:hashedPassword
    })
    // 
    try {
        emailExist = await Users.findOne({email:email})  
    }catch (error) {
        return new Error(err)
    }
    // 
    if(emailExist){ 
        return res.status(400).json({message: "user already exists"}) 
    } 
    // 
    try {
        await user.save()
    } catch (error) {
        res.status(400).json({msg:"0949985768"})
    }   
}

const login = async (req,res)=>{
    const {email,password} = req.body
    let existingUser;
    // 
    try {
        existingUser = await Users.findOne({email:email})   
    } catch (error) {
        return new Error(err)
    }
    // 
    if(!existingUser){
        return res.status(400).json({message:"User not found, signup please"})
    }
    // 
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    // 
    if(!isPasswordCorrect){
        return res.status(400).json({message:'invalid email or password'})
    }
    // 
    const token = jwt.sign({id: existingUser.id},JWT_SECRET_KEY,{
        expiresIn:"1hr"
    })
    // 
    res.cookie(String(existingUser._id),token,{
        path:'/',
        expires:new Date(Date.now() + 6000 * 2),
        httpOnly:true,
        sameSite:'lax'
    })
    // 
    return res.status(200).json({message:"Successfully Logged In",user:existingUser, token})
    
}

const verifyToken = (req, res,next)=>{  
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]
    
    if(!token){
        res.status(404).json({message: "No token found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err, user)=>{
        if(err) {
            return  res.status(400).json({message:"Invalid TOKEN"})
        }
        req.id = user.id
    })
    next()   
}

const getUser = async (req, res)=>{
    const userId = req.id;
    let user;
    // 
    try {
            user = await Users.findById(userId, "-password")
    }catch{
                return new Error(err)
    }
    // 
    if(!user) {
        return res.status(404).json({message:"user not found"})
    }
    //    
    return res.status(200).json({user})
}

const refreshIoken = async (req, res,next)=> {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1]
    if(!prevToken){
       return res.status(400).json({message:"Couldn't find token"}) 

    }
    jwt.verify(String(prevToken),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log(err);
            return res.status(403).json({message: 'Authentication failed'})
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";
        const token = jwt.sign({id:user.id},JWT_SECRET_KEY,{
            expiresIn:"30s"
        })
        res.cookie(String(user.id), token,{
            path:"/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly:true,
            sameSite:"lax"
        })
        req.id = user.id
        next()
    })

}










const getAllUsers = async (req,res) =>{
    try {
        const users = await Users.find({})
        res.status(200).json({users})
        console.log(users);
    } catch (error) {
        console.log(error) ;
    }  
}
const deleteUser = async (req, res)=>{
    try {
        const {id:taskID} = req.params;
        const user = await Users.findOneAndDelete({_id:taskID})
        if(!user){
            return res.status(404).json({msg:`No taskwith id : ${taskID}`})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const updateUser = (req, res)=>{
    res.send('update user')
}

module.exports = {
    getAllUsers,
    signup,
    login,
    verifyToken,
    getUser,
    refreshIoken,
    updateUser,
    deleteUser
}