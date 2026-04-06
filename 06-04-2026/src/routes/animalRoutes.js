import express from 'express'
import { animalService } from '../services/animal.service.js'

const route = express.Router()

// GET: Listar todos os animais
route.get("/", (req, res) => {
    const data = animalService.getAll()
    res.json(data)
})

// POST: Criar um novo animal
route.post("/", (req, res) => {
    const { nome } = req.body
    
    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ message: "O nome do animal é obrigatório e deve ser um texto" })
    }
    
    const newAnimal = animalService.create(nome)
    res.status(201).json(newAnimal)
})

// GET: Buscar o animal por ID
route.get("/:id", (req, res) => {
    const { id } = req.params
    const animal = animalService.getById(id)
    
    if (!animal) {
        return res.status(404).json({ message: "Animal não encontrado" })
    }
    res.json(animal)
})

// PUT: Atualizar animal existente
route.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    
    if (!nome) {
        return res.status(400).json({ message: "O nome é obrigatório para atualização" })
    }
    
    const updatedAnimal = animalService.update(id, nome)
    if (!updatedAnimal) {
        return res.status(404).json({ message: "Animal não encontrado para atualizar" })
    }
    
    res.json(updatedAnimal)
})

// DELETE: Remover animal
route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedAnimal = animalService.delete(id)
    
    if (!deletedAnimal) {
        return res.status(404).json({ message: "Animal não encontrado para remoção" })
    }
    
    res.json({ message: `Animal '${deletedAnimal.nome}' deletado com sucesso` })
})

export default route