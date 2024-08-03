import express from "express";
import {
  createChat,
  getChat,
  getChats,
  readChat,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, createChat);
router.put("/read/:id", verifyToken, readChat);

export default router;
