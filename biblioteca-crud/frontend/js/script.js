const api = "http://localhost:5000";
let livrosCache = [];
let livroModalEditar = null;
let usuariosCache = [];
let usuarioModalEditar = null;
let dashboardChart = null;

function mostrarMensagem(containerId, texto, tipo) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${texto}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function validarLivro(titulo, autor, categoria, ano, quantidade) {
    if (!titulo || titulo.length < 2) {
        return "Título deve ter pelo menos 2 caracteres.";
    }
    if (!autor || autor.length < 2) {
        return "Autor deve ter pelo menos 2 caracteres.";
    }
    if (!categoria || categoria.length < 3) {
        return "Categoria deve ter pelo menos 3 caracteres.";
    }
    if (!ano || !/^\d{4}$/.test(ano)) {
        return "Ano deve ter 4 dígitos.";
    }
    if (!quantidade || Number(quantidade) < 1) {
        return "Quantidade deve ser maior que zero.";
    }
    return null;
}

function validarUsuario(nome, email, telefone, endereco) {
    if (!nome || nome.length < 2) {
        return "Nome deve ter pelo menos 2 caracteres.";
    }
    if (!email || email.length < 5 || !/^\S+@\S+\.\S+$/.test(email)) {
        return "Informe um email válido.";
    }
    if (!telefone || telefone.length < 8) {
        return "Telefone deve ter pelo menos 8 caracteres.";
    }
    if (!endereco || endereco.length < 5) {
        return "Endereço deve ter pelo menos 5 caracteres.";
    }
    return null;
}

// ============================
// LIVROS
// ============================

async function cadastrarLivro() {

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const categoriaSelecionada = document.getElementById("categoria").value;
    const categoriaOutro = document.getElementById("categoriaOutro").value;
    const ano = document.getElementById("ano").value;
    const quantidade = document.getElementById("quantidade").value;

    const categoria = categoriaSelecionada === "Outros" ? categoriaOutro.trim() : categoriaSelecionada;

    const erroValidacao = validarLivro(titulo, autor, categoria, ano, quantidade);
    if (erroValidacao) {
        mostrarMensagem("mensagemLivro", erroValidacao, "danger");
        return;
    }

    const livro = {
        titulo,
        autor,
        categoria,
        ano,
        quantidade
    };

    try {

        const response = await fetch(`${api}/livros`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(livro)
        });

        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        limparFormularioLivro();
        listarLivros();
        mostrarMensagem("mensagemLivro", "Livro cadastrado com sucesso!", "success");

    } catch (erro) {
        console.error("Erro ao cadastrar livro:", erro);
        mostrarMensagem("mensagemLivro", "Não foi possível cadastrar o livro. Tente novamente.", "danger");
    }
}

