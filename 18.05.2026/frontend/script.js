const API_URL = '/api/notas';
const form = document.getElementById('notaForm');
const lista = document.getElementById('listaNotas');

async function carregarNotas() {
    try {
        const res = await fetch(API_URL);
        const notas = await res.json();
        
        lista.innerHTML = notas.map(n => `
            <div class="nota">
                <h3>${n.titulo}</h3>
                <p>${n.conteudo}</p>
                <div class="actions">
                    <button onclick="editarNota(${n.id}, '${n.titulo}', '${n.conteudo}')">Editar</button>
                    <button class="btn-delete" onclick="deletarNota(${n.id})">Excluir</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error("Erro ao carregar notas:", err);
    }
}

form.onsubmit = async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('notaId').value;
    const payload = {
        titulo: document.getElementById('titulo').value,
        conteudo: document.getElementById('conteudo').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    form.reset();
    document.getElementById('notaId').value = '';
    carregarNotas();
};

async function deletarNota(id) {
    if (confirm("Deseja mesmo excluir?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarNotas();
    }
}

function editarNota(id, titulo, conteudo) {
    document.getElementById('notaId').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('conteudo').value = conteudo;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializa
carregarNotas();