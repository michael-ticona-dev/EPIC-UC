from flask import Blueprint

route_contenido_adicional = Blueprint("route_contenido_adicional", __name__, url_prefix="/api/route_contenido_adicional")

@route_contenido_adicional.route("/", methods=["GET"])
def get_contenido_adicional():
    return {"mensaje": "Lista de contenido_adicional"}
