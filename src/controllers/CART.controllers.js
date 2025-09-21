import { CART } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/APIerror.js";
import { apiresponse } from "../utils/APIresponse.js";

const AddProductToCart = asyncHandler(async (req, res) => {
  const userID = req.user._id;

  const { productID, quantity } = req.body;

  //validation
  if ((!productID || !quantity) || quantity < 1) {
    throw new apierror(400, "please enter the right values");
  }

  // find cart of user
  let cart = await CART.findOne({ userID });
  if (!cart) {
    cart = new CART({ userID, items: [] });
  }

  // check  if porduct is already exist in the cart or not
  const productINDEX = cart.items.findIndex(
    (item) => item.productID.toString() === productID
  );

  if (productINDEX > -1) {
    cart.items[productINDEX].quantity += quantity;
  } else {
    cart.items.push({ productID, quantity });
  }

  await cart.save();
  return res
    .status(200)
    .json(new apiresponse(200, cart, "everything is a success !"));
});

const DeleteProductFromCart = asyncHandler(async (req, res) => {
  // account login
  const userID = req.user._id;
  const { productID } = req.body;

  if (!productID) {
    throw new apierror(400, "product id is required to remove item");
  }

  // user ki cart ko find kro

  const cart = await CART.findOne({ userID });
  if (!cart) {
    throw new apierror(400, "user doesnt own the cart !");
  }

  // remove the item

  cart.items = cart.items.filter(
    (item) => item.productID.toString() !== productID
  );

  await cart.save();

  return res
    .status(200)
    .json(new apiresponse(200, cart, "item remove successfully !"));
});

const ListTheCart = asyncHandler(async (req, res) => {
    const userID = req.user._id
  const cart = (await CART.find({userID}).select("-_id -createdAt -updatedAt -__v"));
  return res
    .status(200)
    .json(new apiresponse(200, cart, "the items in your cart !"));
});

export { DeleteProductFromCart, AddProductToCart, ListTheCart };
