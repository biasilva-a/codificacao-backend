// Mock de dados inicial
const fruits = [
  { "id": 1, "nome": "Maça", "cor": "Vermelha", "preco": 5 },
  { "id": 2, "nome": "Pera", "cor": "Verde", "preco": 6 }
]

class FruitService {
    getAll() {
        return fruits
    }

    getById(id) {
        return fruits.find(f => f.id === Number(id))
    }

    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }
        fruits.push(newFruit)
        return newFruit
    }

    // Substituição completa (Método PUT)
    update(id, nome) {
        const fruitId = Number(id)
        const index = fruits.findIndex(f => f.id === fruitId)
        
        if (index !== -1) {
            fruits[index] = { id: fruitId, nome }
            return fruits[index]
        }
        return null
    }

    // PATCH
    patch(id, data) {
        const fruitId = Number(id)
        const index = fruits.findIndex(f => f.id === fruitId)

        if (index !== -1) {
            fruits[index] = { ...fruits[index], ...data }
            return fruits[index]
        }
        return null
    }

    //  DELETE
    delete(id) {
        const index = fruits.findIndex(f => f.id === Number(id))
        
        if (index !== -1) {
            return fruits.splice(index, 1)[0]
        }
        return null
    }
}

export const fruitService = new FruitService()