EPIC-UC - Plataforma de Videojuegos

🎮 Descripción del Proyecto
EPIC-UC es una plataforma digital de videojuegos inspirada en Epic Games Store, desarrollada específicamente para ejecutarse en Ubuntu Linux.
Este proyecto incluye un frontend atractivo y responsive construido con React, un backend eficiente con Node.js/Express, y una base de datos PostgreSQL optimizada para hardware de consumo moderado, asegurando rendimiento y estabilidad.

Desarrollado por Michael Ticona, esta plataforma demuestra cómo crear una tienda de videojuegos completa y optimizada, tomando en cuenta buenas prácticas de escalabilidad y eficiencia.

✨ Características Principales

🎮 Catálogo de Juegos

Interfaz visual atractiva con cards de juegos
Sistema de categorías y etiquetas
Búsqueda y filtrado avanzado
Galería de imágenes para cada juego
Sistema de calificaciones y reseñas

👤 Gestión de Usuarios

Reistro y autenticación segura

Perfiles de usuario personalizables
Biblioteca de juegos adquiridos
Lista de deseos (wishlist)
Historial de transacciones

🛒 Sistema de Compras

Carrito de compras funcional
Proceso de checkout simplificado
Gestión de métodos de pago (simulado)
Sistema de promociones y descuentos

⚙️ Panel de Administración

CRUD completo para juegos
Gestión de usuarios y permisos
Dashboard con métricas y estadísticas
Gestión de órdenes y transacciones

✨ Modos de Acceso según Roles

Esta plataforma incluye dos vistas principales, dependiendo de los permisos del usuario:

🔹 Administrador

Manejo completo del sistema
Gestión de usuarios (crear, editar, eliminar, asignar permisos)
Administración de catálogo de juegos (alta, baja, modificación)
Visualización de gráficas y métricas en tiempo real
Control de reseñas y reportes de usuarios

🔹 Usuario normal

Navegar y visualizar el catálogo de juegos
Crear y administrar su cuenta personal
Acceder a su biblioteca de juegos adquiridos
Editar su perfil
Publicar reseñas en los juegos
Dar like a comentarios y participar en la comunidad

🛠️ Stack Tecnológico Optimizado para Ubuntu Linux

🔹 Frontend

React 18 con hooks optimizados
CSS puro con diseño responsive (sin frameworks pesados)
Context API para gestión de estado ligera
React Router para navegación
Imágenes optimizadas y lazy loading

🔹 Backend (Node.js/Express)

Express.js con compresión GZIP
JWT para autenticación stateless
Bcrypt con salt rounds ajustados para rendimiento
Helmet.js para seguridad
Rate limiting para prevenir sobrecarga

🔹 Base de Datos

PostgreSQL con configuración optimizada para Ubuntu
Índices estratégicos para mejorar rendimiento
Consultas optimizadas para bajo consumo de recursos
Pool de conexiones ajustado

🔹 Optimizaciones Específicas para Ubuntu Linux

Compresión de assets para reducir transferencia
Cache estratégico en múltiples niveles
Logs optimizados para evitar sobrecarga de disco
Monitoreo de recursos para mantener estabilidad

🔹 Instalación
Python
PostgreSQL
pip install -r requirements.txt
