# Guía de imágenes — inventario y convenciones

Este archivo se generó leyendo el objeto `DATA` en `index.html`. **No se modificó `index.html`** (incluido el campo `imgs:[]` en cada modelo: no está presente en `DATA` hoy; conviene añadirlo en una edición futura cuando se quiera listar extras locales por modelo).

---

## SECCIÓN 1 — Imagen principal (tarjeta del grid)

Patrón de nombre: `ID_main.jpg` (donde `ID` es el valor exacto del campo `id` de cada modelo en `DATA`).

**Estado:** ✅ EXISTE — archivo presente en `images/` · ⬜ FALTA — aún no existe con ese nombre exacto.

### Marca FRT (`DATA.FRT`; en la app el badge usa `marca: 'FLN'`)

| Marca | ID interno | Nombre visible | Archivo → `/images/` | Estado |
|-------|------------|----------------|----------------------|--------|
| FRT | FLD112 | FLD112 | `images/FLD112_main.jpg` | ✅ EXISTE |
| FRT | FLD120 | FLD120 | `images/FLD120_main.jpg` | ✅ EXISTE |
| FRT | FLD120XL | FLD120 Classic XL | `images/FLD120XL_main.jpg` | ✅ EXISTE |
| FRT | CENTURY_C112 | Century C112 | `images/CENTURY_C112_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/century-c112.png` — ✅ EXISTE)* |
| FRT | CENTURY_C120 | Century C120 | `images/CENTURY_C120_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/CENTURY_main.jpg` — ✅ EXISTE)* |
| FRT | COLUMBIA | Columbia 120 | `images/COLUMBIA_main.jpg` | ✅ EXISTE |
| FRT | CASCADIA_G1 | Cascadia Gen1 | `images/CASCADIA_G1_main.jpg` | ✅ EXISTE |
| FRT | CASCADIA_G2 | Cascadia Gen2 / P4 | `images/CASCADIA_G2_main.jpg` | ✅ EXISTE |
| FRT | M2_106 | M2 106 | `images/M2_106_main.jpg` | ✅ EXISTE |
| FRT | M2_112 | M2 112 | `images/M2_112_main.jpg` | ✅ EXISTE |

### Marca KW (`DATA.KW`)

| Marca | ID interno | Nombre visible | Archivo → `/images/` | Estado |
|-------|------------|----------------|----------------------|--------|
| KW | W900 | W900 | `images/W900_main.jpg` | ⬜ FALTA *(imagen de tarjeta vía Wikimedia / proxy en `DATA.foto`)* |
| KW | W900L | W900L | `images/W900L_main.jpg` | ⬜ FALTA |
| KW | T600 | T600 | `images/T600_main.jpg` | ⬜ FALTA |
| KW | T660 | T660 | `images/T660_main.jpg` | ⬜ FALTA |
| KW | T800 | T800 | `images/T800_main.jpg` | ⬜ FALTA |
| KW | T680 | T680 | `images/T680_main.jpg` | ⬜ FALTA |
| KW | T680_NG | T680 Next Gen | `images/T680_NG_main.jpg` | ⬜ FALTA |
| KW | T880 | T880 | `images/T880_main.jpg` | ⬜ FALTA |

### Marca INT (`DATA.INT`; en la app el badge usa `marca: 'INTER'`)

