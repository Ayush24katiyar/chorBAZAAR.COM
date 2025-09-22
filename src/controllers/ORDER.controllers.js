import { CART } from "../models/cart.model.js";
import { PRODUCT } from "../models/product.model.js";
import { ORDER } from "../models/order.model.js";
import { apierror } from "../utils/APIerror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { apiresponse } from "../utils/APIresponse.js";
import { USER } from "../models/user.models.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const OrderFromCart = asyncHandler(async (req , ress) => {
    const userID = req.user._id

    // lets do something here 
    // will find user cart !!
    const cart = await CART.findOne({userID}).populate("items.productID")

    // validate the cart

    if (!cart || cart.items.length === 0) {
        throw new apierror(400 , "cart is empty no need")
    }

    let totalAmounts = 0

    const orderProducts = cart.items.map(item => {
        const price = item.productID.productPRICE ;
        const quantity = item.quantity


        totalAmounts += price * quantity

        return {
            productID : item.productID._id ,
            quantity ,
            price , 
        }
    })


    const newOrder = new ORDER({
        userID ,
        product : orderProducts , 
        amount : totalAmounts ,
    })


    await newOrder.save()

    cart.items = []
    await cart.save()

    return ress.status(200).json(new apiresponse(200, newOrder , "order places successfully !"))
})


export {
    OrderFromCart
}