import mongoose from "mongoose";

const userCredentialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "User_Credential" }
);

userCredentialSchema.index(
  { provider: 1, providerAccountId: 1 },
  { unique: true }
);

const UserCredential =
  mongoose.models.User_Credential ||
  mongoose.model("User_Credential", userCredentialSchema);

export default UserCredential;
