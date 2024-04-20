import jwt from "jsonwebtoken";

const generateJWTToken = (_id) => {
  console.log("************* Inside GenerateJWTToken *************");
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { generateJWTToken };
