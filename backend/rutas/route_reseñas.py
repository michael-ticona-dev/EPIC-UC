from flask import Blueprint

route_reseñas = Blueprint("route_reseñas", __name__, url_prefix="/api/route_reseñas")

@route_reseñas.route("/", methods=["GET"])
def get_reseñas():
    return {"mensaje": "Lista de reseñas"}
