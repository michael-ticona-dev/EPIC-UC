from flask import Blueprint

route_categorias = Blueprint("route_categorias", __name__, url_prefix="/api/route_categorias")

@route_categorias.route("/", methods=["GET"])
def get_categorias():
    return {"mensaje": "Lista de categorias"}
