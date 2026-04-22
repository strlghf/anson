import { Router } from "express";
import usersRouter from "./users.ts";
import productsRouter from "./products.ts";
import authRouter from "./auth.ts";
import cartRouter from "./cart.ts";

const router = Router();

router.use(usersRouter);
router.use(productsRouter);
router.use(authRouter);
router.use(cartRouter);

export default router;