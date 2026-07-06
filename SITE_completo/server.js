import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

// Em ES Modules, é obrigatório colocar a extensão (.js) ao importar arquivos locais!
import produtosRouter from './routes/produtos.js';
import authRouter from './routes/auth.js';
import carrinhoRouter from './routes/carrinho.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(session({
    secret: 'eshop-pro-mock-secret',
    resave: false, 
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 4 } 
}));

// API
app.use('/api/produtos', produtosRouter);
app.use('/api', authRouter);
app.use('/api/carrinho', carrinhoRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`E - Shop Pro rodando em http://localhost:${PORT}`);
});