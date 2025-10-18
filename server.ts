import dotenv from "dotenv";

// Load environment variables from .env into process.env
dotenv.config();
const db = process.env.DATABASE_STRING;
if (!db) {
  console.warn(
    "Warning: DATABASE_STRING is not set. Ensure you have a .env file and it contains DATABASE_STRING."
  );
} else {
  console.log(db);
}
