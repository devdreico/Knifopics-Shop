# Knifopics Shop

E-commerce **50 % cuchillos / 50 % cocina**: dos secciones con tienda propia, contenidos propios y **un solo carrito combinado**, todo pago **contra entrega** vía Formspree.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · framer-motion · react-router

## Arquitectura de secciones

El header tiene una **barra central `KNIFES | KITCHEN`** que conmuta entre secciones. La sección activa se deriva de la ruta (`/kitchen*` → acento cobre, resto → acento acero) y se pinta en `data-section` del `<html>`, cambiando los tokens CSS (`--accent`, `--beige`, glass cálido…).

- **KNIFES** (`/knifes`): tienda solo cuchillos, pasos por cuchillo, wiki, academia
- **KITCHEN** (`/kitchen`): tienda de sartenes/gadgets, guías de cocina, culturas, rankings
- **Globales**: `/producto/:slug`, `/carrito` (combinado), `/checkout` (Formspree COD)

## Diseño (sistema mono premium + acento por sección)

- **Blanco puro + negro mate** (Knifes) y **acento cobre `#9a4416` + warm glass** (Kitchen)
- Tipografía **Montserrat** (800 display / 400–600 UI), tracking negativo en títulos
- **Beige escaso** en Knifes / arena cálida en Kitchen: eyebrows, chips, tips
- **Glass pro**: blur 28–44px, film, inset highlight, orbs difuminados en el checkout
- **Botones cuchillo** (`clip-path` hoja/punta + micro-slide en hover)
- Polígono sin `border-radius`, grid técnico sutil, `tabular-nums` en precios
- Chips estáticos por sección (`.chip-knifes` / `.chip-kitchen`) en tarjetas, carrito y resumen

## Rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Landing **50/50** Knifes vs Kitchen + cómo funciona + destacados mixtos |
| `/knifes` | Tienda de **solo cuchillos** (búsqueda, acero, orden) |
| `/knifes/guias` | **Pasos por cuchillo** — guías tipo a tipo |
| `/knifes/guias/:slug` | Guía interactiva con **stepper** (progreso, teclado ←/→) |
| `/knifes/wiki` · `/knifes/wiki/:topic` | Wiki del filo y artículos de afilado |
| `/knifes/noticias` · `/knifes/noticias/:slug` | Artículos de cuchillería |
| `/knifes/academia` | Mini app: **guía con timer · quiz · calculadora · flashcards** |
| `/knifes/culturas` · `/knifes/culturas/:slug` | Tradiciones cuchilleras por región |
| `/knifes/rankings` | Comparativas de perfiles, aceros y cuidado |
| `/kitchen` | Tienda Kitchen: sartenes, ollas, gadgets y objetos generales |
| `/kitchen/guias` · `/kitchen/guias/:slug` | Guías de cocina paso a paso |
| `/kitchen/wiki` · `/kitchen/wiki/:topic` | Wiki de técnicas de cocina |
| `/kitchen/noticias` · `/kitchen/noticias/:slug` | Artículos editoriales de cocina (sin feed en vivo) |
| `/kitchen/academia` | Mini app: **sesiones con temporizador · quiz · flashcards · convertidor** |
| `/kitchen/culturas` · `/kitchen/culturas/:slug` | Culturas gastronómicas del mundo |
| `/kitchen/rankings` | Rankings famosos (tabs interactivos) |
| `/producto/:slug` | Ficha con specs · **solo carrito + COD** |
| `/carrito` | **Carrito combinado** (localStorage, chips por sección) |
| `/checkout` | **Contra entrega 100 %** — formulario glassmorphism → Formspree |
| `/wiki`, `/academia`, `/cocina` | Redirecciones a las rutas nuevas |

## Setup

```bash
npm install
cp .env.example .env   # completar VITE_FORMSPREE_ID
npm run dev
```

### Variables `.env`

- `VITE_FORMSPREE_ID` — ID del formulario Formspree para pedidos contra entrega. Sin él, el checkout queda en modo demostración: no envía pedidos ni vacía el carrito.

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # typecheck + build producción
npm run lint     # eslint
npm run preview  # servir dist
```

## Datos

El contenido está tipado en `src/data/types.ts`, organizado por sección en `src/data/knifes/` y
`src/data/kitchen/`, y expuesto a las páginas mediante `src/data/catalog.ts`. Incluye productos,
guías, wiki, artículos, culturas, rankings y módulos de academia. El contenido es estático de
TypeScript; las noticias no se consultan en tiempo real.

El arte de producto usa **SVGs poligonales** en `KnifeArt.tsx` (cuchillos + cocina, tono cobre).
