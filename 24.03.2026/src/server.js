import express from 'express';
import pratosRoutes from './routes/pratosRoutes.js'; 

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/pratos', pratosRoutes);

app.listen(PORT, () => {
    console.log(`Pratos rodando na porta: http://localhost:${PORT}`);
});