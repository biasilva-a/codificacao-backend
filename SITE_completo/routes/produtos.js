const express = require('express');
const router = express.Router();
const db = require('../data/mockDb');

// GET /api/produtos?busca=&categoria=&ordem=asc|desc
router.get('/', (req, res) => {
    const { busca = '', categoria = '', ordem = 'asc' } = req.query;

    let prods = db.listarProdutos();

    prods = prods.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) &&
        (categoria === '' || p.categoria === categoria)
    );

    prods.sort((a, b) => ordem === 'asc' ? a.preco - b.preco : b.preco - a.preco);

    res.json(prods);
});

// GET /api/produtos/:id
router.get('/:id', (req, res) => {
    const produto = db.buscarProdutoPorId(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
});

// POST /api/produtos
router.post('/', (req, res) => {
    const { nome, preco, estoque, categoria, desc } = req.body;
    if (!nome || preco === undefined || estoque === undefined || !categoria) {
        return res.status(400).json({ erro: 'Dados incompletos' });
    }
    const novo = db.criarProduto({ nome, preco, estoque, categoria, desc });
    res.status(201).json(novo);
});

// PUT /api/produtos/:id
router.put('/:id', (req, res) => {
    const { nome, preco, estoque, categoria, desc } = req.body;
    const atualizado = db.atualizarProduto(req.params.id, { nome, preco, estoque, categoria, desc });
    if (!atualizado) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(atualizado);
});

// DELETE /api/produtos/:id
router.delete('/:id', (req, res) => {
    const ok = db.excluirProduto(req.params.id);
    if (!ok) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.status(204).end();
});

// POST /api/produtos/:id/avaliacoes
router.post('/:id/avaliacoes', (req, res) => {
    const { nota } = req.body;
    if (!nota) return res.status(400).json({ erro: 'Nota é obrigatória' });
    const produto = db.avaliarProduto(req.params.id, nota);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
});

module.exports = router;