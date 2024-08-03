import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const userId = req.userID;
    const text = req.body.text;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [userId],
        },
      },
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        chatId,
        userId,
      },
    });
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [userId],
        lastMessage: text,
      },
    });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message" });
  }
};
