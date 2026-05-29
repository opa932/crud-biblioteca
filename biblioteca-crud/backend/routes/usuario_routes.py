from flask import Blueprint, jsonify, request

from services.usuario_service import *

usuario_bp = Blueprint("usuario_bp", __name__)

# =========================
# LISTAR
# =========================

@usuario_bp.route("/usuarios", methods=["GET"])
def listar_usuarios_route():

    usuarios = listar()

    return jsonify(usuarios)

# =========================
# CADASTRAR
# =========================

@usuario_bp.route("/usuarios", methods=["POST"])
def cadastrar_usuario_route():

    dados = request.json

    cadastrar(dados)

    return jsonify({
        "mensagem": "Usuário cadastrado com sucesso"
    })

# =========================
# DELETAR
# =========================

@usuario_bp.route("/usuarios/<int:id>", methods=["DELETE"])
def deletar_usuario_route(id):

    deletar(id)

    return jsonify({
        "mensagem": "Usuário deletado com sucesso"
    })

# =========================
# ATUALIZAR
# =========================

@usuario_bp.route("/usuarios/<int:id>", methods=["PUT"])
def atualizar_usuario_route(id):

    dados = request.json

    atualizar(id, dados)

    return jsonify({
        "mensagem": "Usuário atualizado com sucesso"
    })