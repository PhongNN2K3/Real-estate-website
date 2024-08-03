import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const userId = req.userID;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== userId);
      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting chats" });
  }
};
export const getChat = async (req, res) => {
  const userId = req.userID;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [userId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting chat" });
  }
};
export const createChat = async (req, res) => {
  const { receiverId } = req.body;
  const tokenUserId = req.userID;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId],
      },
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating chat" });
  }
};
export const readChat = async (req, res) => {
  const id = req.params.id;
  const userId = req.userID;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: id,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          set: [userId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reading chat" });
  }
};
