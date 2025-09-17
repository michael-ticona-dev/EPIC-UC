from flask import Blueprint

route_movimientos_saldo = Blueprint("route_movimientos_saldo", __name__, url_prefix="/api/route_movimientos_saldo")

@route_movimientos_saldo.route("/", methods=["GET"])
def get_movimientos_saldo():
    return {"mensaje": "Lista de movimientos_saldo"}
