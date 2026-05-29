from flask import Blueprint, jsonify, request

from services.emprestimo_service import *

emprestimo_bp = Blueprint(
    "emprestimo_bp",
    __name__
)

# =========================
# LISTAR
# =========================

@emprestimo_bp.route(
    "/emprestimos",
    methods=["GET"]
)
def listar_emprestimos_route():

    emprestimos = listar()

    return jsonify(emprestimos)

# =========================
# CADASTRAR
# =========================

@emprestimo_bp.route(
    "/emprestimos",
    methods=["POST"]
)
def cadastrar_emprestimo_route():

    dados = request.json

    cadastrar(dados)

    return jsonify({
        "mensagem": "Empréstimo cadastrado com sucesso"
    })

# =========================
# DELETAR
# =========================

@emprestimo_bp.route(
    "/emprestimos/<int:id>",
    methods=["DELETE"]
)
def deletar_emprestimo_route(id):

    deletar(id)

    return jsonify({
        "mensagem": "Empréstimo deletado com sucesso"
    })

# =========================
# ATUALIZAR
# =========================

@emprestimo_bp.route(
    "/emprestimos/<int:id>",
    methods=["PUT"]
)
def atualizar_emprestimo_route(id):

    dados = request.json

    atualizar(id, dados)

    return jsonify({
        "mensagem": "Empréstimo atualizado com sucesso"
    })