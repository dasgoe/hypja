# Hypja — site vitrine (FR/NL/EN, generatiescript)

Statische site, gegenereerd vanuit één contentbron per taal. Geen build-tooling nodig behalve Node.js (dat je toch al hebt via `npm` op je systeem, of installeer gratis via nodejs.org).

## Structuur
```
template.html         → de ene HTML-structuur, met {{placeholders}}
content/fr.json        → alle Franse tekst
content/nl.json        → alle Nederlandse tekst
content/en.json        → alle Engelse tekst
build.js               → genereert index.html, nl/index.html, en/index.html + sitemap.xml
css/style.css           → gedeelde stylesheet (1x, voor alle talen)
js/main.js               → gedeeld menu-script (1x, voor alle talen)

# onderstaande bestanden worden GEGENEREERD door build.js — niet manueel bewerken
index.html              → FR (root/standaardtaal)
nl/index.html
en/index.html
sitemap.xml
```

## Workflow — belangrijk
1. Wijzig **enkel** de bestanden in `content/*.json` of `template.html`. Nooit rechtstreeks in `index.html`, `nl/index.html` of `en/index.html` werken — die worden overschreven bij de volgende build.
2. Voer uit in een terminal, in deze map:
   ```
   node build.js
   ```
3. Controleer de output (open `index.html` lokaal in je browser, of via GitHub Desktop > History > diff bekijken).
4. Commit en push **alles** — zowel de bronbestanden (`content/`, `template.html`, `build.js`) als de gegenereerde bestanden (`index.html`, `nl/`, `en/`, `sitemap.xml`). GitHub Pages/Netlify serveert enkel de gegenereerde HTML, maar de bronbestanden moeten mee in de repo staan zodat je later opnieuw kan bouwen.

## Vóór eerste publicatie
- [ ] `build.js` regel `baseUrl: 'https://hypja.be'` aanpassen naar je definitieve domeinnaam — dit wordt gebruikt in de hreflang-tags en sitemap.xml, cruciaal voor correcte taaldetectie door Google.
- [ ] Formulier-endpoint (`https://formspree.io/f/VOTRE_ID_FORMSPREE`) vervangen in `template.html` door je eigen Formspree-ID — geldt dan automatisch voor alle 3 talen.
- [ ] FAQ-items "à compléter" / "aan te vullen" / "to be confirmed" invullen in elk van de 3 content-bestanden.
- [ ] Ondernemingsnummer invullen in elk van de 3 content-bestanden (`footer.legal`).
- [ ] Herbouwen (`node build.js`) na elke wijziging aan `content/*.json`, vóór je commit.

## Waarom dit door Google wordt opgepikt
Elke taalversie staat op een eigen URL (`/`, `/nl/`, `/en/`) en elke pagina bevat `<link rel="alternate" hreflang="...">`-tags naar de andere taalversies. Dat is het mechanisme dat Google gebruikt om te weten welke taalversie aan welke gebruiker te tonen. `sitemap.xml` (automatisch gegenereerd) helpt Google alle taalversies sneller te ontdekken.

## Snelheid
Elke taalpagina is 100% statische HTML — geen JavaScript-taalwissel, geen extra downloadgewicht per taal. Laadtijd blijft gelijk aan de originele ééntalige versie, ongeacht hoeveel talen je toevoegt.

## Deployen
Zelfde als voorheen — zie de instructies uit de vorige versie (GitHub Pages of Netlify). Belangrijk: gebruik een **custom domain** (zoals dasgoe.be), niet een project-URL zoals `gebruiker.github.io/repo/` — anders breken de root-relatieve paden (`css/style.css`, `nl/`, `en/`).
