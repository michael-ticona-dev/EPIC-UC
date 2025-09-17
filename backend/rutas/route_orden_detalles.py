from flask import Blueprint

route_orden_detalles = Blueprint("route_orden_detalles", __name__, url_prefix="/api/route_orden_detalles")

@route_orden_detalles.route("/", methods=["GET"])
def get_orden_detalles():
    return {"mensaje": "Lista de orden_detalles"}
