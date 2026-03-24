import express from 'express';
import { pratoservice } from '../services/pratos.service.js';

const route = express.Router();

route.get('/', (req, res) => {
    const dado = pratoservice.getALL();
    res.json(dado);
});

export default route;