import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(user);
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userID;
  const { password, avatar, ...inputs } = req.body;
  let hashedPassword = null;

  if (tokenId !== id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  try {
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userID;

  if (tokenId !== id) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userID;

  try {
    const savedPost = await prisma.savePost.findUnique({
      where: {
        userId: tokenUserId,
        postId,
      },
    });

    if (savedPost) {
      await prisma.savePost.delete({
        where: {
          userId: tokenUserId,
          postId,
        },
      });
      return res.status(200).json({ message: "Post unsaved successfully" });
    } else {
      await prisma.savePost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      });
    }
    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userID;

  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: tokenUserId,
      },
    });
    const saved = await prisma.savePost.findMany({
      where: {
        userId: tokenUserId,
      },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((post) => post.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user posts" });
  }
};

export const getNotificationNumer = async (req, res) => {
  const tokenUserId = req.userID;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });
    res.status(200).json(number);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get notifications" });
  }
};
