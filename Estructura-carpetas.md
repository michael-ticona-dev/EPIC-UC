EPIC-UC/                          
├── frontend/                     
│   ├── public/                   
│   │   ├── index.html            
│   │   ├── favicon.ico           
│   │   └── manifest.json         
│   ├── src/                      
│   │   ├── componentes/          # Componentes reutilizables
│   │   │   ├── public/           # css y js de los .html
│   │   │   ├── ui/               # Botones, inputs, modales, etc.
│   │   │   ├── layout/           # Navbar, Sidebar, Footer, Layout general
│   │   │   ├── juegos/           # Componentes relacionados con juegos
│   │   │   ├── tienda/           # Carrito, checkout, promos
│   │   │   ├── usuario/          # Perfil, login, registro
│   │   │   └── admin/            # Panel de administración
│   │   ├── paginas/              # Páginas principales
│   │   │   ├── publicas/         # Home, About, Contact, Login, Register
│   │   │   ├── usuario/          # Biblioteca, Wishlist, Perfil
│   │   │   └── admin/            # Dashboard, Gestión de juegos, Usuarios
│   │   ├── contextos/            # Contextos de React (AuthContext, ThemeContext, etc.)
│   │   ├── servicios/            # Llamadas al backend Flask (axios/fetch)
│   │   ├── utilidades/           # Funciones helper reutilizables
│   │   ├── constantes/           # Constantes globales (roles, endpoints, configs)
│   │   ├── global/               # Archivos globales
│   │   │   ├── css/              # Estilos globales compartidos
│   │   │   │   ├── reset.css
│   │   │   │   ├── variables.css
│   │   │   │   └── global.css
│   │   │   └── js/               # Scripts globales
│   │   │       ├── helpers.js
│   │   │       └── validaciones.js            
│
├── backend/                      
│   ├── app.py                    
│   ├── rutas/                    # Rutas API
│   │   ├── auth.py               
│   │   ├── usuarios.py           
│   │   └── juegos.py             
│   ├── controladores/            # Lógica de negocio
│   │   ├── auth_controlador.py
│   │   ├── usuario_controlador.py
│   │   └── juego_controlador.py
│   ├── modelos/                  # Modelos (SQLAlchemy)
│   │   ├── usuario.py
│   │   ├── juego.py
│   │   └── orden.py
│   ├── configuracion/            # Configuración
│   │   ├── db.py                 
│   │   └── settings.py           
│   ├── estaticos/                # Archivos estáticos servidos por Flask
│   │   └── dist/                 # Aquí se copiará el build de Vite
│
├── database/                     
│   ├── queries/                  
│   └── PostgreSQL.sql               
│
├── tests/                        
│   ├── backend/                  
│   └── frontend/                 
│
├── .gitignore                    
├── requirements.txt              
├── package.json                  
└── README.md                     
