import { PRODUCT } from "../models/product.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/APIerror.js";
import { apiresponse } from "../utils/APIresponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const registerPRODUCT = asyncHandler(async (req, res) => {
  const [
    productNAME,
    productPRICE,
    productQUANTITY,
    productCATEGORY,
    productDESCRIPTION,
  ] = req.body;
  // validation
  if (
    [
      productNAME,
      productPRICE,
      productQUANTITY,
      productCATEGORY,
      productDESCRIPTION,
    ].some((fileds) => fileds?.trim() === " ")
  ) {
    throw new apierror(400, "something went wrong completely !");
  }

  const existedPRODUCT = await PRODUCT.findone({ productNAME });
  if (existedPRODUCT) {
    throw new apierror(
      400,
      "product is already existed ! no need to register !"
    );
  }

  //product creation
  try {
    const product = await PRODUCT.create({
      productNAME,
      productPRICE,
      productQUANTITY,
      productCATEGORY,
      productDESCRIPTION,
    });

    const createdPRODUCT = await PRODUCT.findById(product._id);
    if (!createdPRODUCT) {
      throw new apierror(400, "your product is failed to register !");
    }

    return res
      .status(200)
      .json(
        new apiresponse(200, createdPRODUCT, "product created successfully !")
      );
  } catch (error) {
    throw new apierror(
      400,
      "something went wrong while created your product !"
    );
  }
});


const getPRODUCT = asyncHandler(async (req ,res) => {
    return res.status(200).json(new apiresponse(200 , req.product , "current product listed details"))
})
