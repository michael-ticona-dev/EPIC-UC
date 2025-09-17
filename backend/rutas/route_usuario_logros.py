from flask import Blueprint

route_usuario_logros = Blueprint("route_usuario_logros", __name__, url_prefix="/api/route_usuario_logros")

@route_usuario_logros.route("/", methods=["GET"])
def get_usuario_logros():
    return {"mensaje": "Lista de usuario_logros"}
