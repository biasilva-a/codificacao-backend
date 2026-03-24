import express from 'express';
import { pratoservice } from '../services/pratos.service.js';

const route = express.Router();

route.get('/', (req, res) => {
    const dado = pratoservice.getALL();
    res.json(dado);
});

route.get('/:id', (req, res) => {
    const { id } = req.params;
    const prato = pratoservice.getById(id);
    if (!prato) {
        return res.status(404).json({ message: 'Prato não encontrado' });
    }
    res.json(prato);
});

export default route;