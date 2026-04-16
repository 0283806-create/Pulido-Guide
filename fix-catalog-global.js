/**
 * Alineación global: modelo (m) + marca (b) coherentes con la descripción,
 * usando la misma lógica de compatibilidad que index.html (isCompatible).
 * Solo mueve piezas cuando la fila actual NO es compatible con su m pero sí con otro modelo inferido.
 */
const fs = require('fs');
const path = './catalog_cdn4.js';

const BRAND_FAMILIES = {
  FLD112: 'FLN', FLD120: 'FLN', FLD120XL: 'FLN', CENTURY_C112: 'FLN', CENTURY_C120: 'FLN', COLUMBIA: 'FLN',
  CASCADIA_G1: 'FLN', CASCADIA_G2: 'FLN', M2_106: 'FLN', M2_112: 'FLN',
  W900: 'KW', W900L: 'KW', T600: 'KW', T660: 'KW', T800: 'KW', T680: 'KW', T680_NG: 'KW', T880: 'KW',
  INT_9100: 'INT', INT_9200: 'INT', INT_9400: 'INT', PROSTAR: 'INT', LT: 'INT',
};

const BRAND_KEYWORDS = {
  FLN: ['FREIGHTLINER', 'FLN', 'FLD', 'CASCADIA', 'CENTURY', 'COLUMBIA', 'M2'],
  KW: ['KENWORTH', 'KW', 'T600', 'T660', 'T680', 'T800', 'T880', 'W900'],
  INT: ['INTERNATIONAL', 'INTER', 'PROSTAR', 'PRO STAR', '9100', '9200', '9400', 'LT625', 'LT 625', 'LONESTA'],
};

const MODEL_KEYWORDS = {
  FLD112: ['FLD112', 'FLD 112', 'FLD-112', 'FLC112', 'FLC-112', 'FLC 112'],
  FLD120: ['FLD120', 'FLD 120', 'FLD-120'],
  FLD120XL: ['FLD120XL', 'CLASSIC XL', 'FLD CLASSIC', 'CLASSIC FL', '132 BBC'],
  CENTURY_C112: ['CENTURY', 'CENTURY C112', 'CST112', 'CST-112', 'C-112'],
  CENTURY_C120: ['CENTURY', 'CENTURY C120', 'CST120', 'CST-120', 'C-120'],
  COLUMBIA: ['COLUMBIA'],
  CASCADIA_G1: ['CASCADIA'],
  CASCADIA_G2: ['CASCADIA', 'EVOLUTION', 'P4'],
  M2_106: ['M2 106', 'M2-106', 'M2_106', 'BUSINESS CLASS'],
  M2_112: ['M2 112', 'M2-112', 'M2_112', 'CREW CAB'],
  W900: ['W900', 'W-900'],
  W900L: ['W900L', 'W-900L'],
  T600: ['T600', 'T-600'],
  T660: ['T660', 'T-660'],
  T800: ['T800', 'T-800'],
  T680: ['T680', 'T-680'],
  T680_NG: ['T680', 'T-680', 'NEXT GEN', 'T680NG'],
  T880: ['T880', 'T-880'],
  INT_9100: ['9100', '9100I'],
  INT_9200: ['9200', '9200I'],
  INT_9400: ['9400', '9400I'],
  PROSTAR: ['PROSTAR', 'PRO STAR', 'PRO-STAR'],
  LT: ['LT 625', 'LT625', 'LT-625', 'LONESTA', 'LONSTAR'],
};

const RIVAL_BRAND_KEYWORDS = {
  FLN: ['KENWORTH', 'KW T', 'PROSTAR', 'PRO STAR', 'INTERNATIONAL 9', 'INTER 9', 'LONESTA', 'LT625', 'LT 625', '9100', '9200', '9400'],
  KW: ['FREIGHTLINER', 'FLN FLD', 'CASCADIA', 'CENTURY', 'COLUMBIA', 'PROSTAR', 'INTER 9', '9100', '9200', '9400', 'LONESTA'],
  INT: ['FREIGHTLINER', 'FLD', 'CASCADIA', 'CENTURY', 'COLUMBIA', 'M2 106', 'M2 112', 'KENWORTH', 'KW T', 'W900', 'T600', 'T660', 'T680', 'T800', 'T880'],
};

function isCompatible(product, modelId) {
  const desc = ((product.d || '') + ' ' + (product.c || '')).toUpperCase();
  if (!desc.trim()) return true;
  const myFamily = BRAND_FAMILIES[modelId];
  if (!myFamily) return true;
  const rivalKws = RIVAL_BRAND_KEYWORDS[myFamily] || [];
  for (const kw of rivalKws) {
    if (desc.includes(kw)) return false;
  }
  const myModelKws = MODEL_KEYWORDS[modelId] || [];
  if (myModelKws.some(kw => desc.includes(kw))) return true;
  const familyKws = BRAND_KEYWORDS[myFamily] || [];
  if (familyKws.some(kw => desc.includes(kw))) return true;
  const allModelKws = Object.values(MODEL_KEYWORDS).flat();
  const allBrandKws = Object.values(BRAND_KEYWORDS).flat();
  const allKws = [...new Set([...allModelKws, ...allBrandKws])];
  if (!allKws.some(kw => desc.includes(kw))) return true;
  return false;
}

