EPIC-UC/                       # Carpeta raíz del proyecto
├── public/                    # Archivos públicos accesibles desde la web
│   ├── index.html             # Contenedor principal (<div id="root"></div>)
│   ├── favicon.ico            # Icono de la aplicación
│   ├── manifest.json          # Configuración PWA
│   └── assets/                # Recursos estáticos públicos
│       ├── images/            # Carpeta de imágenes públicas
│       ├── icons/             # Íconos para la app (favicon, app icons, etc.)
│       └── logos/             # Logos oficiales del proyecto
├── src/                       # Código fuente principal (frontend React)
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/                # Botones, inputs, modales, etc. (UI components)
│   │   ├── layout/            # Navbar, Sidebar, Footer, Layout general
│   │   ├── games/             # Componentes relacionados con juegos (cards, detalles)
│   │   ├── store/             # Carrito, checkout, promos
│   │   ├── user/              # Perfil de usuario, login, registro
│   │   ├── admin/             # Panel de administrador (CRUD, dashboard)
│   │   └── index.js           # Export centralizado de componentes
│   ├── pages/                 # Vistas / páginas principales
│   │   ├── public/            # Páginas públicas (Home, About, Contact, Login, Register)
│   │   ├── user/              # Páginas privadas del usuario (Biblioteca, Wishlist, Perfil)
│   │   ├── admin/             # Páginas exclusivas del admin (Dashboard, Gestión de juegos, Usuarios)
│   │   └── index.js           # Export centralizado de páginas
│   ├── contexts/              # React Contexts (AuthContext, ThemeContext, etc.)
│   ├── hooks/                 # Custom Hooks (useAuth, useFetch, useCart, etc.)
│   ├── services/              # Llamadas a API / servicios (axios/fetch)
│   ├── utils/                 # Funciones helper reutilizables
│   ├── constants/             # Constantes globales (roles, endpoints, configs)
│   ├── assets/                # Recursos internos del frontend
│   │   ├── styles/            # Archivos CSS/SCSS globales
│   │   ├── images/            # Imágenes locales (ej: logos pequeños, backgrounds)
│   │   └── fonts/             # Fuentes personalizadas
│   ├── types/                 # Tipos TS (si usas TypeScript, ej: interfaces, DTOs)
│   ├── tests/                 # Tests unitarios y de integración (frontend)
│   ├── stories/               # Storybook (documentación de componentes UI)
│   ├── config/                # Configuración de rutas, API baseURL, theme
│   ├── App.jsx                # Componente principal de React
│   ├── App.css                # Estilos globales de la App
│   ├── index.jsx              # Punto de entrada React (ReactDOM.render / createRoot)
│   ├── index.css              # Estilos base / reset CSS
│   └── reportWebVitals.js     # Métricas de rendimiento
├── server/                    # Backend con Node.js / Express
│   ├── server.js              # Punto de entrada del servidor
│   ├── routes/                # Definición de rutas API (users, games, orders)
│   ├── controllers/           # Lógica de negocio (controladores)
│   ├── models/                # Modelos de datos (sequelize / prisma / raw SQL)
│   ├── middlewares/           # Middlewares (auth, validaciones, rate-limit)
│   └── config/                # Configuración del servidor (db, env, logger)
├── database/                  # Configuración y scripts de la base de datos PostgreSQL
│   ├── config.js              # Configuración de conexión a PostgreSQL
│   ├── migrations/            # Migraciones (estructura de tablas)
│   ├── seeders/               # Datos iniciales (usuarios admin, juegos demo)
│   └── queries.sql            # Consultas SQL directas (debug, scripts)
├── tests/                     # Tests backend (supertest, jest)
├── .gitignore                 # Archivos a ignorar en Git
├── package.json               # Dependencias y scripts del proyecto
├── package-lock.json          # Versión bloqueada de dependencias
├── vite.config.js             # Configuración de Vite (bundler frontend)
├── jest.config.js             # Configuración de Jest (tests frontend/backend)
└── README.md                  # Documentación del proyecto
