import { Response, Request } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

interface userParam {
  id: string;
}

interface cardParam {
  id: string;
}

// CREATE CARD
export async function createCard(req: AuthRequest, res: Response) {
  try {
    const { title, listId } = req.body;

    const list = await prisma.list.findFirst({
      where: {
        id: listId,
        board: {
          userId: req.user!.id,
        },
      },
    });

    if (!list) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const card = await prisma.card.create({
      data: { title, listId },
    });

    return res.status(201).json(card);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// GET CARDS BY LIST
export async function getCards(req: AuthRequest, res: Response) {
  try {
    const listId = Number(req.query.listId);

    if (isNaN(listId)) {
      return res.status(400).json({ error: "Invalid listId" });
    }

    const cards = await prisma.card.findMany({
      where: {
        listId,
        list: {
          board: {
            userId: req.user!.id,
          },
        },
      },
    });

    return res.json(cards);
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateCard(
  req: AuthRequest & Request<cardParam>,
  res: Response,
) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const { title } = req.body;
    const updated = await prisma.card.updateMany({
      where: {
        id,
        list: {
          board: {
            userId: req.user!.id,
          },
        },
      },
      data: {
        title,
      },
    });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

// DELETE CARD
export async function deleteCard(
  req: AuthRequest & Request<userParam>,
  res: Response,
) {
  try {
    const id = parseInt(req.params.id);

    const card = await prisma.card.findFirst({
      where: {
        id,
        list: {
          board: {
            userId: req.user!.id,
          },
        },
      },
    });

    if (!card) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.card.delete({ where: { id } });

    return res.json({ message: "Card deleted" });
  } catch {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
