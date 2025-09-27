import { Router } from "express";
import models from "../models/index.js";

const router = Router();
const messagesModel = models.Message;

router.get("/", async (req, res) => {
  try {
    const messages = await messagesModel.findAll();
    return res.status(200).json({
      message: "Exibindo todas as mensagens",
      data: messages
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

router.get("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await messagesModel.findByPk(messageId);

    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada"
      });
    }

    return res.status(200).json({
      message: "Mensagem encontrada",
      data: message
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.context?.me?.id;

    if (!text || !userId) {
      return res.status(400).json({
        error: "Por favor preencha os campos ou efetue o seu login!!"
      });
    }

    const newMessage = await messagesModel.create({ text, userId });

    return res.status(201).json({
      message: "Mensagem enviada",
      data: newMessage
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

router.put("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;

    const message = await messagesModel.findByPk(messageId);
    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada"
      });
    }

    await messagesModel.update({ text }, { where: { id: messageId } });

    return res.status(200).json({
      message: "A mensagem foi atualizada"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await messagesModel.findByPk(messageId);

    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada"
      });
    }

    await messagesModel.destroy({ where: { id: messageId } });

    return res.status(200).json({
      message: "Mensagem deletada"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno do servidor."
    });
  }
});

export default router;