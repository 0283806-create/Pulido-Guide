// fix-desc.js
const fs = require('fs');
const raw = fs.readFileSync('./catalog_cdn4.js', 'utf8');
const data = JSON.parse(raw.replace('window.CATALOG_DATA=','').replace(/;\s*$/,'').trim());

const BASURA = [
  /\s*CÓDIGO DESCRIPCIÓN.*$/i,
  /\s*CODIGO DESCRIPCION.*$/i,
  /\s*ÓDIGO DESCRIPCIÓN.*$/i,
  /\s*ÓDIGO DESCRIPC.*$/i,
  /\s*DIGO DESCRIP.*$/i,
  /\s*[ÓO]DIGO\s*$/i,
  /\s*CÓDIGO\s*$/i,
  /\s*CODIGO\s*$/i,
];

// Detectar y eliminar texto repetido al final de la descripción
function limpiarRepeticion(d) {
  if (!d || d.length < 20) return d;
  // Si hay texto que aparece dos veces, quedarse con la primera parte
  const mitad = Math.floor(d.length / 2);
  for (let i = 5; i <= mitad; i++) {
    const fragmento = d.substring(mitad - i, mitad);
    if (d.indexOf(fragmento) !== d.lastIndexOf(fragmento)) {
      const primerPos = d.indexOf(fragmento);
      const segundoPos = d.lastIndexOf(fragmento);
      if (segundoPos > mitad) {
        return d.substring(0, segundoPos).trim();
      }
    }
  }
  return d;
}

let corregidas = 0;
for (const p of data) {
  let d = (p.d || '').trim();
  const original = d;
  
  // 1. Eliminar patrones de basura
  for (const rx of BASURA) {
    d = d.replace(rx, '').trim();
  }
  
  // 2. Limpiar texto repetido
  d = limpiarRepeticion(d);
  
  // 3. Eliminar palabras sueltas al final que son fragmentos cortados
  // (menos de 4 chars que no son unidades de medida)
  d = d.replace(/\s+[A-Z]{1,3}$/, s => /^(IN|MM|CM|KG|LB|PZ|PC)$/i.test(s.trim()) ? s : '').trim();
  
  if (d !== original) {
    p.d = d;
    corregidas++;
  }
}

fs.writeFileSync('./catalog_cdn4.js', `window.CATALOG_DATA=${JSON.stringify(data)};`);
console.log(`✅ Descripciones corregidas: ${corregidas} de ${data.length}`);

// Verificar que no quedan problemas
const restantes = data.filter(p => /CÓDIGO DESCRIPCIÓN|ÓDIGO DESCRIP|DIGO DESCRIP/i.test(p.d||'')).length;
console.log(`   Problemas restantes: ${restantes}`);
