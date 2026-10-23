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
| `/knifes/wiki` · `/knifes/wiki/:section` | Wiki del filo (afilado, datos, noticias) |
| `/knifes/academia` | Mini app: **guía con timer · quiz · calculadora · flashcards** |
| `/kitchen` | Tienda Kitchen: sartenes, ollas, gadgets y objetos generales |
| `/kitchen/guias` · `/kitchen/guias/:slug` | Guías de cocina paso a paso |
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

- `VITE_FORMSPREE_ID` — ID del formulario Formspree para pedidos contra entrega. Sin él, el checkout corre en modo demo (log + éxito local).

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # typecheck + build producción
npm run lint     # eslint
npm run preview  # servir dist
```

## Datos

Todo es TypeScript estático en `src/data/`:

- `products.ts` — **21 productos** (7 Knifes + 14 Kitchen: sartenes, wok, dutch oven, gadgets…)
- `guides.ts` — 7 guías de cuchillo + 6 guías de cocina (pasos con tips)
- `cultures.ts` — 6 culturas con platos, esenciales enlazados a productos y tip final
- `rankings.ts` — 4 rankings con items rankeados
- `wiki.ts` / `academy.ts` — wiki del filo y módulos de la academia
- Arte de producto: **SVGs poligonales** en `KnifeArt.tsx` (cuchillos + cocina, tono cobre)
