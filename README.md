  # Archivo Recolecta Web

  # Aplicación web desarrollada con React 19 + TypeScript + Vite 7 para la gestión y validación de rutas de recolección.

  # Este proyecto permite visualizar estados de rutas, validaciones y gestión de información relacionada con el proceso de recolección.


  # Introducción

            Recolecta Web es una aplicación desarrollada con React 19 + TypeScript + Vite 7 que permite gestionar rutas de recolección, visualizar su estado en tiempo real y validar el cumplimiento de las actividades realizadas por los conductores.

            El sistema está diseñado como una herramienta de apoyo operativo para el control y seguimiento de procesos de recolección.

# Características Principales

                  Visualización del estado de rutas

                  Gestión de anomalías

                  Validación de recolección

                  Registro de historial de acciones

                  Panel de alertas

                  Dashboard general

                  Sistema de navegación estructurado

                  Preparado para integración con Google Maps

                  Arquitectura modular y escalable

# Arquitectura

            El proyecto sigue una arquitectura SPA (Single Page Application) basada en componentes.

                  Tipo de Arquitectura

                  Frontend desacoplado

                  Basado en componentes

                  Enrutamiento interno con React Router

                  Estructura modular por vistas (feature-based structure)


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

# Seguridad

            Actualmente el proyecto:

            No expone credenciales en el código

            Permite configuración mediante variables de entorno

            Está preparado para autenticación futura

            No almacena datos sensibles en el frontend

            Recomendaciones para producción:

            Usar variables de entorno (.env)

            No subir archivos .env al repositorio

            Implementar autenticación con JWT o OAuth

            Implementar HTTPS en despliegue
      
      
 # URLs del Sistema (Rutas Frontend)

      Dependiendo de tu configuración en AppRouter.tsx, las rutas incluyen:

            /login

            /dashboard

            /estado-ruta

            /validacion-recoleccion

            /anomalias

            /alertas

            /historial

            /mapa

      
# Notas Adicionales

            El sistema está pensado como una herramienta de gestión operativa.

            La aplicación está estructurada para escalar fácilmente.

            Está preparada para futura conexión con backend.

            Se puede desplegar en:

            Vercel

            Netlify

            Servidores Linux

            Docker

            Kubernetes

            El proyecto está diseñado para:

            Separar claramente vistas y componentes

            Permitir integración con APIs externas

            Facilitar mantenimiento por otros desarrolladores

            Ser adaptable a entornos empresariales