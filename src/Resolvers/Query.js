import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.SECRET;

const Query = {
  login: async (parent, args, context, info) => {
    const { email, password } = args;
    const user = await context.User.findOne({
      email: email,
    });

    if (!user) throw new Error("Invalid Credentials");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ userId: user.id }, SECRET);

    return {
      token,
      user: user,
    };
  },

  profile: async (parent, args, { User, userId }, info) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      throw new Error("User does not exist");
    }

    return user;
  },
};

export { Query as default };
