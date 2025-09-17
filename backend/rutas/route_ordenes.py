from flask import Blueprint

route_ordenes = Blueprint("route_ordenes", __name__, url_prefix="/api/route_ordenes")

@route_ordenes.route("/", methods=["GET"])
def get_ordenes():
    return {"mensaje": "Lista de ordenes"}
