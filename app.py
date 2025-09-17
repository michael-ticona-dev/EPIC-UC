import os
import socket
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

# =========================
# FUNCIÓN PARA ENCONTRAR PUERTO LIBRE
# =========================
def obtener_puerto_libre(puerto_inicial=5000):
    puerto = puerto_inicial
    while True:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("0.0.0.0", puerto))
                return puerto
            except OSError:
                puerto += 1  # intenta con el siguiente

# =========================
# EJECUCIÓN DEL SERVIDOR
# =========================
if __name__ == "__main__":
    puerto = obtener_puerto_libre(5000)

    print("=" * 50)
    print("🚀 Iniciando Servidor Flask")
    print("=" * 50)
    print(f"📁 Carpeta base: {CARPETA_BASE}")
    print(f"🌐 Frontend: {CARPETA_FRONTEND}")
    print(f"📂 Public: {CARPETA_PUBLICA}")
    print("=" * 50)
    print("🌐 Servidor disponible en:")
    print(f"   - Local: http://localhost:{puerto}")
    print(f"   - Red:   http://0.0.0.0:{puerto}")
    print("=" * 50)

    app.run(host="0.0.0.0", port=puerto, debug=True, use_reloader=False)
