import { Router } from "express";
import models from "../models/index.js";

const router = Router();
const users = models.User;

router.get("/", async (req, res) => {
  try {
    const allUsers = await users.findAll();
    return res.status(200).json({  allUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({
      message: "Usuário encontrado",
       user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "Preencha os campos obrigatórios!!" });
    }

    const newUser = await users.create({ username, email });

    return res.status(201).json({
      message: "Usuário criado",
       newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;

    const user = await users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!!" });
    }

    await users.update({ username, email }, { where: { id: userId } });

    return res.status(200).json({
      message: "Usuário atualizado",
       user: { id: userId, username, email }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!!" });
    }

    await users.destroy({ where: { id: userId } });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;