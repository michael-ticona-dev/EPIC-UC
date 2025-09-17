from flask import Blueprint

route_biblioteca_usuario = Blueprint("route_biblioteca_usuario", __name__, url_prefix="/api/route_biblioteca_usuario")

@route_biblioteca_usuario.route("/", methods=["GET"])
def get_biblioteca_usuario():
    return {"mensaje": "Lista de biblioteca_usuario"}

