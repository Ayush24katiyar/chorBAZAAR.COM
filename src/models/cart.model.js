import mongoose, { Schema } from "mongoose";

const cartSCHEMA = new Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "USER",
      required: true,
    },
    items: [
      {
        productID: {
          type: mongoose.Schema.ObjectId,
          ref: "PRODUCT",
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CART = mongoose.model("CART", cartSCHEMA);
