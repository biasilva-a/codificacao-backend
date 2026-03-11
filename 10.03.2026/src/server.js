const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/routes')
const app = express()
app.use(cors())
app.use(express.json())
app.use('10.03.2026',routes)
const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
