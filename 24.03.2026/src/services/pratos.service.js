const getALL = () => {
    return [
        { id: 1, nome: "Lasanha à Bolonhesa", categoria: "Massa", preco: 45.90 },
        { id: 2, nome: "Hambúrguer Artesanal duplo", categoria: "Lanches", preco: 35.50 },
        { id: 3, nome: "Pizza de Calabresa", categoria: "Pizzas", preco: 60.00 },
        { id: 4, nome: "Frango à Parmegiana", categoria: "Carnes", preco: 40.00 },
        { id: 5, nome: "Sushi de Salmão", categoria: "Sushi", preco: 50.00 },
        { id: 6, nome: "Salada Caesar", categoria: "Saladas", preco: 25.00 }
    ];
};

const getById = (id) => {
    const numId = Number(id);
    if (Number.isNaN(numId)) return null;
    
    const pratos = getALL();
    return pratos.find(p => p.id === numId) ?? null;
};

export const pratoservice = {
    getALL,
    getById
};