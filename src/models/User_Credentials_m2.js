import mongoose from "mongoose";
import { Schema } from "mongoose";
const User_data = Schema({
    Username: {
      type: String,
      required: true,
      trim: true,
    },
    

})