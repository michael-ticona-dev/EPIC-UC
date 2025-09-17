from flask import Blueprint

route_juegos = Blueprint("route_juegos", __name__, url_prefix="/api/route_juegos")

@route_juegos.route("/", methods=["GET"])
def get_juegos():
    return {"mensaje": "Lista de juegos"}
