import os
from flask import Flask
from flask_cors import CORS

from routes.livro_routes import livro_bp
from routes.usuario_routes import usuario_bp
from routes.emprestimo_routes import emprestimo_bp

frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")

app = Flask(__name__, static_folder=frontend_dir, static_url_path="")

CORS(app)

app.register_blueprint(livro_bp)
app.register_blueprint(usuario_bp)
app.register_blueprint(emprestimo_bp)

@app.route("/")
def index():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(debug=True)