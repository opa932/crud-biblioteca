from config.database import conectar

# =========================
# LISTAR
# =========================

def listar_emprestimos():

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        SELECT
            emprestimos.id,
            usuarios.nome AS usuario,
            livros.titulo AS livro,
            emprestimos.data_emprestimo,
            emprestimos.data_devolucao,
            emprestimos.status
        FROM emprestimos
        INNER JOIN usuarios
            ON usuarios.id = emprestimos.usuario_id
        INNER JOIN livros
            ON livros.id = emprestimos.livro_id
    """)

    emprestimos = [dict(item) for item in cursor.fetchall()]

    conexao.close()

    return emprestimos

# =========================
# CADASTRAR
# =========================

def cadastrar_emprestimo(emprestimo):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        INSERT INTO emprestimos (
            usuario_id,
            livro_id,
            data_emprestimo,
            data_devolucao,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        emprestimo["usuario_id"],
        emprestimo["livro_id"],
        emprestimo["data_emprestimo"],
        emprestimo["data_devolucao"],
        emprestimo["status"]
    ))

    conexao.commit()

    conexao.close()

# =========================
# DELETAR
# =========================

def deletar_emprestimo(id):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM emprestimos WHERE id = ?",
        (id,)
    )

    conexao.commit()

    conexao.close()

# =========================
# ATUALIZAR
# =========================

def atualizar_emprestimo(id, emprestimo):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        UPDATE emprestimos
        SET
            usuario_id = ?,
            livro_id = ?,
            data_emprestimo = ?,
            data_devolucao = ?,
            status = ?
        WHERE id = ?
    """, (
        emprestimo["usuario_id"],
        emprestimo["livro_id"],
        emprestimo["data_emprestimo"],
        emprestimo["data_devolucao"],
        emprestimo["status"],
        id
    ))

    conexao.commit()

    conexao.close()