import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwt.js";

export const post_register = async (req, res) => {
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


export const post_login = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email: email });

  if (!checkUser) {
    return res.status(401).json({ message: "Invalid credentials!" });
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

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // PROD: HTTPS zorunlu
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Login authentication is successfull!", accessToken, 
    user: {
      id: checkUser._id,
      username: checkUser.username,
      email: checkUser.email,}
     });
};

export const get_login = async (req, res) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(" ")[1];

        verifyToken(token, (err,user) => {
          if(err) return res.status(401).json({message: "Unauthorized"});

          console.log(user)

          res.status(201).json({user})
        })


    } else {
        res.status(401).json({message: "Unauthorized"});
    }
}

export const get_token = async (req, res) => {
   const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = await verifyToken(refreshToken, { type: "refresh" });
    const payload = {
      sub: decoded.sub,
      username: decoded.username,
      role: decoded.role,
    };

    const newAccessToken = await generateAccessToken(payload);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
}

export const logout = (req,res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(204);
}





// const verify = async (req,res,next) => {
//     const authHeader = req.headers.authorization;

//     if(authHeader) {
//         const token = authHeader.split(" ")[1];

//         jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), (err, user) => {
//           if(err) return res.status(401).json({message: "Unauthorized"});
//           console.log(user);
//           req.user = user;
//           next();
//         })

//     } else {
//         res.status(401).json({message: "Unauthorized"});
//     }
// }
