// import { Pool } from "pg";

// export const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   database: "las_analyzer",
//   user: process.env.DB_USER || process.env.USER,
//   password: process.env.DB_PASSWORD || "",
// });

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Determine if we are in production (Render) or local
const isProduction = process.env.NODE_ENV === "production";

// Define the configuration based on the environment
const poolConfig = isProduction
  ? {
      // PROD (Render/Neon): Use the connection string & SSL
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Neon/Render hosted databases
      },
    }
  : {
      // LOCAL: Use your existing local setup
      host: "localhost",
      port: 5432,
      database: "las_analyzer",
      user: process.env.DB_USER || process.env.USER,
      password: process.env.DB_PASSWORD || "",
    };

export const pool = new Pool(poolConfig);