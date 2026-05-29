# 📚 Sistema de Biblioteca - CRUD

## 📖 Sobre o Projeto

Sistema de gerenciamento de biblioteca desenvolvido para realizar operações de **CRUD (Create, Read, Update e Delete)** de livros, usuários e empréstimos.

A aplicação permite cadastrar, visualizar, editar e excluir registros de forma simples e intuitiva, utilizando uma interface web integrada a um backend em Python com Flask.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização responsiva
- **JavaScript (Vanilla)** - Interatividade
- **Bootstrap 5** - Framework CSS
- **Chart.js** - Gráficos e visualizações

### Backend
- **Python 3.14+**
- **Flask** - Framework web
- **Flask-CORS** - Suporte a CORS

### Banco de Dados
- **SQLite** - Armazenamento de dados

---

## ✨ Funcionalidades

### 📚 Gerenciamento de Livros
- ✅ Cadastro de livros com título, autor, categoria, ano e quantidade
- ✅ Listagem de livros em tabela
- ✅ Edição de informações de livros
- ✅ Exclusão de livros
- ✅ Validação de formulários

### 👤 Gerenciamento de Usuários
- ✅ Cadastro de usuários com nome, email, telefone e endereço
- ✅ Listagem de usuários em tabela
- ✅ Edição de informações de usuários
- ✅ Exclusão de usuários
- ✅ Validação de dados (email único, campos obrigatórios)

### 📤 Gerenciamento de Empréstimos
- ✅ Registro de empréstimos de livros por usuários
- ✅ Listagem de empréstimos com filtros
- ✅ Controle de datas (empréstimo e devolução)
- ✅ Status de empréstimo
- ✅ Exclusão de registros de empréstimo

### 📊 Dashboard
- ✅ Visão geral com contadores de livros, usuários e empréstimos
- ✅ Gráfico interativo de barras (Chart.js)
- ✅ Atualização em tempo real

### 🔍 Recursos Extras
- ✅ Interface responsiva (Desktop e Mobile)
- ✅ Validação de formulários no frontend e backend
- ✅ Integração CORS entre frontend e backend
- ✅ Modal para edição de registros
- ✅ Mensagens de feedback (sucesso/erro)

---

## 📂 Estrutura do Projeto

```
biblioteca-crud/
│
├── backend/
│   ├── app.py                    # Aplicação principal Flask
│   │
│   ├── config/
│   │   └── database.py           # Configuração de conexão SQLite
│   │
│   ├── database/
│   │   ├── biblioteca.db         # Banco de dados SQLite
│   │   └── criar_tabela.py       # Script para criar tabelas
│   │
│   ├── models/
│   │   ├── livro_model.py        # Modelo de Livro
│   │   ├── usuarios_model.py     # Modelo de Usuário
│   │   └── emprestimo_model.py   # Modelo de Empréstimo
│   │
│   ├── repositories/
│   │   ├── livro_repository.py       # Acesso aos dados de livros
│   │   ├── usuario_repository.py     # Acesso aos dados de usuários
│   │   └── emprestimo_repository.py  # Acesso aos dados de empréstimos
│   │
│   ├── services/
│   │   ├── livro_service.py        # Lógica de negócio de livros
│   │   ├── usuario_service.py      # Lógica de negócio de usuários
│   │   └── emprestimo_service.py   # Lógica de negócio de empréstimos
│   │
│   └── routes/
│       ├── livro_routes.py        # Endpoints para livros
│       ├── usuario_routes.py      # Endpoints para usuários
│       └── emprestimo_routes.py   # Endpoints para empréstimos
│
├── frontend/
│   ├── index.html                # Dashboard principal
│   │
│   ├── pages/
│   │   ├── livros.html           # Página de gerenciamento de livros
│   │   ├── usuarios.html         # Página de gerenciamento de usuários
│   │   └── emprestimos.html      # Página de gerenciamento de empréstimos
│   │
│   ├── css/
│   │   └── style.css             # Estilos personalizados
│   │
│   └── js/
│       └── script.js             # JavaScript da aplicação
│
└── README.md                     # Este arquivo
```

