from flask import Blueprint

route_usuarios = Blueprint("route_usuarios", __name__, url_prefix="/api/route_usuarios")

@route_usuarios.route("/", methods=["GET"])
def get_usuarios():
    return {"mensaje": "Lista de usuarios"}
