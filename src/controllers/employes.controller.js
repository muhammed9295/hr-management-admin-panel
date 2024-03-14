import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiErrors.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Employee } from "../models/employes.model.js";

const addEmployees = asyncHandler(async (req, res) => {
  // Get all employees info from the frontend
  const {
    firstName,
    lastName,
    qualification,
    yearOfExperience,
    department,
    email,
    phoneNumber,
  } = req.body;

  // Check all the required fields are not empty
  if (
    [firstName, lastName, yearOfExperience, department, phoneNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  // Check for images or avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }

  // Upload avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new apiError(400, "Avatar upload failed, file is not fetched");
  }

  // Create employees object and create in database
  const employees = await Employee.create({
    firstName,
    lastName,
    qualification,
    yearOfExperience,
    department,
    email,
    phoneNumber,
    avatar: avatar.url,
  });

  // Final check if the user is created successfully
  if (!employees) {
    throw new apiError(
      500,
      "Something went wrong while registering an employee"
    );
  }
  // Return employee object response.
  return res
    .status(200)
    .json(new apiResponse(200, employees, "Employee created successfully"));
});

const getEmployees = asyncHandler(async (req, res) => {

    const employees = await Employee.find({});

    if(!employees) {
        throw new apiError(500, "Something went wrong while fetching employees");
    }

    return res
    .status(200)
    .json(new apiResponse(200, employees, "Employee fetched successfully"));
});

export { addEmployees, getEmployees };
