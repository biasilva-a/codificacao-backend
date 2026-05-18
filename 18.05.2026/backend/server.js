const express = require('express');
const path = require('path');
const services = require('./services/notaService');
const app = express();

app.use(express.json());

// Se os arquivos estiverem na pasta 'public' ou 'frontend', ajuste aqui:
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/api/notas', (req, res) => {
    res.json(services.listarTodas());
});

app.post('/api/notas', (req, res) => {
    const nota = services.criar(req.body.titulo, req.body.conteudo);
    res.status(201).json(nota);
});

app.put('/api/notas/:id', (req, res) => {
    const nota = services.atualizar(req.params.id, req.body.titulo, req.body.conteudo);
    nota ? res.json(nota) : res.status(404).send();
});

app.delete('/api/notas/:id', (req, res) => {
    services.excluir(req.params.id);
    res.status(204).send();
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));