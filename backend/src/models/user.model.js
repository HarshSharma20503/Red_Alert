import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity is 1
  },
});

const notificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  priorityLevel: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companies: [companySchema],
    notifications: [notificationSchema],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered Password:", enteredPassword);
  const temp = await bcrypt.hash(enteredPassword, 12);
  console.log("Temp: ", temp);
  console.log("Password: ", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

export const User = mongoose.model("User", userSchema);
