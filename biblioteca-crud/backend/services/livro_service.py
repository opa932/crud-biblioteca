from repositories.livro_repository import *

def listar():

    return listar_livros()


def cadastrar(livro):

    cadastrar_livro(livro)


def deletar(id):

    deletar_livro(id)


def atualizar(id, livro):

    atualizar_livro(id, livro)