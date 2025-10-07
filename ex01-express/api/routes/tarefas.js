import { Router } from "express";
import models from "../models/index.js";

const router = Router();
const tarefaModel = models.tarefa;

router.get('/', async (req, res) => {
    try {
        const tarefas = await tarefaModel.findAll();

        return res.status(200).send({
            message : "Tarefa encontrada",
            data : tarefas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.get("/:tarefaId", async (req, res) => {
    try {
        const { tarefaId } = req.params;
        const tarefa = await tarefaModel.findByPk(tarefaId);

        if(!tarefa){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        return res.status(200).send({
            message : "Tarefa encontrada",
            data : tarefa
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.post("/", async (req, res) => {
    try {
        const { descricao, concluida } = req.body;

        if(!descricao){
            return res.status(400).send({
                error : "Não foi possível cirar a tarefa, por favor inserir descrição"
            });
        }

        const tarefaData = {
            descricao,
            concluida
        }

        const newtarefa = await tarefaModel.create(tarefaData);

        return res.status(201).send({
        message : "Tarefa criada",
        data : newtarefa
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.put("/:tarefaId", async (req, res) => {
    try {
        const { tarefaId } = req.params;
        const tarefaExist = await tarefaModel.findByPk(tarefaId);

        if(!tarefaExist){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        const { descricao, concluida } = req.body;

        const tarefaData = {
        descricao,
        concluida
        }
        
        const tarefaUpdated = await tarefaModel.update(tarefaData, { where : {
            id : tarefaId
        }});

        return res.status(200).send({
            message : "Tarefa atualizada!!",
            data : tarefaData
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

router.delete("/:tarefaId", async (req, res) => {
    try {
        const { tarefaId } = req.params;
        const tarefaExist = await tarefaModel.findByPk(tarefaId);

        if(!tarefaExist){
            return res.status(404).send({
                error : "Tarefa não encontrada",
            })
        }

        await tarefaModel.destroy({
            where : {
                id : tarefaId,
            }
        })

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send({
        error : "Erro interno do servidor."
        }); 
    }
})

export default router;