function mostrarMensagemLivro(texto, tipo) {
    const container = document.getElementById("mensagemLivro");
    if (!container) return;

    container.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${texto}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function toggleCategoriaOutro() {
    const select = document.getElementById("categoria");
    const inputOutro = document.getElementById("categoriaOutro");

    if (select.value === "Outros") {
        inputOutro.classList.remove("d-none");
        inputOutro.focus();
    } else {
        inputOutro.classList.add("d-none");
        inputOutro.value = "";
    }
}

async function listarLivros() {

    const tabela = document.getElementById("tabelaLivros");

    if (!tabela) return;

    try {

        const response = await fetch(`${api}/livros`);

        const livros = await response.json();

        tabela.innerHTML = "";

        livrosCache = livros;
        livros.forEach(livro => {

            tabela.innerHTML += `
                <tr>
                    <td>${livro.id}</td>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.categoria}</td>
                    <td>${livro.ano}</td>
                    <td>${livro.quantidade}</td>

                    <td>
                        <div class="actions">

                            <button 
                                class="btn-editar"
                                onclick="editarLivro(${livro.id})">
                                Editar
                            </button>

                            <button 
                                class="btn-excluir"
                                onclick="deletarLivro(${livro.id})">
                                Excluir
                            </button>

                        </div>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao listar livros:", erro);
    }
}

async function deletarLivro(id) {

    try {

        await fetch(`${api}/livros/${id}`, {
            method: "DELETE"
        });

        listarLivros();

    } catch (erro) {
        console.error("Erro ao deletar livro:", erro);
    }
}

function editarLivro(id) {

    const livro = livrosCache.find(item => item.id === id);

    if (!livro) {
        mostrarMensagemLivro("Livro não encontrado para edição.", "danger");
        return;
    }

    document.getElementById("editarLivroId").value = livro.id;
    document.getElementById("editarTitulo").value = livro.titulo;
    document.getElementById("editarAutor").value = livro.autor;
    document.getElementById("editarAno").value = livro.ano;
    document.getElementById("editarQuantidade").value = livro.quantidade;

    const categoriasPadrao = ["Ficção", "Não-ficção", "Romance", "Fantasia", "Biografia", "Infantil"];
    const outroWrapper = document.getElementById("editarCategoriaOutroWrapper");
    const outroInput = document.getElementById("editarCategoriaOutro");
    const selectCategoria = document.getElementById("editarCategoria");

    if (categoriasPadrao.includes(livro.categoria)) {
        selectCategoria.value = livro.categoria;
        outroWrapper.classList.add("d-none");
        outroInput.value = "";
    } else {
        selectCategoria.value = "Outros";
        outroWrapper.classList.remove("d-none");
        outroInput.value = livro.categoria;
    }

    livroModalEditar = new bootstrap.Modal(document.getElementById("editLivroModal"));
    livroModalEditar.show();
}

function toggleCategoriaOutroModal() {
    const select = document.getElementById("editarCategoria");
    const wrapper = document.getElementById("editarCategoriaOutroWrapper");
    const input = document.getElementById("editarCategoriaOutro");

    if (select.value === "Outros") {
        wrapper.classList.remove("d-none");
        input.focus();
    } else {
        wrapper.classList.add("d-none");
        input.value = "";
    }
}

async function salvarEdicaoLivro() {
    const id = document.getElementById("editarLivroId").value;
    const titulo = document.getElementById("editarTitulo").value;
    const autor = document.getElementById("editarAutor").value;
    const categoriaSelecionada = document.getElementById("editarCategoria").value;
    const categoriaOutro = document.getElementById("editarCategoriaOutro").value;
    const ano = document.getElementById("editarAno").value;
    const quantidade = document.getElementById("editarQuantidade").value;

    const categoria = categoriaSelecionada === "Outros" ? categoriaOutro.trim() : categoriaSelecionada;

    const erroValidacao = validarLivro(titulo, autor, categoria, ano, quantidade);
    if (erroValidacao) {
        mostrarMensagem("mensagemLivro", erroValidacao, "danger");
        return;
    }

    const livro = {
        titulo,
        autor,
        categoria,
        ano,
        quantidade
    };

    try {
        const response = await fetch(`${api}/livros/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(livro)
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }

        if (livroModalEditar) {
            livroModalEditar.hide();
        }

        listarLivros();
        mostrarMensagem("mensagemLivro", "Livro atualizado com sucesso!", "success");
    } catch (erro) {
        console.error("Erro ao atualizar livro:", erro);
        mostrarMensagem("mensagemLivro", "Não foi possível atualizar o livro. Tente novamente.", "danger");
    }
}

// ============================
// USUÁRIOS
// ============================

async function cadastrarUsuario() {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    const erroValidacao = validarUsuario(nome, email, telefone, endereco);
    if (erroValidacao) {
        mostrarMensagem("mensagemUsuario", erroValidacao, "danger");
        return;
    }

    const usuario = {
        nome,
        email,
        telefone,
        endereco
    };

    try {

        await fetch(`${api}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        limparFormularioUsuario();
        listarUsuarios();
        mostrarMensagem("mensagemUsuario", "Usuário cadastrado com sucesso!", "success");

    } catch (erro) {
        console.error("Erro ao cadastrar usuário:", erro);
        mostrarMensagem("mensagemUsuario", "Não foi possível cadastrar o usuário. Tente novamente.", "danger");
    }
}

async function listarUsuarios() {

    const tabela = document.getElementById("tabelaUsuarios");

    if (!tabela) return;

    try {

        const response = await fetch(`${api}/usuarios`);

        const usuarios = await response.json();
        usuariosCache = usuarios;

        tabela.innerHTML = "";

        usuarios.forEach(usuario => {

            tabela.innerHTML += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.endereco}</td>

                    <td>
                        <div class="actions">

                            <button 
                                class="btn-editar"
                                onclick="editarUsuario(${usuario.id})">
                                Editar
                            </button>

                            <button 
                                class="btn-excluir"
                                onclick="deletarUsuario(${usuario.id})">
                                Excluir
                            </button>

                        </div>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao listar usuários:", erro);
    }
}

async function deletarUsuario(id) {

    try {

        await fetch(`${api}/usuarios/${id}`, {
            method: "DELETE"
        });

        listarUsuarios();

    } catch (erro) {
        console.error("Erro ao deletar usuário:", erro);
    }
}

function editarUsuario(id) {

    const usuario = usuariosCache.find(item => item.id === id);

    if (!usuario) {
        console.error("Usuário não encontrado para edição", id);
        return;
    }

    document.getElementById("editarUsuarioId").value = usuario.id;
    document.getElementById("editarNome").value = usuario.nome;
    document.getElementById("editarEmail").value = usuario.email;
    document.getElementById("editarTelefone").value = usuario.telefone;
    document.getElementById("editarEndereco").value = usuario.endereco;

    usuarioModalEditar = new bootstrap.Modal(document.getElementById("editUsuarioModal"));
    usuarioModalEditar.show();
}

async function salvarEdicaoUsuario() {
    const id = document.getElementById("editarUsuarioId").value;
    const nome = document.getElementById("editarNome").value;
    const email = document.getElementById("editarEmail").value;
    const telefone = document.getElementById("editarTelefone").value;
    const endereco = document.getElementById("editarEndereco").value;

    const erroValidacao = validarUsuario(nome, email, telefone, endereco);
    if (erroValidacao) {
        mostrarMensagem("mensagemUsuario", erroValidacao, "danger");
        return;
    }

    try {
        const response = await fetch(`${api}/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, telefone, endereco })
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }

        if (usuarioModalEditar) {
            usuarioModalEditar.hide();
        }

        listarUsuarios();
        mostrarMensagem("mensagemUsuario", "Usuário atualizado com sucesso!", "success");
    } catch (erro) {
        console.error("Erro ao atualizar usuário:", erro);
        mostrarMensagem("mensagemUsuario", "Não foi possível atualizar o usuário. Tente novamente.", "danger");
    }
}

