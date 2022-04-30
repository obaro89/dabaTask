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

    const user = await User.findOne({
      id: userId,
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const data = {};

    if (args.name) data.name = args.name;
    if (args.username) data.username = args.username;
    if (args.bio) data.bio = args.bio;
    if (args.email) data.email = args.email;
    if (args.phone) data.phone = Number(args.phone);
    if (args.photo) data.photo = args.photo;
    if (args.password) data.password = await bcrypt.hash(args.password, 10);

    console.log(data);

    if (typeof data.email === "string") {
      const emailTaken = await User.findOne({
        email: data.email,
      });

      if (emailTaken) {
        throw new Error("Email Taken!");
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        id: userId,
      },
      { $set: data },
      { new: true }
    );

    return updatedUser;
  },
};

export { Mutation as default };
