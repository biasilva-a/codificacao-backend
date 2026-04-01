// Mock de dados
const fruits = [
    { id: 1, nome: "Maça" },
    { id: 2, nome: "Pera" }
]

class FruitService {
    getAll() {
        return fruits
    }

    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }
        fruits.push(newFruit)
        return newFruit
    }
    // Atualiza o nome da fruta com base no ID
    update(id, nome) {
        const index = fruits.findIndex //O finIndex é usado para descobrir em que posição a fruta está no array.
        (f => f.id === parseInt(id)); 
        if (index !== -1) //Se o index for diferente de -1, significa que a fruta foi encontrada.
            { 
                fruits[index].nome = nome; //Atualiza o nome da fruta no array.
                return fruits[index];
            }
        return null; //Se a fruta não for encontrada, retorna null.
    }
    
    // Remove a fruta do array com base no ID e retorna a fruta removida
    delete(id) {
        const index = fruits.findIndex //O findIndex é usado para descobrir em que posição a fruta está no array.
        (f => f.id === parseInt(id)); 

        if (index !== -1) //Se o index for diferente de -1, significa que a fruta foi encontrada.
            {
            const deletedFruit = fruits.splice(index, 1); //O splice é usado para remover a fruta do array e retorna um array com a fruta removida.
            return deletedFruit[0]; 
        }

        return null;} //Se a fruta não for encontrada, retorna null.
}

export const fruitService = new FruitService()
