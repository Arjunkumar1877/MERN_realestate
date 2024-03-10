import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import Listing from "../models/Listing.model.js";


export const test = async(req,res)=>{
try {
    res.json("hello World....");
} catch (error) {
    console.log(error.message)
}
}


export const updateUser = async(req,res,next)=>{
   if(req.user.id !== req.params.id) return next(errorHandler(401, "You can update your own account"));

//    console.log(req.user)
   try {
    console.log(req.body)
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
    }, {new: true})

    // console.log(updatedUser)
    const { password, ...restdata } = updatedUser._doc;
    res.status(200).json(restdata);

   } catch (error) {
    next(error)
   }
}


export const deleteUser = async(req,res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can delete you own account!'));

    try {
        
        await User.findByIdAndDelete(req.params.id);

        res.clearCookie('access_token');
        res.status(200).json({message: "User has been deleted...!"});

    } catch (error) {
        next(error);
    }
};


export const signOut = async(req, res, next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out !');

    } catch (error) {
        next(error);
    }
}


export const getUserListings = async(req, res, next)=>{
    if(req.user.id === req.params.id){
       try {
      const listing = await Listing.find({userRefs: req.params.id});
      res.status(200).json(listing);
    } catch (error) {
       next(error)
    }
    }else{
        return next(errorHandler(401, 'You can only view your own listings!'))
    }
 
}


export const getUser = async(req, res, next)=>{
    try {
         const user = await User.findById(req.params.id);

    if(!user) return next(errorHandler(404, "User not found !"));

    const { password: pass, ...restData } = user._doc;

    res.status(200).json(restData);
    } catch (error) {
       next(error);
    }
   
}