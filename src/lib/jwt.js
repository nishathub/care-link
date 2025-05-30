import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
