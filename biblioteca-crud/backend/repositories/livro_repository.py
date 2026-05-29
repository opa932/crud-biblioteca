from config.database import conectar

def listar_livros():

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM livros")

    livros = [dict(livro) for livro in cursor.fetchall()]

    conexao.close()

    return livros


def cadastrar_livro(livro):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        INSERT INTO livros
        (titulo, autor, categoria, ano, quantidade)
        VALUES (?, ?, ?, ?, ?)
    """, (
        livro["titulo"],
        livro["autor"],
        livro["categoria"],
        livro["ano"],
        livro["quantidade"]
    ))

    conexao.commit()

    conexao.close()


def deletar_livro(id):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("DELETE FROM livros WHERE id = ?", (id,))

    conexao.commit()

    conexao.close()


def atualizar_livro(id, livro):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        UPDATE livros
        SET titulo = ?,
            autor = ?,
            categoria = ?,
            ano = ?,
            quantidade = ?
        WHERE id = ?
    """, (
        livro["titulo"],
        livro["autor"],
        livro["categoria"],
        livro["ano"],
        livro["quantidade"],
        id
    ))

    conexao.commit()

    conexao.close()