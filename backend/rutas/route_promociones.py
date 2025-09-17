from flask import Blueprint

route_promociones = Blueprint("route_promociones", __name__, url_prefix="/api/route_promociones")

@route_promociones.route("/", methods=["GET"])
def get_promociones():
    return {"mensaje": "Lista de promociones"}
