from flask import Blueprint

route_wishlist_deseos = Blueprint("route_wishlist_deseos", __name__, url_prefix="/api/route_wishlist_deseos")

@route_wishlist_deseos.route("/", methods=["GET"])
def get_wishlist_deseos():
    return {"mensaje": "Lista de wishlist_deseos"}
