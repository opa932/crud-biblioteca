from repositories.emprestimo_repository import *

def listar():

    return listar_emprestimos()

def cadastrar(emprestimo):

    cadastrar_emprestimo(emprestimo)

def deletar(id):

    deletar_emprestimo(id)

def atualizar(id, emprestimo):

    atualizar_emprestimo(id, emprestimo)