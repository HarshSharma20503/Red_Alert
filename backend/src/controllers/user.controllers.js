import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const getUser = asyncHandler(async (req, res) => {
  console.log("************* Inside GetUser Controller *************");
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json(new ApiResponse(200, user));
});

const addCompany = asyncHandler(async (req, res) => {
  console.log("************* Inside AddCompany Controller *************");
  const { company, stockUnits } = req.body;

  console.log("Company and stockUnits", company, stockUnits);

  if (!company || !stockUnits) {
    return next(new ApiError(400, "Company and Stock units are required"));
  }
  const user = await User.findById(req.user._id);

  console.log("user: ", user);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  user.companies.push({ name: company, quantity: stockUnits });
  await user.save();

  console.log("After company Updatation");

  res.status(201).json(new ApiResponse(201, user));
});

const removeStock = asyncHandler(async (req, res) => {
  console.log("************* Inside RemoveStock Controller *************");
  const { company } = req.body;
  if (!company) {
    return next(new ApiError(400, "Company is required"));
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  user.companies = user.companies.filter((item) => item.company !== company);
  await user.save();
  res.status(200).json(new ApiResponse(200, user));
});

const updateStock = asyncHandler(async (req, res) => {
  console.log("************* Inside UpdateStock Controller *************");
  const { company, stockUnits } = req.body;
  if (!company || !stockUnits) {
    return next(new ApiError(400, "Company and Stock units are required"));
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const index = user.companies.findIndex((item) => item.company === company);
  if (index === -1) {
    return next(new ApiError(404, "Company not found"));
  }
  user.companies[index].stockUnits = stockUnits;
  await user.save();
  res.status(200).json(new ApiResponse(200, user));
});

export { getUser, addCompany, removeStock, updateStock };
