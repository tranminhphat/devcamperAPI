import express from "express";
import authRoutes from "./auth";
import bootCampsRoutes from "./bootcamp";
import courseRoutes from "./course";
import reviewRoutes from "./review";
import userRoutes from "./user";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/reviews", reviewRoutes);
router.use("/courses", courseRoutes);
router.use("/bootcamps", bootCampsRoutes);

export default router;
