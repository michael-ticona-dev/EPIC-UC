from flask import Blueprint

route_amigos = Blueprint("route_amigos", __name__, url_prefix="/api/route_amigos")

@route_amigos.route("/", methods=["GET"])
def get_amigos():
    print("correcto")
    return {"mensaje": "Lista de amigos"}
