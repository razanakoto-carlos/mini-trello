import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

interface userParam {
  id: string;
}

//async function for creating list
export async function createList(req: AuthRequest, res: Response) {
  try {
    const { title, boardId } = req.body;

    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        userId: req.user!.id,
      },
    });

    if (!board) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const list = await prisma.list.create({
      data: {
        title,
        boardId,
      },
    });

    res.status(201).json(list);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

//async function for all list
export async function getLists(
  req: AuthRequest & Request<{ boardId: string }>,
  res: Response,
) {
  try {
    const boardId = Number(req.params.boardId);

    if (isNaN(boardId)) {
      return res.status(400).json({ error: "Invalid board Id" });
    }

    const lists = await prisma.list.findMany({
      where: {
        boardId,
        board: {
          userId: req.user!.id,
        },
      },
    });

    return res.json(lists);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

//async for delete
export async function deleteList(
  req: AuthRequest & Request<userParam>,
  res: Response,
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const list = await prisma.list.findFirst({
      where: { id, board: { userId: req.user!.id } },
    });

    if (!list) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.list.delete({ where: { id } });

    return res.json(list);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
