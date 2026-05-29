from config.database import conectar

def listar_usuarios():

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("SELECT * FROM usuarios")

    usuarios = [dict(usuario) for usuario in cursor.fetchall()]

    conexao.close()

    return usuarios


def cadastrar_usuario(usuario):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        INSERT INTO usuarios
        (nome, email, telefone, endereco)
        VALUES (?, ?, ?, ?)
    """, (
        usuario["nome"],
        usuario["email"],
        usuario["telefone"],
        usuario["endereco"]
    ))

    conexao.commit()

    conexao.close()


def deletar_usuario(id):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("DELETE FROM usuarios WHERE id = ?", (id,))

    conexao.commit()

    conexao.close()


def atualizar_usuario(id, usuario):

    conexao = conectar()

    cursor = conexao.cursor()

    cursor.execute("""
        UPDATE usuarios
        SET nome = ?,
            email = ?,
            telefone = ?,
            endereco = ?
        WHERE id = ?
    """, (
        usuario["nome"],
        usuario["email"],
        usuario["telefone"],
        usuario["endereco"],
        id
    ))

    conexao.commit()

    conexao.close()