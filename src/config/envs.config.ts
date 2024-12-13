import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

// database

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PORT = Number(process.env.DB_PORT) || 3306;
export const DB_PASSWORD = process.env.DB_PASSWORD || "123456";
export const DB_DATABASE = process.env.DB_DATABASE || "fragote_db";
