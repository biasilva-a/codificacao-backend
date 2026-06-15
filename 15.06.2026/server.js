import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

let chats = [
  {
    id: "order-101",
    orderStatus: "Em andamento",
    customer: { id: "user_client_1", name: "Thayla Pureza" },
    agent: { id: "user_agent_1", name: "Bianca Oliveira", role: "Suporte Técnico" },
    messages: [
      { id: 1, sender: "system", text: "Atendimento iniciado pelo suporte.", timestamp: "15:30" },
      { id: 2, sender: "agent", text: "Olá Thayla! Sou a Bianca do suporte técnico. Como posso te ajudar com o seu pedido hoje?", timestamp: "15:31" },
      { id: 3, sender: "customer", text: "Oii Bianca, meu pedido #101 veio com o item errado na sacola.", timestamp: "15:32" }
    ]
  }
];

// --- ROTAS DA API ---

// Buscar os detalhes de um chat específico pelo ID do pedido
app.get('/api/chats/:orderId', (req, res) => {
  const chat = chats.find(c => c.id === req.params.orderId);
  if (!chat) {
    return res.status(404).json({ error: "Chat/Pedido não encontrado." });
  }
  res.json(chat);
});

// Enviar uma nova mensagem em um chat
app.post('/api/chats/:orderId/messages', (req, res) => {
  const { orderId } = req.params;
  const { sender, text } = req.body;

  if (!sender || !text) {
    return res.status(400).json({ error: "Os campos 'sender' e 'text' devem ser preenchidos." });
  }

  const chat = chats.find(c => c.id === orderId);
  if (!chat) {
    return res.status(404).json({ error: "O chat não encontrado." });
  }

  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMessage = {
    id: chat.messages.length + 1,
    sender,
    text,
    timestamp
  };

  chat.messages.push(newMessage);
  res.status(201).json(newMessage);
});

// --- SERVIR INTERFACE FRONT-END ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Suporte rodando em: http://localhost:${PORT}`);
});