from flask import Blueprint

route_logros = Blueprint("route_logros", __name__, url_prefix="/api/route_logros")

@route_logros.route("/", methods=["GET"])
def get_logros():
    return {"mensaje": "Lista de logros"}
