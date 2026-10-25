import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const registerUser = async (payload: Omit<IUser, "type" | "isActive">) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  // Create User
  const result = await User.create({
    ...payload,
    type: "user",
    isActive: true,
  });

  const token = jwt.sign(
    { id: result._id, email: result.email, type: result.type },
    config.jwt_secret as string,
    { expiresIn: "7d" }
  );

  const userObj = result.toObject();
  delete (userObj as any).pass;

  return {
    token,
    user: userObj,
  };
};

const loginUser = async (email: string, pass: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("User account is inactive");
  }

  const isMatch = await bcrypt.compare(pass, user.pass);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, type: user.type },
    config.jwt_secret as string,
    { expiresIn: "7d" }
  );

  const userObj = user.toObject();
  delete (userObj as any).pass;

  return {
    token,
    user: userObj,
  };
};

const getMe = async (id: string) => {
  const user = await User.findById(id).select("-pass");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const updateProfile = async (id: string, updates: Partial<IUser>) => {
  const allowedUpdates: Partial<IUser> = {};
  if (updates.name) allowedUpdates.name = updates.name;
  if (updates.currency) allowedUpdates.currency = updates.currency;

  const result = await User.findByIdAndUpdate(
    id,
    allowedUpdates,
    { new: true, runValidators: true }
  ).select("-pass");

  if (!result) {
    throw new Error("User not found");
  }

  return result;
};

const getAllUsers = async () => {
  const result = await User.find({}, "-pass").sort({ createdAt: -1 });
  return result;
};

const updateUserType = async (id: string, type: "admin" | "user") => {
  const result = await User.findByIdAndUpdate(
    id,
    { type },
    { new: true, runValidators: true }
  ).select("-pass");
  return result;
};

const toggleUserActiveStatus = async (id: string, isActive: boolean) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isActive },
    { new: true, runValidators: true }
  ).select("-pass");
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getAllUsers,
  updateUserType,
  toggleUserActiveStatus,
  deleteUser,
};