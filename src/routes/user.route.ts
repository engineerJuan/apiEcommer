import { Router } from "express";
import { getUsers, crearUsuarios, updateUser } from "../controllers/user.controllers";

const router = Router();

router.get("/users", getUsers);
router.post("/users", crearUsuarios);
router.put("/users/:id", updateUser);

export default router;