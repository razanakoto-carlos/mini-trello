import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

interface userParam {
  id: string;
}

//async function for creating board
export async function createBoard(req: AuthRequest, res: Response) {
  try {
    const { title } = req.body;
    const board = await prisma.board.create({
      data: {
        title,
        userId: req.user!.id,
      },
    });
    res.status(201).json(board);
  } catch (error) {
    console.log("Error",error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

//async function for all board
export async function getBoards(req: AuthRequest, res: Response) {
  try {
    const boards = await prisma.board.findMany({
      where: { userId: req.user!.id },
    });
    return res.json(boards);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

//async for delete
export async function deleteBoard(req:AuthRequest & Request<userParam>, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const board = await prisma.board.deleteMany({
      where: { id, userId: req.user!.id },
    });
    return res.json(board);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