// ============================
// EMPRÉSTIMOS
// ============================

async function preencherOpcoesEmprestimos() {

    const selectLivros = document.getElementById("livroEmprestimo");
    const selectUsuarios = document.getElementById("usuarioEmprestimo");

    if (!selectLivros || !selectUsuarios) return;

    try {

        const [responseLivros, responseUsuarios] = await Promise.all([
            fetch(`${api}/livros`),
            fetch(`${api}/usuarios`)
        ]);

        const livros = await responseLivros.json();
        const usuarios = await responseUsuarios.json();

        selectLivros.innerHTML = `
            <option value="">Selecione um livro</option>
        `;
        selectUsuarios.innerHTML = `
            <option value="">Selecione um usuário</option>
        `;

        if (livros.length === 0) {
            selectLivros.innerHTML += `<option value="" disabled>Não há livros cadastrados</option>`;
        } else {
            livros.forEach(livro => {
                selectLivros.innerHTML += `<option value="${livro.id}">${livro.titulo}</option>`;
            });
        }

        if (usuarios.length === 0) {
            selectUsuarios.innerHTML += `<option value="" disabled>Não há usuários cadastrados</option>`;
        } else {
            usuarios.forEach(usuario => {
                selectUsuarios.innerHTML += `<option value="${usuario.id}">${usuario.nome}</option>`;
            });
        }

    } catch (erro) {
        console.error("Erro ao carregar opções de empréstimo:", erro);
    }
}