/**
 * Inferir modelo desde texto: modelos específicos (T660, FLD120, …) antes que
 * "CASCADIA" genérico para no confundir manijas FLN-T660 con piezas solo Cascadia.
 */
function inferModelFromDescription(d) {
  const u = (d || '').toUpperCase();
  if (!u.trim()) return null;

  const MODEL_INFER_ORDER = [
    'FLD120XL',
    'T680_NG',
    'FLD112',
    'FLD120',
    'M2_112',
    'M2_106',
    'W900L',
    'W900',
    'T880',
    'T800',
    'T680',
    'T660',
    'T600',
    'INT_9400',
    'INT_9200',
    'INT_9100',
    'PROSTAR',
    'LT',
    'COLUMBIA',
    'CENTURY_C112',
    'CENTURY_C120',
  ];

  for (const modelId of MODEL_INFER_ORDER) {
    const kws = (MODEL_KEYWORDS[modelId] || []).slice().sort((a, b) => b.length - a.length);
    for (const kw of kws) {
      if (u.includes(kw.toUpperCase())) return modelId;
    }
  }

  if (u.includes('CASCADIA')) {
    if (
      /\b(EVOLUTION|P4|GEN\s*2|2DA\s*GEN)/i.test(d) ||
      /\b20(18|19|2[0-5])\b/.test(d)
    ) {
      return 'CASCADIA_G2';
    }
    return 'CASCADIA_G1';
  }

  return null;
}

function dedupeCatalogRows(rawData) {
  const seen = new Set();
  const out = [];
  for (const p of rawData) {
    const code = String(p.c ?? '').trim();
    const modelId = p.m ? String(p.m).trim().toUpperCase() : '';
    if (modelId && code) {
      const key = modelId + '\0' + code;
      if (seen.has(key)) continue;
      seen.add(key);
    }
    out.push(p);
  }
  return out;
}

const SAP_JUNK = [
  /\s*CÓDIGO DESCRIPCIÓN.*$/i,
  /\s*CODIGO DESCRIPCION.*$/i,
  /\s*ÓDIGO DESCRIPCIÓN.*$/i,
  /\s*ÓDIGO DESCRIPC.*$/i,
  /\s*DIGO DESCRIP.*$/i,
  /\s*[ÓO]DIGO\s*$/i,
  /\s*CÓDIGO\s*$/i,
  /\s*CODIGO\s*$/i,
];

function sanitizeDescription(d) {
  let s = String(d || '').trim();
  for (const rx of SAP_JUNK) s = s.replace(rx, '').trim();
  return s;
}

/**
 * SAP suele mezclar referencias FLN (CASCADIA/CENTURY) en piezas Kenworth;
 * eso hace que isCompatible falle por "rival". Se eliminan solo si el texto
 * ya menciona modelo KW (T660, T680, …).
 */
function softenKenworthCrossRef(d) {
  let s = String(d || '');
  if (!/\bT660\b|T-660|\bT680\b|T-680|\bT800\b|\bT880\b/i.test(s)) return s;
  s = s.replace(/\s*(FLN\s+)?CASCADIA\b[^\s]*/gi, '');
  s = s.replace(/\s*(FLN\s+)?CENTURY\b[^\s]*/gi, '');
  return s.replace(/\s+/g, ' ').trim();
}

const raw = fs.readFileSync(path, 'utf8');
const data = JSON.parse(raw.replace('window.CATALOG_DATA=', '').replace(/;\s*$/, '').trim());

let cleaned = 0;
let softened = 0;
let moved = 0;
const moveLog = [];

for (const p of data) {
  const oldD = p.d;
  p.d = sanitizeDescription(p.d);
  if (p.d !== oldD) cleaned++;
  const beforeSoft = p.d;
  p.d = softenKenworthCrossRef(p.d);
  if (p.d !== beforeSoft) softened++;

  const oldM = p.m;
  const oldB = p.b;

  if (!isCompatible(p, p.m)) {
    const inferred = inferModelFromDescription(p.d);
    if (inferred && inferred !== p.m && isCompatible(p, inferred)) {
      p.m = inferred;
      p.b = BRAND_FAMILIES[inferred];
      moved++;
      if (moveLog.length < 40) {
        moveLog.push({ c: p.c, from: oldM, to: p.m, d: (p.d || '').slice(0, 90) });
      }
    }
  }
}

const before = data.length;
const deduped = dedupeCatalogRows(data);
const after = deduped.length;

fs.writeFileSync(path, `window.CATALOG_DATA=${JSON.stringify(deduped)};`);

console.log('Descripciones limpiadas (patrones SAP):', cleaned);
console.log('Referencias cruzadas FLN en texto KW suavizadas:', softened);
console.log('Piezas reasignadas a otro modelo (m/b):', moved);
console.log('Ejemplos de reasignación (máx 30):');
console.log(JSON.stringify(moveLog, null, 2));
console.log('Filas antes:', before, 'después dedupe:', after, 'eliminadas por duplicado (m+c):', before - after);
