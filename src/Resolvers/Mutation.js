import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.SECRET;

const Mutation = {
  register: async (parent, args, { User }, info) => {
    let { password, email } = args;

    password = await bcrypt.hash(password, 10);

    const emailTaken = await User.findOne({
      email,
    });

    if (emailTaken) {
      throw new Error("Email has been taken");
    }

    const user = new User({
      email,
      password,
    });

    const newUser = await user.save();

    const token = jwt.sign({ userId: newUser.id }, SECRET);

    return {
      user: newUser,
      token,
    };
  },

  updateProfile: async (parent, args, { User, userId }, info) => {
    if (!userId) throw new Error("Authentication is required");

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const updateData = {};

    if (args.data.name) updateData.name = args.data.name;
    if (args.data.username) updateData.username = args.data.username;
    if (args.data.bio) updateData.bio = args.data.bio;
    if (args.data.email) updateData.email = args.data.email;

    if (args.data.phone.match(/^[0-9]+$/) == null) {
      throw new Error("Please enter a valid number");
    }

    if (typeof Number(args.data.phone) === "number") {
      updateData.phone = Number(args.data.phone);
    } else {
      throw new Error("Please enter a valid number");
    }

    if (args.data.photo) updateData.photo = args.data.photo;
    if (args.data.password)
      updateData.password = await bcrypt.hash(args.data.password, 10);
    updateData.isUpdated = true;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    return updatedUser;
  },

  updateLastLogin: async (parent, args, { User, userId }, info) => {
    if (!userId) throw new Error("Authentication is required");

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { lastlogin: Date.now() } },
      { new: true }
    );

    return updatedUser;
  },
};

export { Mutation as default };
