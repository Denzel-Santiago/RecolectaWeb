  # Archivo Recolecta Web

  # Aplicación web desarrollada con React 19 + TypeScript + Vite 7 para la gestión y validación de rutas de recolección.

  # Este proyecto permite visualizar estados de rutas, validaciones y gestión de información relacionada con el proceso de recolección.


  # Stack Tecnológico
        Frontend

        React 19.2.0

        React DOM 19.2.0

        TypeScript 5.9.3

        Vite 7.2.4

        React Router DOM 7.12.0

        React Icons 5.5.0

        Google Maps JS API Loader 2.0.2 (no implementado)

        Linting

        ESLint 9.39.1

        typescript-eslint 8.46.4

  # Requisitos

        Node.js >= 18

        npm >= 9

  # Instalación
        #  Clonar repositorio
        #  git clone https://github.com/Denzel-Santiago/RecolectaWeb.git
        # entrar en la carpeta con : cd recolecta-web

  # Instalar dependencias
        # npm install

  # Ejecutar el Proyecto 
        npm run dev

  # Estructura del proyecto 
    recolecta-web/
      │
      ├── public/                    # Archivos estáticos públicos
      │
      ├── src/
      │   │
      │   ├── assets/                # Recursos (imágenes, íconos, etc.)
      │   │
      │   ├── components/
      │   │   └── Navigation/
      │   │       ├── Navbar.tsx
      │   │       └── Navbar.css
      │   │
      │   ├── Pages/
      │   │   ├── Alertas/
      │   │   ├── Anomalias/
      │   │   ├── Dashboard/
      │   │   ├── EstadoRuta/
      │   │   ├── Historial/
      │   │   ├── Login/
      │   │   ├── Mapa/
      │   │   └── ValidacionRecoleccion/
      │   │
      │   ├── Router/
      │   │   └── AppRouter.tsx
      │   │
      │   ├── App.tsx
      │   ├── App.css
      │   ├── index.css
      │   └── main.tsx
      │
      ├── .gitignore
      ├── eslint.config.js
      ├── index.html
      ├── package.json
      ├── package-lock.json
      └── README.md


      