const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const uersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    undefined: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const user = mongoose.model("User", userSchema);

module.exports = user;
