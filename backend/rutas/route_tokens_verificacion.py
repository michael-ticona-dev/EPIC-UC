from flask import Blueprint

route_tokens_verificacion = Blueprint("route_tokens_verificacion", __name__, url_prefix="/api/route_tokens_verificacion")

@route_tokens_verificacion.route("/", methods=["GET"])
def get_tokens_verificacion():
    return {"mensaje": "Lista de tokens_verificacion"}
