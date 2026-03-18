const fruits = [
    { id: 1, nome: "morango", cor: "vermelho", preco: "10.00" },
    { id: 2, nome: "banana", cor: "amarelo", preco: "5.00" },
]

export class FruitService {
    getALL(){
        return fruits;
    }
}

export const fruitservice = new FruitService();