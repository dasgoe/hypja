// build.js — genereert de statische taalversies vanuit template.html + content/*.json
// Vereist enkel Node.js (geen npm install, geen dependencies).
// Uitvoeren: node build.js
// Resultaat: index.html (fr), nl/index.html, en/index.html + sitemap.xml

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ---------- Config: pas baseUrl aan zodra het domein vaststaat ----------
const config = {
  baseUrl: 'https://hypja.be', // TODO Erika: aanpassen naar het definitieve domein
  defaultLang: 'fr',
  languages: [
    { code: 'fr', hreflang: 'fr-BE', outFile: 'index.html',    urlPath: '/' },
    { code: 'nl', hreflang: 'nl-BE', outFile: 'nl/index.html', urlPath: '/nl/' },
    { code: 'en', hreflang: 'en',    outFile: 'en/index.html', urlPath: '/en/' },
  ],
};

// ---------- Kleine template-engine: {{key.path}} en {{#each arr}}...{{/each}} ----------
function getPath(obj, keyPath) {
  return keyPath.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function render(template, data) {
  // 1. loops eerst, zodat {{this.x}} binnenin correct herkend wordt
  template = template.replace(/{{#each\s+([\w.]+)}}([\s\S]*?){{\/each}}/g, (_, arrPath, inner) => {
    const arr = getPath(data, arrPath) || [];
    return arr.map((item) => render(inner, { ...data, this: item })).join('');
  });
  // 2. simpele substitutie
  template = template.replace(/{{\s*([\w.]+)\s*}}/g, (_, keyPath) => {
    const val = getPath(data, keyPath);
    return val !== undefined && val !== null ? String(val) : '';
  });
  return template;
}

// ---------- hreflang tags (waarmee Google de taalversies koppelt) ----------
function buildHreflangTags() {
  const lines = config.languages.map(
    (lang) => `<link rel="alternate" hreflang="${lang.hreflang}" href="${config.baseUrl}${lang.urlPath}">`
  );
  const defaultLang = config.languages.find((l) => l.code === config.defaultLang);
  lines.push(`<link rel="alternate" hreflang="x-default" href="${config.baseUrl}${defaultLang.urlPath}">`);
  return lines.join('\n');
}

// ---------- pathPrefix: hoe diep het bestand van de root staat (voor css/js/home-links) ----------
function pathPrefixFor(lang) {
  const depth = lang.outFile.split('/').length - 1; // bv. "nl/index.html" -> 1
  return '../'.repeat(depth);
}

// ---------- taalwissel-links (naar elke andere taalversie, relatief) ----------
function linkTo(fromLang, toLang) {
  const prefix = pathPrefixFor(fromLang);
  if (toLang.code === config.defaultLang) {
    return prefix === '' ? './' : prefix;
  }
  return prefix + toLang.code + '/';
}

function buildLangSwitch(fromLang, variant) {
  return config.languages
    .map((toLang) => {
      const href = linkTo(fromLang, toLang);
      const current = toLang.code === fromLang.code ? ' aria-current="true"' : '';
      return `<a href="${href}"${current}>${toLang.code.toUpperCase()}</a>`;
    })
    .join('');
}

// ---------- build ----------
function build() {
  const template = fs.readFileSync(path.join(ROOT, 'template.html'), 'utf8');
  const hreflangTags = buildHreflangTags();
  const sitemapEntries = [];

  config.languages.forEach((lang) => {
    const contentPath = path.join(ROOT, 'content', `${lang.code}.json`);
    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

    const data = {
      ...content,
      pathPrefix: pathPrefixFor(lang),
      hreflangTags,
      langSwitchDesktop: buildLangSwitch(lang, 'desktop'),
      langSwitchMobile: buildLangSwitch(lang, 'mobile'),
    };

    const html = render(template, data);
    const outPath = path.join(ROOT, lang.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('geschreven:', lang.outFile);

    sitemapEntries.push(`  <url>\n    <loc>${config.baseUrl}${lang.urlPath}</loc>\n  </url>`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  console.log('geschreven: sitemap.xml');
}

build();
