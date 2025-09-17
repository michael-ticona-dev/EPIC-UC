from flask import Flask

from backend.rutas.route_amigos import route_amigos
from backend.rutas.route_biblioteca_usuario import route_biblioteca_usuario
from backend.rutas.route_carrito_compras import route_carrito_compras
from backend.rutas.route_categorias import route_categorias
from backend.rutas.route_contenido_adicional import route_contenido_adicional
from backend.rutas.route_historial_precios import route_historial_precios
from backend.rutas.route_juego_categorias import route_juego_categorias
from backend.rutas.route_juegos import route_juegos
from backend.rutas.route_logros import route_logros
from backend.rutas.route_movimientos_saldo import route_movimientos_saldo
from backend.rutas.route_notificaciones import route_notificaciones
from backend.rutas.route_orden_detalles import route_orden_detalles
from backend.rutas.route_ordenes import route_ordenes
from backend.rutas.route_promociones import route_promociones
from backend.rutas.route_reseñas import route_reseñas
from backend.rutas.route_sesiones_juego import route_sesiones_juego
from backend.rutas.route_tokens_verificacion import route_tokens_verificacion
from backend.rutas.route_usuario_contenido_adicional import route_usuario_contenido_adicional
from backend.rutas.route_usuario_logros import route_usuario_logros
from backend.rutas.route_usuarios import route_usuarios
from backend.rutas.route_wishlist_deseos import route_wishlist_deseos

def rutas(app: Flask):
    app.register_blueprint(route_amigos)
    app.register_blueprint(route_biblioteca_usuario)
    app.register_blueprint(route_carrito_compras)
    app.register_blueprint(route_categorias)
    app.register_blueprint(route_contenido_adicional)
    app.register_blueprint(route_historial_precios)
    app.register_blueprint(route_juego_categorias)
    app.register_blueprint(route_juegos)
    app.register_blueprint(route_logros)
    app.register_blueprint(route_movimientos_saldo)
    app.register_blueprint(route_notificaciones)
    app.register_blueprint(route_orden_detalles)
    app.register_blueprint(route_ordenes)
    app.register_blueprint(route_promociones)
    app.register_blueprint(route_reseñas)
    app.register_blueprint(route_sesiones_juego)
    app.register_blueprint(route_tokens_verificacion)
    app.register_blueprint(route_usuario_contenido_adicional)
    app.register_blueprint(route_usuario_logros)
    app.register_blueprint(route_usuarios)
    app.register_blueprint(route_wishlist_deseos)
