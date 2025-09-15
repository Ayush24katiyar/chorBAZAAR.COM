import { USER } from "../models/user.models.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/APIerror.js";
import { apiresponse } from "../utils/APIresponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await USER.findById(userID);
    if (!user) {
      throw new apierror(400, "user is not existed !");
    }

    const accesstoken = user.generateAccessToken();
    const refreshtoken = user.generateRefreshToken();

    user.refreshtoken = refreshtoken;
    await user.save({ validateBeforeSave: false });
    return { accesstoken, refreshtoken };
  } catch (error) {
    throw new apierror(400, "something went wrong");
  }
};

const registerUSER = asyncHandler(async (req, res) => {
  const {username, email, password, role, address } = req.body;

  // validation

  if (
    [username, email, password, role, address].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apierror(400, "something went wrong !");
  }

  const existedUSER = await USER.findOne({ email });
  if (existedUSER) {
    throw new apierror(400, "user is alredy there no need to relogin");
  }

  // user creation

  try {
    const user = await USER.create({
      username,
      email,
      password,
      role,
      address,
    });
    const createdUser = await USER.findById(user._id).select(
      " -password -refreshToken"
    );

    if (!createdUser) {
      throw new apierror(500, "your luck ran out !");
    }

    return res
      .status(201)
      .json(new apiresponse(200, createdUser, "user registered successfully"));
  } catch (error) {
    throw new apierror(400, "sonething went wrong !");
  }
});

const loginUSER = asyncHandler(async (req, res) => {
  //get data from
  const [email, password] = req.body;

  //validatiom
  if (!email) {
    throw apierror(400, "fill the form correctly !");
  }

  const user = USER.findOne({ email });
  if (!user) {
    throw new apierror(
      400,
      "user is not rregistered please register yourself "
    );
  }

  // validation password
  const isPasswordValid = USER.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apierror(400, "your password is incorrect ");
  }

  const { accesstoken, refreshtoken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await USER.findById(user._id);

  if (!loggedInUser) {
    throw new apierror(400, "user is not register ");
  }

  const options = {
    httpOnly: true,
    secure: (process.env.NODE_ENV = "production"),
  };

  return res
    .status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
      new apiresponse(
        200,
        { user: loggeddInUser, accesstoken, refreshtoken },
        "user logged in successfully"
      )
    );
});

const logoutUSER = asyncHandler(async (req, res) => {
  await USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearcookie("accesstoken", options)
    .clearcookie("refreshtoken", options)
    .json(new apiresponse(200, {}, "user logout successfully"));
});

export { registerUSER, loginUSER, logoutUSER };
