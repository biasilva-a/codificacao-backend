// Mock de dados inicial
const animals = [
    { id: 1, nome: "Cachorro" },
    { id: 2, nome: "Gato" }
]

class AnimalService {
    // Retorna todos os animais
    getAll() {
        return animals
    }

    // Busca um animal específico pelo ID
    getById(id) {
        return animals.find(a => a.id === Number(id))
    }

    // Cria um novo animal com ID incremental
    create(nome) {
        const newAnimal = {
            id: animals.length > 0 ? animals[animals.length - 1].id + 1 : 1,
            nome
        }
        animals.push(newAnimal)
        return newAnimal
    }

    // Atualiza um animal existente (Método PUT)
    update(id, nome) {
        const animalId = Number(id)
        const index = animals.findIndex(a => a.id === animalId)
        
        if (index !== -1) {
            animals[index] = { id: animalId, nome }
            return animals[index]
        }
        return null
    }

    // Remove um animal do array (Método DELETE)
    delete(id) {
        const index = animals.findIndex(a => a.id === Number(id))
        
        if (index !== -1) {
            // Corrigido: era mencionado "fruta" no comentário
            return animals.splice(index, 1)[0]
        }
        return null
    }
}

export const animalService = new AnimalService()