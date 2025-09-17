from flask import Blueprint

route_historial_precios = Blueprint("route_historial_precios", __name__, url_prefix="/api/route_historial_precios")

@route_historial_precios.route("/", methods=["GET"])
def get_historial_precios():
    return {"mensaje": "Lista de historial_precios"}
