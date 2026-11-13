# Tenir sur tous les écrans

Le principe : chaque valeur est une plage avec un minimum et un maximum, et la page se décrit par sa
forme (étroite, large, basse) plutôt que par une liste d'appareils.

Les valeurs ci-dessous sont des points de départ éprouvés. Écris-les dans le système de style du
projet (classes utilitaires, modules CSS, feuille globale) et ajuste-les sur les captures.

## Largeurs

- Conteneur de texte : `width: min(72rem, 100% - 3rem); margin-inline: auto;`, et `100% - 2rem` sous
  760 px.
- La scène et les fonds de section vont d'un bord à l'autre de l'écran. Seul le texte est contenu.
- Longueur de ligne : `max-width` entre 33rem (accroche) et 44rem (paragraphes).
- Au-dessus de 1600 px, donne un rôle à l'espace gagné : une seconde colonne (l'année et le chiffre
  à gauche, le récit à droite), des marges qui portent les métadonnées, un chiffre plus grand.
  Élargir le paragraphe ne compte pas.

## Hauteurs

- Premier écran : `min-height: 100svh`, avec `100vh` en repli sur la ligne précédente. `svh` tient
  compte de la barre d'adresse des téléphones.
- Espacements verticaux en `clamp(3.5rem, 9vh, 6rem)` : ils se resserrent sur un écran bas.
- Téléphone en paysage et fenêtres basses : `@media (max-height: 540px) and (min-aspect-ratio: 1/1)`.
  Réduis le titre, passe les liens sur une ligne, laisse la scène visible.
- Portrait : `@media (max-aspect-ratio: 1/1)` pour ce qui dépend de la forme de l'écran.

## Typographie

- Titre : `clamp(3rem, 8vw, 6.2rem)`, interlignage 1, approche négative légère.
- Titres de section : `clamp(1.7rem, 3.2vw, 2.4rem)`. Accroche : `clamp(1rem, 1.6vw, 1.15rem)`.
- Aucun texte sous 12 px.
- Sur un écran 4K regardé de loin, la taille de base peut monter :
  `html { font-size: clamp(100%, 0.55vw + 0.5rem, 137.5%); }` agrandit tout ce qui est en `rem` à
  partir de 1500 px environ. Vérifie le résultat à 2560 et 3840 px avant de garder la règle.
- Chiffres en `font-variant-numeric: tabular-nums`.

## Grilles

- Une liste datée : `grid-template-columns: 10rem 1fr`, qui passe à une colonne sous 760 px.
- Le premier élément d'une liste est plus grand que les suivants. L'importance se lit à la taille et
  à la place.
- Les entrées d'une liste n'ont pas le même poids. Demande à la personne lesquelles elle met en
  avant : deux ou trois en grand, les autres en lignes compactes.
- Les technologies ou mots-clés d'une entrée tiennent dans une phrase. Les rangées de pastilles
  disparaissent.
- Séparateurs : un filet d'un pixel. Une boîte avec fond et bord seulement autour d'un élément
  interactif.

## Toucher, clavier, préférences

- Cibles tactiles : 48 px de haut au minimum (`min-height: 48px` sur les boutons, zone de lien
  étendue par du padding).
- Effets de survol sous `@media (hover: hover)`.
- `a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` et un lien
  d'évitement en tête de page.
- `prefers-reduced-motion` : défilement instantané, scène figée.
- `env(safe-area-inset-*)` sur l'en-tête et le pied pour les écrans à encoche.
- Un bandeau de consentement fait partie de la mise en page du premier écran : à 375 px, le nom et
  l'accroche restent lisibles au-dessus de lui.

## Images

- `srcset` avec deux ou trois largeurs, `sizes` exact, dimensions déclarées pour éviter un saut de
  mise en page. Utilise le composant d'image du framework s'il en a un.
- Un portrait peut passer sous le premier écran ou entrer dans la scène.

## Vérifier

```bash
node scripts/check-viewports.mjs http://localhost:3000 captures
```

Remplace l'adresse par celle du serveur de développement du projet. Le script couvre dix tailles, de
320 × 568 à 3840 × 2160, dont un téléphone en paysage et un écran 21:9. Pour chacune il signale :
débordement horizontal, part de la largeur occupée par le texte, plus petit texte, nombre de cibles
tactiles trop basses, titre visible ou non au premier écran. Il enregistre une capture du premier
écran et une de la page entière, puis contrôle que rien ne bouge en mouvement réduit.

Ouvre les captures une par une et regarde : le titre respire-t-il, la scène est-elle bien cadrée,
reste-t-il un grand vide, le texte est-il lisible sur le décor ?

Une télévision 4K annonce souvent 1920 × 1080 avec une densité de 2. Le vrai test du grand écran de
salon est donc 1920 × 1080 vu à trois mètres : recule de ta chaise devant la capture.
