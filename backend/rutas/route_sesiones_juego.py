from flask import Blueprint

route_sesiones_juego = Blueprint("route_sesiones_juego", __name__, url_prefix="/api/route_sesiones_juego")

@route_sesiones_juego.route("/", methods=["GET"])
def get_sesiones_juego():
    return {"mensaje": "Lista de sesiones_juego"}
