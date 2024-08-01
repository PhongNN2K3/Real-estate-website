import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseFloat(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post" });
  }
};
export const createPost = async (req, res) => {
  const tokenUserId = req.userID;

  const body = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userID;
  const body = req.body;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (tokenUserId !== post.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        ...body,
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userID;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (tokenUserId !== post.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Delete post successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
