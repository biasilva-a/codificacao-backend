import express from 'express'
import { fruitService } from '../service/fruits.service.js'

const route = express.Router()

// GET: Listar todas as frutas
route.get("/", (req, res) => {
    const data = fruitService.getAll()
    res.json(data)
})

// POST: Criar uma nova fruta
route.post("/", (req, res) => {
    const { nome } = req.body
    
    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ message: "O nome da fruta é obrigatório!" })
    }
    
    const newFruit = fruitService.create(nome)
    res.status(201).json(newFruit)
})

// GET: Buscar a fruta por ID
route.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitService.getById(id)
    
    if (!fruit) {
        return res.status(404).json({ message: "Fruta não encontrada" })
    }
    res.json(fruit)
})

// PUT: Substituir fruta existente
route.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    
    if (!nome) {
        return res.status(400).json({ message: "O nome é obrigatório para substituição completa" })
    }
    
    const updatedFruit = fruitService.update(id, nome)
    if (!updatedFruit) {
        return res.status(404).json({ message: "Fruta não encontrada para atualizar" })
    }
    
    res.json(updatedFruit)
})

// PATCH: Atualizar parcialmente uma fruta
route.patch("/:id", (req, res) => {
    const { id } = req.params
    const data = req.body 
    const updatedFruit = fruitService.patch(id, data)
    
    if (!updatedFruit) {
        return res.status(404).json({ message: "Fruta não encontrada para atualização." })
    }

    res.json(updatedFruit)
})

// DELETE: Remover fruta
route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedFruit = fruitService.delete(id)
    
    if (!deletedFruit) {
        return res.status(404).json({ message: "Fruta não encontrada pra remoção" })
    }
    
    res.json({ message: `A Fruta '${deletedFruit.nome}' deletada com sucesso` })
})

export default route