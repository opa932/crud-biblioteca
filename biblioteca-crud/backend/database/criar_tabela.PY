import sqlite3
from pathlib import Path

DATABASE = Path(__file__).resolve().parent / "biblioteca.db"
conexao = sqlite3.connect(DATABASE)

cursor = conexao.cursor()

# =========================
# TABELA LIVROS
# =========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS livros (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    titulo TEXT NOT NULL,

    autor TEXT NOT NULL,

    categoria TEXT,

    ano INTEGER,

    quantidade INTEGER
)
""")

# =========================
# TABELA USUÁRIOS
# =========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL,

    email TEXT UNIQUE,

    telefone TEXT,

    endereco TEXT
)
""")

# =========================
# TABELA EMPRÉSTIMOS
# =========================

cursor.execute("""
CREATE TABLE IF NOT EXISTS emprestimos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    usuario_id INTEGER NOT NULL,

    livro_id INTEGER NOT NULL,

    data_emprestimo TEXT NOT NULL,

    data_devolucao TEXT NOT NULL,

    status TEXT DEFAULT 'Emprestado',

    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),

    FOREIGN KEY(livro_id) REFERENCES livros(id)
)
""")

conexao.commit()

print("Banco criado com sucesso!")

conexao.close()