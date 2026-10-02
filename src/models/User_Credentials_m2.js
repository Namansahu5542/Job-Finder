import mongoose from "mongoose";
 
const userDataSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    ProfileName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true, collection: "User_Data" }
);

const UserData =
  globalThis.userDataModel ??
  (globalThis.userDataModel =
    mongoose.models.User_Data ??
    mongoose.model("User_Data", userDataSchema, "User_Data"));

export default UserData;
