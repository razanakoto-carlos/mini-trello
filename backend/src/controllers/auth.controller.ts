import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function generateToken(data: number) {
  return jwt.sign({ data }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.cookie("authToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalide Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user.id);

    res.cookie("authToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json(
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    );
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("authToken", {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
