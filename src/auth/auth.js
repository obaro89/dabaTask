import jwt from "jsonwebtoken";
require("dotenv").config();

const getTokenPayload = (token) => jwt.verify(token, process.env.SECRET);

const getUserId = (req, authHeader) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }

      const { userId } = getTokenPayload(token);
      return userId;
    } else if (authToken) {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }
  }

  throw new Error("Not authenticated");
};

export { getUserId as default };
