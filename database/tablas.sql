-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    fecha_nacimiento DATE,
    saldo DECIMAL(10, 2) DEFAULT 0.00,
    avatar_url VARCHAR(255),
    rol VARCHAR(20) DEFAULT 'usuario' CHECK (rol IN ('usuario', 'admin', 'moderador')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP,
    verificado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de juegos
CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    precio_descuento DECIMAL(10, 2),
    fecha_lanzamiento DATE,
    desarrollador VARCHAR(100),
    editor VARCHAR(100),
    clasificacion_edad VARCHAR(5),
    valoracion_promedio DECIMAL(3, 2) DEFAULT 0.00,
    num_valoraciones INTEGER DEFAULT 0,
    miniatura_url VARCHAR(255),
    portada_url VARCHAR(255),
    trailer_url VARCHAR(255),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50)
);

-- Tabla de relación juegos-categorías (muchos a muchos)
CREATE TABLE juego_categorias (
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE CASCADE,
    PRIMARY KEY (juego_id, categoria_id)
);

-- Tabla de biblioteca de usuarios (juegos adquiridos)
CREATE TABLE biblioteca_usuario (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    fecha_adquisicion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    horas_jugadas DECIMAL(10, 2) DEFAULT 0.00,
    ultimo_jugado TIMESTAMP,
    favorito BOOLEAN DEFAULT FALSE,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de wishlist (deseos)
CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de carrito de compras
CREATE TABLE carrito_compras (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de órdenes/transacciones
CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    impuestos DECIMAL(10, 2) DEFAULT 0.00,
    metodo_pago VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completada', 'fallida', 'reembolsada')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completacion TIMESTAMP
);

-- Tabla de detalles de órdenes
CREATE TABLE orden_detalles (
    id SERIAL PRIMARY KEY,
    orden_id INTEGER REFERENCES ordenes(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    precio DECIMAL(10, 2) NOT NULL,
    descuento DECIMAL(10, 2) DEFAULT 0.00
);

-- Tabla de reseñas y valoraciones
CREATE TABLE reseñas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    valoracion INTEGER CHECK (valoracion >= 1 AND valoracion <= 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP,
    aprobada BOOLEAN DEFAULT FALSE,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de promociones/descuentos
CREATE TABLE promociones (
    id SERIAL PRIMARY KEY,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    porcentaje_descuento INTEGER CHECK (porcentaje_descuento >= 0 AND porcentaje_descuento <= 100),
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de logros
CREATE TABLE logros (
    id SERIAL PRIMARY KEY,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    icono_url VARCHAR(255),
    rareza VARCHAR(20) DEFAULT 'comun' CHECK (rareza IN ('comun', 'raro', 'epico', 'legendario'))
);

-- Tabla de logros desbloqueados por usuarios
CREATE TABLE usuario_logros (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    logro_id INTEGER REFERENCES logros(id) ON DELETE CASCADE,
    fecha_desbloqueo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, logro_id)
);

-- Tabla de sesiones de juego
CREATE TABLE sesiones_juego (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    inicio_sesion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fin_sesion TIMESTAMP,
    duracion_minutos INTEGER
);

-- Tabla de amigos (con restricción mejorada para evitar duplicados bidireccionales)
CREATE TABLE amigos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    amigo_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_amistad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aceptada', 'rechazada')),
    UNIQUE(usuario_id, amigo_id)
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    url_destino VARCHAR(255)
);

-- Tabla de tokens de verificación
CREATE TABLE tokens_verificacion (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('verificacion', 'recuperacion')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion TIMESTAMP NOT NULL,
    utilizado BOOLEAN DEFAULT FALSE
);

-- Tabla de historial de precios
CREATE TABLE historial_precios (
    id SERIAL PRIMARY KEY,
    juego_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de contenido adicional (DLCs)
CREATE TABLE contenido_adicional (
    id SERIAL PRIMARY KEY,
    juego_base_id INTEGER REFERENCES juegos(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_lanzamiento DATE,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de relación usuarios-contenido adicional
CREATE TABLE usuario_contenido_adicional (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    contenido_id INTEGER REFERENCES contenido_adicional(id) ON DELETE CASCADE,
    fecha_adquisicion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, contenido_id)
);

-- Tabla de movimientos de saldo (NUEVA)
CREATE TABLE movimientos_saldo (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    monto DECIMAL(10,2) NOT NULL,
    tipo VARCHAR(20) CHECK (tipo IN ('recarga','compra','reembolso', 'venta')),
    descripcion VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_nombre_usuario ON usuarios(nombre_usuario);
CREATE INDEX idx_juegos_titulo ON juegos(titulo);
CREATE INDEX idx_juegos_precio ON juegos(precio);
CREATE INDEX idx_juegos_fecha_lanzamiento ON juegos(fecha_lanzamiento);
CREATE INDEX idx_biblioteca_usuario_id ON biblioteca_usuario(usuario_id);
CREATE INDEX idx_ordenes_usuario_id ON ordenes(usuario_id);
CREATE INDEX idx_ordenes_fecha_creacion ON ordenes(fecha_creacion);
CREATE INDEX idx_reseñas_juego_id ON reseñas(juego_id);
CREATE INDEX idx_promociones_juego_id ON promociones(juego_id);
CREATE INDEX idx_promociones_activa ON promociones(activa);
CREATE INDEX idx_movimientos_saldo_usuario_id ON movimientos_saldo(usuario_id);
CREATE INDEX idx_movimientos_saldo_fecha ON movimientos_saldo(fecha);

-- Función para evitar amistades duplicadas bidireccionales
CREATE OR REPLACE FUNCTION check_amistad_duplicada()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM amigos 
        WHERE (usuario_id = NEW.usuario_id AND amigo_id = NEW.amigo_id)
        OR (usuario_id = NEW.amigo_id AND amigo_id = NEW.usuario_id)
    ) THEN
        RAISE EXCEPTION 'La amistad ya existe entre estos usuarios';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_amistad_duplicada
    BEFORE INSERT ON amigos
    FOR EACH ROW
    EXECUTE FUNCTION check_amistad_duplicada();

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (id, nombre_usuario, email, contrasena_hash, nombre, apellido, rol, verificado, saldo)
VALUES 
(1, 'michael', 'michael@epic-uc.com', '$2b$12$4V3/5J6K7L8M9N0O1P2Q3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w', 'Michael', 'Admin', 'admin', TRUE, 1000.00)
ON CONFLICT (id) DO NOTHING;

-- Insertar categorías de ejemplo
INSERT INTO categorias (nombre, descripcion, icono) VALUES
('Acción', 'Juegos de acción y aventura', 'action-icon'),
('Aventura', 'Juegos de exploración y puzzles', 'adventure-icon'),
('RPG', 'Juegos de rol', 'rpg-icon'),
('Estrategia', 'Juegos de estrategia', 'strategy-icon'),
('Deportes', 'Juegos deportivos', 'sports-icon'),
('Shooter', 'Juegos de disparos en primera persona', 'shooter-icon'),
('Indie', 'Juegos independientes', 'indie-icon')
ON CONFLICT (nombre) DO NOTHING;

-- Asegurar que la secuencia de IDs comience después del usuario administrador
SELECT setval('usuarios_id_seq', COALESCE((SELECT MAX(id) FROM usuarios), 0) + 1);