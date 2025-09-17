from flask import Blueprint

route_carrito_compras = Blueprint("route_carrito_compras", __name__, url_prefix="/api/route_carrito_compras")

@route_carrito_compras.route("/", methods=["GET"])
def get_carrito_compras():
    return {"mensaje": "Lista de carrito_compras"}