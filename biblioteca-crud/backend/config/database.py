import sqlite3
from pathlib import Path

DATABASE = Path(__file__).resolve().parent.parent / "database" / "biblioteca.db"

def conectar():

    conexao = sqlite3.connect(DATABASE)

    conexao.row_factory = sqlite3.Row

    return conexao