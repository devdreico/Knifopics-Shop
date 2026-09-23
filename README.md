# Knifopics Shop

E-commerce premium de cuchillos y cocina + wiki y mini app del nicho cuchillo.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · framer-motion · react-router

## Diseño (sistema mono premium)

- **Blanco puro + negro mate** — sin modo oscuro, un solo tema
- Tipografía **Montserrat** (800 display / 400–600 UI), tracking negativo en títulos
- **Beige escaso y puntual**: eyebrows de sección, subrayado del hero, niveles de wiki, tips, selection, tono de 2 productos
- **Glass pro**: blur 28–40px, film blanco, inset highlight, sombras bajas tipo tech
- **Botones cuchillo** (`clip-path` hoja/punta + micro-slide en hover)
- Polígono sin `border-radius`, grid técnico sutil, `tabular-nums` en precios
- Logo real en navbar, footer y hero (`public/knifopics-logo.png`)

## Secciones

| Ruta | Contenido |
|------|-----------|
| `/` | Home con destacados, promos wiki/academia y noticias |
| `/knifes` | Catálogo principal de cuchillos (filtros, búsqueda, orden) |
| `/cocina` | Objetos de cocina |
| `/producto/:slug` | Ficha con specs + **link MercadoPago único** |
| `/carrito` | Carrito (localStorage) |
| `/checkout` | **Contra entrega (Formspree)** o pago por link MP |
| `/wiki` | Hub wiki |
| `/wiki/afilado` | Manuales de afilado expandibles |
| `/wiki/datos` | Datos curiosos |
| `/wiki/noticias` | Noticias |
| `/academia` | Mini app: **guía con timer · quiz · calculadora · flashcards** |

## Setup

```bash
npm install
cp .env.example .env   # completar IDs
npm run dev
```

### Variables `.env`

- `VITE_FORMSPREE_ID` — ID del formulario Formspree para pedidos contra entrega
- Links MercadoPago por producto: editar `mpLink` en `src/data/products.ts`

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # typecheck + build producción
npm run lint     # eslint
npm run preview  # servir dist
```

## Productos demo

10 productos en `src/data/products.ts` (7 Knifes + 3 Cocina). Reemplazá placeholders de MercadoPago por links reales.
