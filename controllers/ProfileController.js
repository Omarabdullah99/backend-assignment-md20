const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");

const CreateAndUpdateProfile = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    // Check if profile exists
    let existingProfile = await ProfileModel.findOne({ userID: user_id });

    if (existingProfile) {
      // Update the existing profile
      let updatedProfile = await ProfileModel.findOneAndUpdate(
        { userID: user_id },
        { $set: reqBody },
        { new: true } // Returns updated document
      );
      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } else {
      // Create a new profile
      let newProfile = new ProfileModel(reqBody);
      await newProfile.save();
      res.status(201).json({
        status: "success",
        message: "Profile created successfully",
        data: newProfile,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const DeleteProfileByUserID = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let result = await ProfileModel.findOneAndDelete({
      userID: user_id,
    });

    if (!result) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Cart item deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const GetAllProfile = async (req, res) => {
  try {
    let data = await ProfileModel.find()
    res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
};
const testProfile = async (req, res) => {
  res.status(200).json({ message: "profile test" });
};

module.exports = { testProfile, CreateAndUpdateProfile, DeleteProfileByUserID,GetAllProfile };