| Marca | ID interno | Nombre visible | Archivo → `/images/` | Estado |
|-------|------------|----------------|----------------------|--------|
| INT | INT_9100 | 9100i | `images/INT_9100_main.jpg` | ✅ EXISTE |
| INT | INT_9200 | 9200i | `images/INT_9200_main.jpg` | ✅ EXISTE |
| INT | INT_9400 | 9400i | `images/INT_9400_main.jpg` | ✅ EXISTE |
| INT | INT_9900 | 9900i | `images/INT_9900_main.jpg` | ✅ EXISTE |
| INT | INT_9900IX | 9900ix | `images/INT_9900IX_main.jpg` | ✅ EXISTE |
| INT | LONESTAR | LoneStar | `images/LONESTAR_main.jpg` | ✅ EXISTE |
| INT | DINA_9400 | DINA 9400 | `images/DINA_9400_main.jpg` | ⬜ FALTA *(`DATA.foto`: `null`)* |
| INT | DURASTAR_4300 | 4300 DuraStar | `images/DURASTAR_4300_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/INT_4300_DURASTAR_main.jpg` — ✅ EXISTE)* |
| INT | INT_7600 | 7600 | `images/INT_7600_main.jpg` | ✅ EXISTE |
| INT | WORKSTAR | WorkStar | `images/WORKSTAR_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/INT_WORKSTAR_main.jpg` — ✅ EXISTE)* |
| INT | TRANSTAR | TransStar | `images/TRANSTAR_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/INT_TRANSSTAR_main.jpg` — ✅ EXISTE)* |
| INT | QSP_4700 | 4700 QSP | `images/QSP_4700_main.jpg` | ⬜ FALTA *(en `DATA.foto`: `images/INT_4700_QSP_main.jpg` — ✅ EXISTE)* |
| INT | PROSTAR | ProStar / ProStar+ | `images/PROSTAR_main.jpg` | ✅ EXISTE |
| INT | LT | LT625 | `images/LT_main.jpg` | ✅ EXISTE |

---

## SECCIÓN 2 — Imágenes extra del lightbox (carrusel al dar clic)

### Campo en `DATA`

En el objeto `DATA`, **no aparece** ningún campo `imgs`, `fotos`, `extra` ni otro array de rutas por modelo en los objetos de `modelos[]`. Para uso futuro, la convención sugerida es añadir por modelo **`imgs:[]`** con rutas relativas (p. ej. `images/ID_2.jpg`), en una edición de `index.html` cuando se desee.

### Comportamiento actual en `index.html`

Hoy el carrusel del lightbox toma la imagen principal de la URL que se pasa a `openLightbox` y **concatena URLs adicionales** desde el objeto global **`GALLERY[modelId]`** (no desde `DATA`). Las entradas de `GALLERY` apuntan sobre todo a Wikimedia.

### Patrón de nombres locales para extras

- Primera extra: `images/ID_2.jpg`
- Segunda extra: `images/ID_3.jpg`
- Tercera extra: `images/ID_4.jpg`
- …sigue el índice según cantidad.

Debajo, por modelo, se listan los archivos extra que encajan con **ese patrón** y el **número de slots “extra” que hoy ocupa `GALLERY[id]`** (solo como referencia para migrar a JPG locales). Estado solo para rutas bajo `images/` con el nombre estricto `ID_N.jpg`.

#### FRT

**FLD112** — extras en `GALLERY`: 4 → convención local `FLD112_2.jpg` … `FLD112_5.jpg`

| Archivo | Estado |
|---------|--------|
| `images/FLD112_2.jpg` | ⬜ FALTA |
| `images/FLD112_3.jpg` | ⬜ FALTA |
| `images/FLD112_4.jpg` | ⬜ FALTA |
| `images/FLD112_5.jpg` | ⬜ FALTA |

**FLD120** — GALLERY: 2 → `FLD120_2.jpg` … `FLD120_3.jpg`

| Archivo | Estado |
|---------|--------|
| `images/FLD120_2.jpg` | ⬜ FALTA |
| `images/FLD120_3.jpg` | ⬜ FALTA |

**FLD120XL** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/FLD120XL_2.jpg` | ⬜ FALTA |
| `images/FLD120XL_3.jpg` | ⬜ FALTA |

**CENTURY_C112** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/CENTURY_C112_2.jpg` | ⬜ FALTA |
| `images/CENTURY_C112_3.jpg` | ⬜ FALTA |

