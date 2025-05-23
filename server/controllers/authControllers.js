import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessToken} from "../utils/jwt.js"; // az önce yazdığımız fonksiyon

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "E-mail or username has been taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(user);

  // Success Message
  res.status(201).json({ message: "The user sign up has been successful." });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email: email });

  if (!checkUser) {
    return res.status(401).json({ message: "User not found!" });
  }

 const isPasswordCorrect = await bcrypt.compare(password, checkUser.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const payload = {
    sub: checkUser._id.toString(), // kullanıcı ID'si
    username: checkUser.username,
    email: checkUser.email,
    role: "user",
  };

  const token = await generateAccessToken(payload);

  res
    .status(200)
    .json({ message: "Login authentication is successfull!", token });
};

const verify = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
    } else {
        res.status(401).json({message: "Unauthorized"})
    }

}
