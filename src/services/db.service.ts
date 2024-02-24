import { dbConfig } from "@/config";
import { Database } from "sqlite3";

// Open a SQLite database, stored in the file db.sqlite
const db = new Database(dbConfig.filename, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

export default db;
