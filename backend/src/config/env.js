import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
  openaiKey: process.env.OPENAI_API_KEY,
};
