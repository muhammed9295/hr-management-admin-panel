import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";
import {apiResponse} from "../utils/apiResponse.js";
import {apiError} from "../utils/apiErrors.js";
import {User} from "../models/user.model.js";



const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;

    // if([username, email, password].some((field)=>field?.trim() === "")){
    //     throw new apiError(400, "All fields are required")
    // }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existedUser){
        throw new apiError(400, "Username or email already exists")
    }

    const user = await User.create({
        username,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering a user")
    }

    return res
        .status(201)
        .json(new apiResponse(200, createdUser, "User registered successfully"));
})


export {
    registerUser
}