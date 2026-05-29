from flask import Blueprint, jsonify, request

from services.livro_service import *

livro_bp = Blueprint("livro_bp", __name__)

# =========================
# LISTAR
# =========================

@livro_bp.route("/livros", methods=["GET"])
def listar_livros_route():

    livros = listar()

    return jsonify(livros)

# =========================
# CADASTRAR
# =========================

@livro_bp.route("/livros", methods=["POST"])
def cadastrar_livro_route():

    dados = request.json

    cadastrar(dados)

    return jsonify({
        "mensagem": "Livro cadastrado com sucesso"
    })

# =========================
# DELETAR
# =========================

@livro_bp.route("/livros/<int:id>", methods=["DELETE"])
def deletar_livro_route(id):

    deletar(id)

    return jsonify({
        "mensagem": "Livro deletado com sucesso"
    })

# =========================
# ATUALIZAR
# =========================

@livro_bp.route("/livros/<int:id>", methods=["PUT"])
def atualizar_livro_route(id):

    dados = request.json

    atualizar(id, dados)

    return jsonify({
        "mensagem": "Livro atualizado com sucesso"
    })