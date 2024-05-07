import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "user",
  userSchema
);

export default UserModel;