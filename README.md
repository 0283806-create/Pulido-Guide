# Pulido Trucks & Parts — Guía Visual de Cofres

Guía interactiva para identificación de cofres de camiones con catálogo 2025 integrado.

## Modelos cubiertos
- **Freightliner:** FLD112, FLD120, Classic XL, Century C112/C120, Columbia, Cascadia Gen1/Gen2, M2 106/112
- **Kenworth:** W900, W900L, T600, T660, T800, T680, T880
- **International:** 9100i, 9200i, 9400i, 9900i, 9900ix, ProStar, LT625

## Funciones
- 📋 Catálogo visual con fotos en ángulo 3/4
- 🔍 Identificador guiado por preguntas
- 📖 Glosario técnico (BBC, Set-Back, Split Fender, EGR, etc.)
- 🔩 **4,475 piezas del catálogo 2025** (FLN + KW + INT) con fotos

## Deploy
Configurado para Vercel. El archivo `catalog.js` (~4MB) contiene todas las piezas con imágenes.

## Estructura
```
index.html   — Aplicación principal (98KB)
catalog.js   — Base de datos de piezas con imágenes (4MB)
vercel.json  — Configuración de Vercel
```
