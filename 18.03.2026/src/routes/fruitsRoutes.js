import express from 'express';
import { fruitservice } from '../services/fruit.service.js';

const route = express.Router();

route.get('/', (req, res) => {
    const dado = fruitservice.getALL();
    res.json(dado);
})

export default route;