async function listarEmprestimos() {

    const tabela = document.getElementById("tabelaEmprestimos");

    if (!tabela) return;

    try {

        const response = await fetch(`${api}/emprestimos`);
        const emprestimos = await response.json();

        tabela.innerHTML = "";

        emprestimos.forEach(item => {

            tabela.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.livro}</td>
                    <td>${item.usuario}</td>
                    <td>${item.data_emprestimo}</td>
                    <td>${item.data_devolucao}</td>
                    <td>${item.status}</td>
                    <td>
                        <div class="actions">
                            <button
                                class="btn-excluir"
                                onclick="deletarEmprestimo(${item.id})">
                                Excluir
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.error("Erro ao listar empréstimos:", erro);
    }
}

async function registrarEmprestimo() {

    const livroId = document.getElementById("livroEmprestimo").value;
    const usuarioId = document.getElementById("usuarioEmprestimo").value;
    const dataEmprestimo = document.getElementById("dataEmprestimo").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    if (!livroId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
        alert("Preencha todos os campos do empréstimo.");
        return;
    }

    const emprestimo = {
        usuario_id: Number(usuarioId),
        livro_id: Number(livroId),
        data_emprestimo: dataEmprestimo,
        data_devolucao: dataDevolucao,
        status: "Emprestado"
    };

    try {

        await fetch(`${api}/emprestimos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(emprestimo)
        });

        limparFormularioEmprestimo();

        listarEmprestimos();

    } catch (erro) {
        console.error("Erro ao cadastrar empréstimo:", erro);
    }
}

async function deletarEmprestimo(id) {

    try {

        await fetch(`${api}/emprestimos/${id}`, {
            method: "DELETE"
        });

        listarEmprestimos();

    } catch (erro) {
        console.error("Erro ao deletar empréstimo:", erro);
    }
}

function limparFormularioEmprestimo() {

    document.getElementById("livroEmprestimo").value = "";
    document.getElementById("usuarioEmprestimo").value = "";
    document.getElementById("dataEmprestimo").value = "";
    document.getElementById("dataDevolucao").value = "";
}

// ============================
// LIMPAR FORMULÁRIOS
// ============================

function limparFormularioLivro() {

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("categoriaOutro").value = "";
    document.getElementById("categoriaOutro").classList.add("d-none");
    document.getElementById("ano").value = "";
    document.getElementById("quantidade").value = "";
}

function limparFormularioUsuario() {

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
}

// ============================
// DASHBOARD
// ============================

async function atualizarDashboard() {

    try {

        const [responseLivros, responseUsuarios, responseEmprestimos] = await Promise.all([
            fetch(`${api}/livros`),
            fetch(`${api}/usuarios`),
            fetch(`${api}/emprestimos`)
        ]);

        const livros = await responseLivros.json();
        const usuarios = await responseUsuarios.json();
        const emprestimos = await responseEmprestimos.json();

        const totalLivros = document.getElementById("totalLivros");
        const totalUsuarios = document.getElementById("totalUsuarios");

        if (totalLivros) {
            totalLivros.textContent = livros.length;
        }

        if (totalUsuarios) {
            totalUsuarios.textContent = usuarios.length;
        }

        renderDashboardChart(livros.length, usuarios.length, emprestimos.length);

    } catch (erro) {
        console.error("Erro ao atualizar dashboard:", erro);
    }
}

function renderDashboardChart(totalLivros, totalUsuarios, totalEmprestimos) {
    const ctx = document.getElementById("dashboardChart");
    if (!ctx) return;

    const data = {
        labels: ["Livros", "Usuários", "Empréstimos"],
        datasets: [{
            label: "Contagem",
            data: [totalLivros, totalUsuarios, totalEmprestimos],
            backgroundColor: [
                "rgba(33, 150, 243, 0.7)",
                "rgba(40, 167, 69, 0.7)",
                "rgba(255, 152, 0, 0.7)"
            ],
            borderColor: [
                "rgba(33, 150, 243, 1)",
                "rgba(40, 167, 69, 1)",
                "rgba(255, 152, 0, 1)"
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: "bar",
        data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: context => `${context.dataset.label}: ${context.parsed.y}`
                    }
                }
            }
        }
    };

    if (dashboardChart) {
        dashboardChart.data = data;
        dashboardChart.update();
        return;
    }

    dashboardChart = new Chart(ctx, config);
}

// ============================
// CARREGAMENTO INICIAL
// ============================

window.onload = () => {

    listarLivros();

    listarUsuarios();

    listarEmprestimos();

    preencherOpcoesEmprestimos();

    atualizarDashboard();
};