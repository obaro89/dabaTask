import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const SECRET = process.env.SECRET;

const Mutation = {
  register: async (parent, args, { prisma }, info) => {
    let { password, email } = args;

    password = await bcrypt.hash(password, 10);

    const emailTaken = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailTaken) {
      throw new Error("Email has been taken");
    }

    const user = {
      email,
      password,
    };

    const newUser = await prisma.user.create({
      data: user,
    });

    const token = jwt.sign({ userId: newUser.id }, SECRET);

    return {
      user: newUser,
      token,
    };
  },

  updateProfile: async (parent, { data }, { prisma, userId }, info) => {
    if (!userId) throw new Error("Authentication is required");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    if (typeof data.email === "string") {
      const emailTaken = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (emailTaken) {
        throw new Error("Email Taken!");
      }
    }
    data.phone = Number(data.phone);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
      },
    });

    return updatedUser;
  },
};

export { Mutation as default };
