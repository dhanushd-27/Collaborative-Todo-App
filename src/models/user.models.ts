import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

export default User;