# Hypja — site vitrine

Site statique (HTML/CSS/JS, sans build step) pour Hypja, coaching en cohérence cardiaque.

## Structure
```
index.html      → toute la page (une seule page, sections ancrées)
css/style.css   → palette bleue, typographie, mise en page
js/main.js      → menu mobile
```

## À compléter avant mise en ligne
Marqué `<!-- TODO Erika: ... -->` dans le code :
- [ ] Formulaire de contact : remplacer `https://formspree.io/f/VOTRE_ID_FORMSPREE` par votre propre endpoint Formspree (même principe que sur dasgoe.be)
- [ ] FAQ : préciser si l'appareil est prêté entre les séances ou utilisé uniquement en cabinet
- [ ] FAQ : adresse ou format des séances (présentiel/visio)
- [ ] FAQ : politique d'annulation
- [ ] Footer : numéro d'entreprise (BCE) et mentions légales
- [ ] Nom de domaine : nom de marque "Hypja" à confirmer partout (titre, favicon, meta) si vous changez de nom

## Déployer sur GitHub Pages
1. Créez un repo GitHub (ex. `hypja-site`), poussez `index.html`, `css/`, `js/` et `README.md` en gardant cette structure de dossiers.
2. Repo → Settings → Pages → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
3. Le site sera disponible sur `https://[votre-user].github.io/hypja-site/`.
4. Pour un domaine personnalisé : Settings → Pages → Custom domain, puis configurez un enregistrement CNAME chez votre registrar (comme pour dasgoe.be chez Nomeo).

## Déployer sur Netlify (alternative, comme dasgoe.be)
1. New site from Git → sélectionnez le repo.
2. Build command : vide. Publish directory : `/`.
3. Domaine personnalisé et HTTPS gérés automatiquement par Netlify.

## Pas encore inclus
- Pas de cookie/analytics (Clarity, etc.) — à ajouter si besoin, comme sur dasgoe.be.
- Pas de JSON-LD structuré — à ajouter une fois le nom, l'adresse et les horaires confirmés.
- Pas d'images/photos — la page repose sur la typographie et un signe graphique (la ligne de cohérence dans le hero).
