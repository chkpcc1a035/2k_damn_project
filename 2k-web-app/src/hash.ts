const bcrypt = require("bcryptjs");
// import bcrypt from "bcryptjs";

async function hashPassword() {
  const password = "jason123";
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log("Hashed Password:", hash);
}

hashPassword();
