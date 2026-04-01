import express from 'express'
import { fruitService } from '../services/fruit.service.js'

const route = express.Router()

route.get("/", (req, res) => {
    const data = fruitService.getAll()
    res.json(data)
})

route.post("/", (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: "O nome da fruta é obrigatório" })
    }

    const newFruit = fruitService.create(nome)
    res.status(201).json(newFruit)
})

route.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitService.getById(id)
    if (!fruit) {
        return res.status(404).json({ message: "Fruta não encontrada" })
    }
    res.json(fruit)
})

// Rota para atualizar o nome de uma fruta existente pelo ID
route.put("/:id", (req, res) => {
    const { id } = req.params // Extrai o ID da URL
    const { nome } = req.body // Extrai o novo nome do corpo da requisição

    // Valida se o nome foi enviado no corpo (body)
    if (!nome) {
        return res.status(400).json({ message: "O novo nome da fruta é obrigatório" })
    }

    // Tenta atualizar no service
    const updatedFruit = fruitService.update(id, nome)

    // Se o service retornar null, significa que o ID não existe
    if (!updatedFruit) {
        return res.status(404).json({ message: "Fruta não encontrada para atualizar" })
    }

    // Se deu certo, retorna a fruta atualizada
    res.json(updatedFruit)
})

// Rota para remover uma fruta do array pelo ID
route.delete("/:id", (req, res) => {
    const { id } = req.params // Extrai o ID da URL
    
    // Chama o método de delete no service
    const wasDeleted = fruitService.delete(id)

    // Se o service retornar null, significa que não encontrou a fruta para deletar
    if (!wasDeleted) {
        return res.status(404).json({ message: "Fruta não encontrada para remover" })
    }

    // Retorna mensagem de sucesso confirmando a remoção
    res.json({ message: "Fruta removida com sucesso" })
})

export default route
