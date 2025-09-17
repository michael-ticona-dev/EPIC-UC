from flask import Blueprint

route_juego_categorias = Blueprint("route_juego_categorias", __name__, url_prefix="/api/route_juego_categorias")

@route_juego_categorias.route("/", methods=["GET"])
def get_juego_categorias():
    return {"mensaje": "Lista de juego_categorias"}