**CENTURY_C120** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/CENTURY_C120_2.jpg` | ⬜ FALTA |
| `images/CENTURY_C120_3.jpg` | ⬜ FALTA |

**COLUMBIA** — GALLERY: 3

| Archivo | Estado |
|---------|--------|
| `images/COLUMBIA_2.jpg` | ⬜ FALTA |
| `images/COLUMBIA_3.jpg` | ⬜ FALTA |
| `images/COLUMBIA_4.jpg` | ⬜ FALTA |

**CASCADIA_G1** — GALLERY: 3

| Archivo | Estado |
|---------|--------|
| `images/CASCADIA_G1_2.jpg` | ⬜ FALTA |
| `images/CASCADIA_G1_3.jpg` | ⬜ FALTA |
| `images/CASCADIA_G1_4.jpg` | ⬜ FALTA |

**CASCADIA_G2** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/CASCADIA_G2_2.jpg` | ⬜ FALTA |

**M2_106** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/M2_106_2.jpg` | ⬜ FALTA |
| `images/M2_106_3.jpg` | ⬜ FALTA |

**M2_112** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/M2_112_2.jpg` | ⬜ FALTA |

#### KW

**W900** — GALLERY: 4

| Archivo | Estado |
|---------|--------|
| `images/W900_2.jpg` | ⬜ FALTA |
| `images/W900_3.jpg` | ⬜ FALTA |
| `images/W900_4.jpg` | ⬜ FALTA |
| `images/W900_5.jpg` | ⬜ FALTA |

**W900L** — GALLERY: 4

| Archivo | Estado |
|---------|--------|
| `images/W900L_2.jpg` | ⬜ FALTA |
| `images/W900L_3.jpg` | ⬜ FALTA |
| `images/W900L_4.jpg` | ⬜ FALTA |
| `images/W900L_5.jpg` | ⬜ FALTA |

**T600** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/T600_2.jpg` | ⬜ FALTA |
| `images/T600_3.jpg` | ⬜ FALTA |

**T660** — GALLERY: 4

| Archivo | Estado |
|---------|--------|
| `images/T660_2.jpg` | ⬜ FALTA |
| `images/T660_3.jpg` | ⬜ FALTA |
| `images/T660_4.jpg` | ⬜ FALTA |
| `images/T660_5.jpg` | ⬜ FALTA |

**T800** — GALLERY: 3

| Archivo | Estado |
|---------|--------|
| `images/T800_2.jpg` | ⬜ FALTA |
| `images/T800_3.jpg` | ⬜ FALTA |
| `images/T800_4.jpg` | ⬜ FALTA |

**T680** — GALLERY: 3

| Archivo | Estado |
|---------|--------|
| `images/T680_2.jpg` | ⬜ FALTA |
| `images/T680_3.jpg` | ⬜ FALTA |
| `images/T680_4.jpg` | ⬜ FALTA |

**T680_NG** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/T680_NG_2.jpg` | ⬜ FALTA |

**T880** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/T880_2.jpg` | ⬜ FALTA |

#### INT

**INT_9100** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/INT_9100_2.jpg` | ⬜ FALTA |

**INT_9200** — GALLERY: 2

| Archivo | Estado |
|---------|--------|
| `images/INT_9200_2.jpg` | ⬜ FALTA |
| `images/INT_9200_3.jpg` | ⬜ FALTA |

**INT_9400** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/INT_9400_2.jpg` | ⬜ FALTA |

**INT_9900** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/INT_9900_2.jpg` | ⬜ FALTA |

