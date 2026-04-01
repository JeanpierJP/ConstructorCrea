# Construcrea / Revestimientos Arquitectónicos

Sitio web tipo *landing* para una empresa de **revestimientos arquitectónicos**. Incluye secciones informativas (Productos, Servicios, Nosotros y Contacto), una grilla de productos que intenta cargarse desde una API, y un formulario de contacto con confirmación visual (sin envío real al backend por defecto).

## Estructura

- `public_html/index.html`: página principal.
- `public_html/styles.css`: estilos.
- `public_html/main.js`: lógica del catálogo (API) + UI (cursor, render, formulario).
- `public_html/robots.txt`: robots.
- `public_html/logo/Logo.png`: logo.

## Requisitos

- Node.js (recomendado 18+)
- npm

## Instalación

```bash
npm install
```

## Uso (desarrollo / producción local)

Servidor local (abre el navegador automáticamente):

```bash
npm run dev
```

Servidor local (sin abrir navegador, puerto 8080):

```bash
npm start
```

El sitio se sirve desde `public_html/`.

## Catálogo (API)

En `public_html/main.js` se define:

- `API_BASE`: base de la API (por defecto apunta a `http://161.97.175.65:9090`).
- Endpoint esperado: `GET /api/productos`

Si la API no responde, el script intenta usar `productosDemo` como fallback. Si no existe esa variable, conviene agregar un dataset demo o manejar el error mostrando un mensaje en UI.

## Despliegue

Es un sitio estático: puedes publicar el contenido de `public_html/` en cualquier hosting estático (Apache/Nginx, GitHub Pages, Netlify, etc.).

## Git (recomendado)

- No subas `node_modules/` al repositorio (está ignorado por `.gitignore`).
- Si ya lo agregaste alguna vez al *staging*, quítalo con:

```bash
git rm -r --cached node_modules
```

