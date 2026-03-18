import express from 'express';
import fruitsRoutes from './routes/fruitsRoutes.js'

const app = express();
const PORT = 3000;

app.use(express.json())

// monta o router em /fruits
app.use('/fruits', fruitsRoutes)

app.listen(PORT, () => {
    console.log(`Servidor está funcionando na porta: http://localhost:${PORT}`);
})