**INT_9900IX** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/INT_9900IX_2.jpg` | ⬜ FALTA |

**LONESTAR** — sin entrada en `GALLERY` (solo imagen principal en carrusel hasta que existan extras).

| Archivo | Estado |
|---------|--------|
| `images/LONESTAR_2.jpg` | ⬜ FALTA *(opcional)* |

**DINA_9400** — sin `GALLERY`; sin foto principal local en `DATA`.

| Archivo | Estado |
|---------|--------|
| `images/DINA_9400_2.jpg` | ⬜ FALTA *(opcional)* |

**DURASTAR_4300** — sin `GALLERY`

| Archivo | Estado |
|---------|--------|
| `images/DURASTAR_4300_2.jpg` | ⬜ FALTA *(opcional)* |

**INT_7600** — sin `GALLERY`

| Archivo | Estado |
|---------|--------|
| `images/INT_7600_2.jpg` | ⬜ FALTA *(opcional)* |

**WORKSTAR** — sin `GALLERY`

| Archivo | Estado |
|---------|--------|
| `images/WORKSTAR_2.jpg` | ⬜ FALTA *(opcional)* |

**TRANSTAR** — sin `GALLERY`

| Archivo | Estado |
|---------|--------|
| `images/TRANSTAR_2.jpg` | ⬜ FALTA *(opcional)* |

**QSP_4700** — sin `GALLERY`

| Archivo | Estado |
|---------|--------|
| `images/QSP_4700_2.jpg` | ⬜ FALTA *(opcional)* |

**PROSTAR** — GALLERY: 4

| Archivo | Estado |
|---------|--------|
| `images/PROSTAR_2.jpg` | ⬜ FALTA |
| `images/PROSTAR_3.jpg` | ⬜ FALTA |
| `images/PROSTAR_4.jpg` | ⬜ FALTA |
| `images/PROSTAR_5.jpg` | ⬜ FALTA |

**LT** — GALLERY: 1

| Archivo | Estado |
|---------|--------|
| `images/LT_2.jpg` | ⬜ FALTA |

---

## SECCIÓN 3 — Cómo funciona el carrusel

En `index.html`, al hacer clic en la foto grande del panel de detalle (elemento con clase **`.det-photo`**), se ejecuta un manejador que llama a **`openLightbox`** con la URL de la imagen mostrada, el texto del pie de foto y el **`mod.id`**.

Hoy, **`openLightbox(mainSrc, caption, modelId)`** acepta un **string** en el primer argumento y, en el cuerpo de la función, une la imagen principal con las URLs del array **`GALLERY[modelId]`** para formar el carrusel.

**ACTUAL** (tal como está en `index.html`):

```javascript
dp.onclick=()=>{
  const img=dp.querySelector('img');
  if(img && img.src) openLightbox(img.src, mod.nombre+' · '+mod.anios, mod.id);
};
```

**DEBE QUEDAR** (enfoque con **array** de URLs y extras desde `mod.imgs`, como solicitaste; implica adaptar también **`openLightbox`** para aceptar `string | string[]` en el primer parámetro, o siempre un array):

```javascript
dp.onclick = () => {
  const main = mod.foto ? mod.foto : (dp.querySelector('img')?.src || '');
  const extras = (mod.imgs || []);
  const todas = [main, ...extras].filter(Boolean);
  openLightbox(todas, mod.nombre + ' · ' + mod.anios, mod.id);
};
```

Hasta que `openLightbox` y el resto del lightbox esperen un array en el primer argumento, la versión “DEBE QUEDAR” no puede sustituir al actual sin ese ajuste coordinado.

---

## SECCIÓN 4 — Reglas de nombrado

1. Carpeta destino: `/images/` en la raíz del proyecto
2. Imagen principal: `ID_main.jpg`
3. Imágenes extra: `ID_2.jpg`, `ID_3.jpg`, `ID_4.jpg` …
4. `ID` = valor exacto del campo `id:` en el objeto `DATA` del `index.html`
5. Solo mayúsculas, números y guion bajo `_`
6. Sin espacios, sin acentos, sin guion medio `-`
7. Resolución recomendada: mínimo 800×500 px, proporción 16:9 o 3:2
8. Peso máximo: 300 KB por imagen (JPG compresión 85%)
9. Al colocar el archivo con el nombre correcto en `/images/` y agregarlo al array `imgs:[]` del modelo en `DATA`, aparecerá automáticamente en el carrusel sin cambiar más código.
