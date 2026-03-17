const express = require('express');
const app = express();
const port = 3000;

const frutas = [
    { id: 1, nome: 'Maçã' },
    { id: 2, nome: 'Banana' },
    { id: 3, nome: 'Limão' },
    { id: 4, nome: 'Uva' }
];

app.get('/frutas', (req, res) => {
    res.json(frutas);
});

app.get('/frutas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const fruta = frutas.find(f => f.id === id);

    if (!fruta) {
        return res.status(404).json({ success: false, message: "Fruta não encontrada" });
    }
    res.json({ success: true, data: fruta });
});

app.listen(port, () => {
    console.log(` API de Frutas rodando com sucesso na porta: ${port} `);
});