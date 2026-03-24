// export-images.js
// Ejecutar con: node export-images.js
// Descarga todas las fotos de camiones a ./truck-images/

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = './truck-images';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Lista de todas las imágenes por modelo — URLs alineadas con DATA / GALLERY en index.html
const TRUCK_IMAGES = [
  { id: 'FLD112_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Freightliner_FLD_112_1994_%2816013425830%29.jpg/1200px-Freightliner_FLD_112_1994_%2816013425830%29.jpg' },
  { id: 'FLD120_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Freightliner_FLD_120_%22Boogie_Man%22_%2814451402871%29.jpg/1200px-Freightliner_FLD_120_%22Boogie_Man%22_%2814451402871%29.jpg' },
  { id: 'FLD120XL_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Freightliner_FLD_132_Classic_XL_1999_%2818508818573%29.jpg/1200px-Freightliner_FLD_132_Classic_XL_1999_%2818508818573%29.jpg' },
  { id: 'CENTURY_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/2009-07-05_Chatham_Steel_Freightliner.jpg/1200px-2009-07-05_Chatham_Steel_Freightliner.jpg' },
  { id: 'COLUMBIA_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/2005_Freightliner_Columbia_112_in_GFL_Lime_Green%2C_Front_Right%2C_09-26-2022.jpg/1200px-2005_Freightliner_Columbia_112_in_GFL_Lime_Green%2C_Front_Right%2C_09-26-2022.jpg' },
  { id: 'CASCADIA_G1_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/FL_CasacadiaAtLV_NV.jpg/1200px-FL_CasacadiaAtLV_NV.jpg' },
  { id: 'CASCADIA_G2_main', url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/A_2020_Cascadia_126_Shown_in_Green.jpg' },
  { id: 'M2_106_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Freightliner_Business_Class_M2_box_rigid.jpg/1200px-Freightliner_Business_Class_M2_box_rigid.jpg' },
  { id: 'M2_112_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Freightliner_Business_Class_Crew_Cab.jpg/1200px-Freightliner_Business_Class_Crew_Cab.jpg' },
  { id: 'W900_main', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Kenworth_W900_semi_in_red.jpg' },
  { id: 'W900L_main', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Tweed_Transport_Kenworth_W900L_Front.jpg' },
  { id: 'T600_main', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/1995_Kenworth_T600B_Aerocab_6x4_Class_8_tractor.jpg' },
  { id: 'T660_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kenworth_T660_Aerocab_6x4_2014_%2814091618160%29.jpg/1200px-Kenworth_T660_Aerocab_6x4_2014_%2814091618160%29.jpg' },
  { id: 'T800_main', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/2011_Kenworth_T800_Aerocab_6x4_conventional_tractor.jpg' },
  { id: 'T680_main', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/2022_Kenworth_T680_in_White%2C_Front_Right%2C_10-05-2022.jpg' },
  { id: 'T680_NG_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2022_Kenworth_T680_in_White%2C_Front_Right%2C_10-05-2022.jpg/1200px-2022_Kenworth_T680_in_White%2C_Front_Right%2C_10-05-2022.jpg' },
  { id: 'T880_main', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/2020_Kenworth_T880_in_White%2C_Front_Left%2C_04-03-2022.jpg' },
  { id: 'INT_9100_main', url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/International_Eagle_farm_truck_VT.jpg' },
  { id: 'INT_9200_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/International_9200i_%289609150097%29.jpg/1200px-International_9200i_%289609150097%29.jpg' },
  { id: 'INT_9400_main', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/2015_International_Semi_Tractor_%2818197014603%29.jpg' },
  { id: 'INT_9900_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/2005_INTERNATIONAL_9900i_EAGLE_%2829961817262%29.jpg/1200px-2005_INTERNATIONAL_9900i_EAGLE_%2829961817262%29.jpg' },
  { id: 'INT_9900IX_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/International_9900i_Eagle.jpg/1200px-International_9900i_Eagle.jpg' },
  { id: 'PROSTAR_main', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/International_ProStar.JPG' },
  { id: 'LT_main', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/2019_International_LT_625_trailer_truck%2C_front_left.jpg/1200px-2019_International_LT_625_trailer_truck%2C_front_left.jpg' },
];

function download(fileUrl, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = fileUrl.startsWith('https') ? https : http;
    protocol.get(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Pulido-Guide export)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) {
        file.close();
        fs.unlink(dest, () => {});
        const loc = res.headers.location;
        if (!loc) return reject(new Error('Redirect sin Location'));
        const next = /^https?:/i.test(loc) ? loc : new URL(loc, fileUrl).href;
        return download(next, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error('HTTP ' + res.statusCode));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function downloadWithRetry(url, dest, retries = 5, delayMs = 8000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await download(url, dest);
      return;
    } catch (e) {
      const is429 = e.message.includes('429');
      if (is429 && attempt < retries) {
        const wait = delayMs * attempt; // backoff: 3s, 6s, 9s
        process.stdout.write(`  ↻ 429 rate-limit, reintentando en ${wait/1000}s (intento ${attempt}/${retries})...\r`);
        await sleep(wait);
      } else {
        throw e;
      }
    }
  }
}

async function main() {
  // Solo descarga las que aún no existen
  const pending = TRUCK_IMAGES.filter(img => {
    const ext = img.url.toLowerCase().includes('.png') ? '.png' : '.jpg';
    return !fs.existsSync(path.join(OUTPUT_DIR, img.id + ext));
  });

  console.log(`Descargando ${pending.length} imágenes (de ${TRUCK_IMAGES.length} total) a ${OUTPUT_DIR}/\n`);

  let ok = 0, fail = 0;
  for (const img of pending) {
    const ext = img.url.toLowerCase().includes('.png') ? '.png' : '.jpg';
    const dest = path.join(OUTPUT_DIR, img.id + ext);
    try {
      await downloadWithRetry(img.url, dest);
      console.log(`✓ ${img.id}${ext}`);
      ok++;
    } catch (e) {
      console.log(`✗ ${img.id} — ${e.message}`);
      fail++;
    }
    // Pausa entre descargas para no disparar rate-limit
    if (pending.indexOf(img) < pending.length - 1) await sleep(5000);
  }

  console.log(`\n${ok} descargadas, ${fail} fallidas.`);
  if (fail === 0) console.log('¡Todo listo!');
}

main();
