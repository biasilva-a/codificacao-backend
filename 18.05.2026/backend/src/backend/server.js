const express = require('express');
const path = require('path');
const service = require('./services/notaService.js');

const app = express();
app.use(express.json());

// Serve os arquivos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
app.get('/api/notas', (req, res) => res.json(service.listarTodas()));
app.post('/api/notas', (req, res) => {
    const nota = service.criar(req.body.titulo, req.body.conteudo);
    res.status(201).json(nota);
});
app.put('/api/notas/:id', (req, res) => {
    const nota = service.atualizar(req.params.id, req.body.titulo, req.body.conteudo);
    nota ? res.json(nota) : res.status(404).send();
});
app.delete('/api/notas/:id', (req, res) => {
    service.excluir(req.params.id);
    res.status(204).send();
});

app.listen(3000, () => console.log("Servidor ON em http://localhost:3000"));