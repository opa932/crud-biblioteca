from repositories.usuario_repository import *

def listar():

    return listar_usuarios()


def cadastrar(usuario):

    cadastrar_usuario(usuario)


def deletar(id):

    deletar_usuario(id)


def atualizar(id, usuario):

    atualizar_usuario(id, usuario)