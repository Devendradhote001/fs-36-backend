import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    price: {
      amount: {
        type: Number,
        required: [true, "Product Price is required"],
        trim: true,
      },
      currency: {
        type: String,
        enum: ["USD", "INR", "EURO"],
        default: "INR",
      },
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["MENS", "WOMEN", "KIDS", "BEAUTY", "FOOTWEARS", "ALL"],
      default: "ALL",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
      default: 1,
    },
    ratings: {
      type: String,
      default: "3",
    },
  },
  {
    timestamps: true,
  },
);

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