---

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Python 3.14+
- pip (gerenciador de pacotes Python)
- Navegador web moderno

### Passo 1: Clonar o repositório
```bash
git clone <url-do-repositorio>
cd biblioteca-crud
```

### Passo 2: Instalar dependências do backend
```bash
cd backend
pip install flask flask-cors
```

### Passo 3: Criar banco de dados
```bash
python database/criar_tabela.py
```

### Passo 4: Iniciar o servidor backend
```bash
python app.py
```

O servidor iniciará em `http://localhost:5000`

### Passo 5: Acessar a aplicação
Abra seu navegador e acesse:
```
http://localhost:5000
```

---

## 📡 API Endpoints

### Livros
- `GET /livros` - Listar todos os livros
- `POST /livros` - Criar novo livro
- `PUT /livros/<id>` - Atualizar livro
- `DELETE /livros/<id>` - Deletar livro

### Usuários
- `GET /usuarios` - Listar todos os usuários
- `POST /usuarios` - Criar novo usuário
- `PUT /usuarios/<id>` - Atualizar usuário
- `DELETE /usuarios/<id>` - Deletar usuário

### Empréstimos
- `GET /emprestimos` - Listar todos os empréstimos
- `POST /emprestimos` - Registrar novo empréstimo
- `PUT /emprestimos/<id>` - Atualizar empréstimo
- `DELETE /emprestimos/<id>` - Deletar empréstimo

---

## 🎨 Cores e Estilo

O projeto utiliza um sistema de cores definido em CSS custom properties:
- **Azul** (#2196f3) - Primária, Headers
- **Verde** (#28a745) - Ações positivas (Cadastrar)
- **Laranja** (#ff9800) - Ações de edição
- **Vermelho** (#e53935) - Ações destrutivas (Excluir)
- **Cinza** (#e0e0e0) - Bordas e separadores
- **Fundo** (#f5f7fa) - Cor de fundo geral

---

## 📝 Validações Implementadas

### Livros
- Título: mínimo 2 caracteres
- Autor: mínimo 2 caracteres
- Categoria: mínimo 3 caracteres
- Ano: exatamente 4 dígitos
- Quantidade: maior que zero

### Usuários
- Nome: mínimo 2 caracteres
- Email: formato válido e único no banco
- Telefone: mínimo 8 caracteres
- Endereço: mínimo 5 caracteres

### Empréstimos
- Livro: seleção obrigatória
- Usuário: seleção obrigatória
- Data de empréstimo: data válida
- Data de devolução: data válida (posterior à data de empréstimo)

---

## 🐛 Troubleshooting

### Erro: "Não foi possível cadastrar o livro"
- Verifique se o backend está rodando em `http://localhost:5000`
- Verifique se todos os campos estão preenchidos corretamente
- Abra o console do navegador (F12) para ver erros mais detalhados

### Erro: "Não há livros cadastrados" no select de empréstimos
- Primeiro, cadastre livros na seção "Livros"
- Depois, cadastre usuários na seção "Usuários"
- Após isso, o select de empréstimos será preenchido automaticamente

### Gráfico não aparece
- Certifique-se que o Chart.js está carregado (verifique a tag script)
- Recarregue a página (Ctrl+F5 ou Cmd+Shift+R)

---
## 📷 Dashboard do Sistema

![Dashboard](printdashboard.png)

---

## 📚 Exemplo de Uso

1. **Acesse o dashboard**: `http://localhost:5000`
2. **Navegue até "Livros"** e cadastre um livro
3. **Navegue até "Usuários"** e cadastre um usuário
4. **Navegue até "Empréstimos"** e crie um empréstimo selecionando o livro e usuário
5. **Volte ao Dashboard** para ver o gráfico atualizado

---

## 👨‍💻 Autor

Desenvolvido como projeto de aprendizado de CRUD com Flask e JavaScript Vanilla.

---

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

**Última atualização**: 29 de Maio de 2026
