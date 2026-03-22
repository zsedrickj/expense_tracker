import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  preferredCurrency: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    preferredCurrency: {
      type: String,
      required: true,
      default: "USD",
    },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true }); // explicit lang dito

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
