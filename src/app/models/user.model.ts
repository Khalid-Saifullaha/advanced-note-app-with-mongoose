import { model, Schema } from "mongoose";
import validator from "validator";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "first message kano daw nai?"],
    trim: true,
    minlength: 5,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 10,
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Must be at least 18, got {VALUE}"],
    max: 60,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: function (props) {
    //     return `Email ${props.value} is not a valid email`;
    //   },
    // },
    validate: [validator.isEmail, "Invalid Email {VALUE}"],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: {
      values: ["USER", "ADMIN", "SUPERADMIN"],
      message: "Role is not valid. got {VALUE}",
    },
    default: "USER",
  },
});

export const User = model("User", userSchema);
