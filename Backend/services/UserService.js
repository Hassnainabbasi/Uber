const userModal = require("../models/UserModel");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("All Fields are required");
  }

  const user = userModal.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  return user;
};
