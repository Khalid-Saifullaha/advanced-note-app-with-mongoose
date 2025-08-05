import { Model, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
} from "../interfaces/user.interface";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  {
    _id: false,
  }
);
const userSchema = new Schema<IUser, UserInstanceMethods, UserInstanceMethods>(
  {
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
    address: {
      type: addressSchema,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  // this.password = password;
  // this.save();
  return password;
});
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  // this.password = password;
  // this.save();
  return password;
});

export const User = model<IUser, UserInstanceMethods>("Users", userSchema);
