import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/APIerror.js";

const requiredROLE = (role) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new apierror(400, "User login is required!");
    }

    if (req.user.role !== role) {
      throw new apierror(403, "Access denied. You need to have the seller role!");
    }

    next();  // <--- This was missing
  });

export { requiredROLE };
