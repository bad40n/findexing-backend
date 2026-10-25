import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { CustomRequest } from "../../middlewares/auth";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUser(req.body);
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    res.status(400).json({
      status: "fail",
      message: "Please provide email and pass",
    });
    return;
  }
  const result = await UserService.loginUser(email, pass);
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await UserService.getMe(userId as string);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: CustomRequest, res) => {
  const userId = req.user?.id;
  const result = await UserService.updateProfile(userId as string, req.body);
  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: CustomRequest, res) => {
  const result = await UserService.getAllUsers();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

const updateUserType = catchAsync(async (req: CustomRequest, res) => {
  const { type } = req.body;
  if (!type || !["admin", "user"].includes(type)) {
    res.status(400).json({
      status: "fail",
      message: "Please provide a valid user type ('admin' or 'user')",
    });
    return;
  }
  const result = await UserService.updateUserType(req.params.id as string, type);
  res.status(200).json({
    status: "success",
    message: "User role updated successfully",
    data: result,
  });
});

const toggleUserActiveStatus = catchAsync(async (req: CustomRequest, res) => {
  const { isActive } = req.body;
  if (typeof isActive !== "boolean") {
    res.status(400).json({
      status: "fail",
      message: "Please provide a boolean isActive field",
    });
    return;
  }
  const result = await UserService.toggleUserActiveStatus(req.params.id as string, isActive);
  res.status(200).json({
    status: "success",
    message: `User account status updated successfully`,
    data: result,
  });
});

const deleteUser = catchAsync(async (req: CustomRequest, res) => {
  await UserService.deleteUser(req.params.id as string);
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

export const UserController = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getAllUsers,
  updateUserType,
  toggleUserActiveStatus,
  deleteUser,
};