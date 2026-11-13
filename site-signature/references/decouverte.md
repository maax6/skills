# Découvrir le projet

Rien n'est supposé. La pile, les commandes et les conventions se lisent dans le dépôt.

## Identifier la pile

| Indice dans le dépôt | Pile | Où monter du code navigateur |
|---|---|---|
| `astro.config.*` | Astro | `<script>` dans un composant `.astro`, ou une île avec `client:visible` |
| `next.config.*`, dossier `app/` | Next.js, App Router | composant marqué `'use client'`, montage dans `useEffect` |
| `next.config.*`, dossier `pages/` | Next.js, Pages Router | composant React, montage dans `useEffect` |
| `nuxt.config.*` | Nuxt | `onMounted` dans un composant, ou `<ClientOnly>` |
| `svelte.config.*` | SvelteKit | `onMount` |
| `vite.config.*` avec React, Vue ou Svelte | application Vite | cycle de vie du composant |
| `gatsby-config.*`, `remix.config.*`, `react-router.config.*` | Gatsby, Remix, React Router | `useEffect` |
| `hugo.toml`, `_config.yml`, `.eleventy.js`, `mkdocs.yml` | Hugo, Jekyll, Eleventy, MkDocs | `<script type="module">` dans le gabarit de l'accueil |
| `index.html` sans outil de build | HTML statique | `<script type="module">` |
| `wp-content/`, `functions.php` | WordPress | script mis en file par le thème enfant |

Relève aussi :

- le gestionnaire de paquets, d'après le fichier de verrou (`pnpm-lock.yaml`, `package-lock.json`,
  `yarn.lock`, `bun.lockb`) ;
- les commandes de développement, de build et de test dans `package.json`, le `README` ou un
  `Makefile` ;
- la façon dont le CSS est écrit : Tailwind, modules CSS, CSS global, Sass, styles dans les
  composants. La refonte garde cette façon ;
- TypeScript ou JavaScript ;
- où vit le contenu : Markdown, fichiers de données, CMS, base ;
- l'hébergement et le déploiement (`vercel.json`, `netlify.toml`, workflows GitHub, `wrangler.toml`,
  script maison), et une éventuelle politique de sécurité du contenu qui restreindrait les scripts ;
- les fichiers d'instructions pour agents (`CLAUDE.md`, `AGENTS.md`) et la documentation du projet.

Si le site est sur un constructeur fermé (Wix, Squarespace, Webflow, Framer) et qu'aucun dépôt
n'existe, dis-le tout de suite : la scène en code y est limitée à un bloc d'intégration, et la
personne doit choisir entre rester ou migrer.

En cas de doute sur l'API d'un framework, lis sa documentation à jour plutôt que de t'en remettre à
ta mémoire.

## Inventorier ce qui existe

Ouvre le site et note, avec les mots de la page :

- ce qui est singulier dans le contenu : formulation, chiffre, rubrique, parti pris ;
- les fonctions à préserver : langues, thèmes, formulaires, consentement, pages annexes, routes
  d'API, flux, balises de partage ;
- les variables CSS, les polices et la couleur d'accent déjà choisies. On les garde par défaut ;
- la matière personnelle utilisable pour la scène : lieux, objets, métiers, dates.

## Mesurer

```bash
npm i -D playwright
```

```bash
node scripts/check-viewports.mjs https://exemple.fr captures-avant
```

Adapte la commande d'installation au gestionnaire de paquets du projet. Complète avec ce que le
script ne voit pas, dans la console du navigateur ou dans le code :

- la largeur maximale du conteneur principal ;
- la liste des points de rupture réellement utilisés ;
- la taille du titre principal à 375, 1440 et 2560 px ;
- le nombre d'animations et de canvas ;
- le poids de la page et des scripts.

## Rendre compte

Un message court à la personne, en deux parties : ce qui est déjà bon et qu'on garde, ce qui bride
le site avec la mesure et la conséquence visible. Exemple de forme :

| Constat | Mesure | Conséquence |
|---|---|---|
| Colonne plafonnée | conteneur à 960 px | à 2560 px, le contenu occupe un tiers de l'écran |
| Titre fixe | `h1` à 48 px partout | même taille sur un portable et sur une télévision |
| Cibles tactiles basses | 18 liens sur 20 sous 44 px à 375 px | difficile à toucher au pouce |

Les valeurs du tableau sont des exemples de forme : ne rapporte que ce que tu as mesuré.
