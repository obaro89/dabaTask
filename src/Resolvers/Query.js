import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.SECRET;

const Query = {
  login: async (parent, args, context, info) => {
    const { email, password } = args;
    const user = await context.prisma.user.findUnique({
      where: {
        email: email,
      },
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

  profile: async (parent, args, { prisma }, info) => {
    const { id } = args;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    return user;
  },
};

export { Query as default };
