import ProductModel from "../models/product.model";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

export const createProductController = asyncHandler(async (req, res) => {
  let { name, amount, currency, description, category, quantity } = req.body;

  if (!name || !amount || !quantity)
    throw new ApiError(400, "All fields are required");

  let newProduct = await ProductModel.create({
    seller_id: req.user._id,
    name,
    price: {
      amount,
      currency,
    },
    description,
    category,
    quantity,
  });

  return res.status(200).json({
    success: true,
    message: "Product created",
    data: newProduct,
  });
});
