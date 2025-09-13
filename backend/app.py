import os
from flask import Flask, send_from_directory, jsonify

# =========================
# CONFIGURACIÓN DE RUTAS ESTÁTICAS (FRONTEND)
# ===================

CARPETA_BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CARPETA_FRONTEND = os.path.join(CARPETA_BASE, "frontend")
CARPETA_PUBLICA = os.path.join(CARPETA_FRONTEND, "public")

app = Flask(__name__, static_folder=None)

@app.route("/")
def ruta_principal():
    return send_from_directory(CARPETA_PUBLICA, "panel-principal.html")

@app.route("/<path:ruta>")
def servir_frontend(ruta):
    ruta_completa = os.path.join(CARPETA_FRONTEND, ruta)

    if os.path.isfile(ruta_completa):
        directorio = os.path.dirname(ruta_completa)
        archivo = os.path.basename(ruta_completa)
        return send_from_directory(directorio, archivo)

    return send_from_directory(CARPETA_PUBLICA, "panel-principal.html")

# =========================
# EJECUCIÓN DEL SERVIDOR
# =========================
if __name__ == "__main__":
    # host="0.0.0.0" → accesible en red local
    # port=5000 → puerto por defecto
    # debug=True → reinicia automáticamente al detectar cambios
    app.run(host="0.0.0.0", port=5000, debug=True)
