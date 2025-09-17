from flask import Blueprint

route_notificaciones = Blueprint("route_notificaciones", __name__, url_prefix="/api/route_notificaciones")

@route_notificaciones.route("/", methods=["GET"])
def get_notificaciones():
    return {"mensaje": "Lista de notificaciones"}
