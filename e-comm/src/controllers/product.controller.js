import cacheInstance from "../config/cache.js";
import ProductModel from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

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

  await cacheInstance.del("products");

  return res.status(200).json({
    success: true,
    message: "Product created",
    data: newProduct,
  });
});

export const getAllProductController = asyncHandler(async (req, res) => {
  let productsInCache = await cacheInstance.get("products");

  if (productsInCache) {
    let products = JSON.parse(productsInCache);

    console.log("return products from Cache");

    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      data: products,
    });
  }

  console.log("return products from DB");
  let products = await ProductModel.find();

  await cacheInstance.set("products", JSON.stringify(products));

  return res.status(200).json({
    success: true,
    message: "products fetched successfully",
    data: products,
  });
});
