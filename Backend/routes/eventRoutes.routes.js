import express from "express";
import { getEvents, createEvent } from "../controllers/eventController.controller.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/create", createEvent);

export default router;
