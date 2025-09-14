import os
from flask import Flask, send_from_directory

# =========================
# CONFIGURACIÓN DE RUTAS ESTÁTICAS (FRONTEND)
# =========================

# Directorio base = carpeta raíz del proyecto
CARPETA_BASE = os.path.abspath(os.path.dirname(__file__))

# Carpeta frontend/public (donde está index.html, favicon, manifest, etc.)
CARPETA_FRONTEND = os.path.join(CARPETA_BASE, "frontend")
CARPETA_PUBLICA = os.path.join(CARPETA_FRONTEND, "public")

app = Flask(__name__, static_folder=None)

@app.route("/")
def ruta_principal():
    """Sirve el archivo principal del frontend"""
    return send_from_directory(CARPETA_PUBLICA, "panel-principal.html")

@app.route("/<path:ruta>")
def servir_frontend(ruta):
    """Sirve cualquier archivo dentro del frontend"""
    ruta_completa = os.path.join(CARPETA_FRONTEND, ruta)

    if os.path.isfile(ruta_completa):
        directorio = os.path.dirname(ruta_completa)
        archivo = os.path.basename(ruta_completa)
        return send_from_directory(directorio, archivo)

    # Si no encuentra el archivo, vuelve al index.html (para SPA)
    return send_from_directory(CARPETA_PUBLICA, "panel-principal.html")

# =========================
# EJECUCIÓN DEL SERVIDOR
# =========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
