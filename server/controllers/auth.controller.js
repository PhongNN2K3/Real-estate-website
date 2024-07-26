import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //kiểm tra xem user có tồn tại không
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    //kiểm tra xem password đúng không
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { password: userPassword, ...userData } = user;

    //tạo cookie token và gửi đến user
    const age = 1000 * 60 * 60 * 24 * 30;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    res
      .cookie("token", token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User failed to create" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successfully" });
};
