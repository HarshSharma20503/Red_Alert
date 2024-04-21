import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const getUser = asyncHandler(async (req, res) => {
  console.log("************* Inside GetUser Controller *************");
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user));
});

const addCompany = asyncHandler(async (req, res) => {
  console.log("************* Inside AddCompany Controller *************");
  const { company, stockUnits } = req.body;

  // console.log("Company and stockUnits", company, stockUnits);

  if (!company || !stockUnits) {
    return next(new ApiError(400, "Company and Stock units are required"));
  }
  const user = await User.findById(req.user._id);

  // console.log("user: ", user);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const index = user.companies.findIndex((item) => item.name === company);
  console.log("Index: ", index);

  // return error if the company is already present
  if (index !== -1) {
    throw new ApiError(400, "Company already exists");
  }

  user.companies.push({ name: company, quantity: stockUnits });
  await user.save();

  // console.log("After company Updatation");

  res.status(201).json(new ApiResponse(201, user));
});

const removeStock = asyncHandler(async (req, res) => {
  console.log("************* Inside RemoveStock Controller *************");
  const { company } = req.body;
  if (!company) {
    throw new ApiError(400, "Company is required");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.companies = user.companies.filter((item) => item.name !== company);
  await user.save();
  res.status(200).json(new ApiResponse(200, user));
});

const updateCompanyStock = asyncHandler(async (req, res) => {
  console.log("************* Inside UpdateCompanyStock Controller *************");
  const { company, stockUnits } = req.body;
  if (!company || !stockUnits) {
    throw new ApiError(400, "Company and Stock units are required");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // console.log("User: ", user);
  // console.log("Company: ", company);

  const index = user.companies.findIndex((item) => item.name === company);
  if (index === -1) {
    throw new ApiError(404, "Company not found");
  }
  user.companies[index].quantity = stockUnits;
  // console.log("Index :", index);
  // console.log("user:", user);
  await user.save();
  // console.log("User: ", user);
  res.status(200).json(new ApiResponse(200, user));
});

export { getUser, addCompany, removeStock, updateCompanyStock };
