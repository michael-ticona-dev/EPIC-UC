from flask import Blueprint

route_usuario_contenido_adicional = Blueprint("route_usuario_contenido_adicional", __name__, url_prefix="/api/route_usuario_contenido_adicional")

@route_usuario_contenido_adicional.route("/", methods=["GET"])
def get_usuario_contenido_adicional():
    return {"mensaje": "Lista de usuario_contenido_adicional"}
