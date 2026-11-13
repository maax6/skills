# La scène d'accueil

Le premier écran est une image qui vit : quelque chose que la personne connaît, dessiné par du code,
avec un détail exact à l'instant où on regarde. Ce détail fait dire « attends, c'est réel ? » et
donne une raison de revenir.

## Trouver la scène

Questions à poser, une par message, en rebondissant sur les réponses :

1. Quel endroit tu pourrais dessiner de mémoire ?
2. Qu'est-ce que tu regardes par la fenêtre quand tu réfléchis ?
3. De tout ce que tu as fait, quelle image te reste en tête : un écran, une salle, un objet ?
4. Hors du travail, qu'est-ce qui te prend tes week-ends ?
5. Quelle donnée vivante te ressemble : une heure, une météo, un trafic, un score, une position ?

Croise les réponses avec l'inventaire du contenu, puis écris trois pistes de deux phrases chacune.
Chaque piste nomme le sujet, la matière graphique et la donnée vraie. La personne en choisit une, en
mélange deux ou les refuse toutes ; dans ce dernier cas, repars de ses objections.

Une bonne scène remplit quatre conditions :

- **Elle est à la personne.** Quelqu'un qui la connaît reconnaît la scène.
- **Elle a une matière.** Un seul traitement graphique, tenu partout : trait au crayon, aplats,
  trame d'impression, points, caractères, plan technique, pixels, papier découpé. Il s'accorde avec
  la police et la couleur d'accent du site.
- **Elle porte une donnée vraie**, calculée dans le navigateur ou servie par le site : l'heure
  locale de plusieurs villes, la saison, la marée, la position d'un astre, le vent du jour, un
  compteur propre au site. Une donnée qui demande un service tiers a un repli quand il ne répond pas.
- **Elle se recadre.** Elle reste juste en portrait étroit, en 16:9 et en 21:9. Une scène décrite
  par du code se recompose à chaque taille, là où une photo est seulement rognée.

## Une ambiance avant tout

Le squelette de code plus bas ne décrit que la plomberie du canvas. Il ne dit rien du dessin, et un
canvas vide invite à poser trois formes géométriques et un dégradé : ce résultat est un échec. La
scène est une ambiance, avec une heure, une lumière et une météo, où l'on aurait envie de rester.

Avant d'écrire le dessin, rédige pour la personne une note d'ambiance de cinq lignes et fais-la
valider :

- **Le moment** : l'heure, la saison, le temps qu'il fait.
- **La lumière** : d'où elle vient, sa couleur, ce qu'elle touche et ce qu'elle laisse dans l'ombre.
- **Les plans** : au moins trois profondeurs (lointain, milieu, premier plan), le lointain plus
  pâle et moins détaillé.
- **La palette** : cinq à huit couleurs nommées, tirées du moment choisi, dont l'accent du site.
- **Ce qui vit** : le mouvement principal, et deux ou trois détails qu'on ne remarque qu'à la
  deuxième visite.

Ce qui donne de la densité :

- du détail à trois échelles : les grandes masses, les objets, puis le grain (fenêtres, feuilles,
  rivets, étoiles) ;
- des irrégularités voulues : aucune rangée parfaitement alignée, aucun élément répété à
  l'identique ;
- une texture de matière sur toute l'image (grain, trame, joints, coups de pinceau), qui unifie
  les plans ;
- des sources de lumière situées dans la scène, qui éclairent ce qui les entoure.

Compte plusieurs centaines de lignes de dessin et plusieurs passes. Si la matière choisie se prête
mal au code (peinture, photo, illustration à la main), pars d'une image fournie ou validée par la
personne et fais-la vivre : calques extraits de l'image, shader léger sur l'eau, le ciel ou la
lumière. Le cycle de vie reste le même.

Test à chaque passe : une capture de la scène seule, sans le texte, tiendrait-elle comme fond
d'écran ? Tant que la réponse est non, continue le dessin avant de toucher au reste de la page.

## Construire la scène

Structure du premier écran, à traduire dans la pile du projet :

```html
<div class="scene-frame">          <!-- plein écran, sous le texte -->
  <canvas class="scene" aria-hidden="true"></canvas>
</div>
<header>…nom, navigation…</header>
<section class="hero">…h1, deux phrases, liens…</section>
```

Le texte est du HTML par-dessus le canvas. Il reste lisible sans JavaScript, sélectionnable, lu par
les lecteurs d'écran et par les robots.

Cycle de vie du canvas, quel que soit le dessin :

```ts
export function mountScene(canvas: HTMLCanvasElement) {
  const host = canvas.parentElement!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0, last = 0, ready = false;
  let tabVisible = !document.hidden, onScreen = true;

  function build() {
    const w = host.clientWidth, h = host.clientHeight;
    if (w < 2 || h < 2) return false;               // onglet chargé en arrière-plan : taille nulle
    const dpr = Math.min(devicePixelRatio || 1, 2); // plafond : un écran 4K ne quadruple pas le coût
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    // Composer ici, en unités relatives à h, avec une variante si w < h * 0.9.
    return true;
  }
  function frame(t: number) { /* dessiner l'état au temps t */ }

  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    if (t - last < 33) return;                      // 30 images par seconde, moins si le style le permet
    last = t; frame(t);
  };
  const start = () => {
    cancelAnimationFrame(raf);
    if (!ready) return;
    if (reduce.matches || !tabVisible || !onScreen) { frame(8000); return; } // image fixe complète
    raf = requestAnimationFrame(loop);
  };
  const rebuild = () => { ready = build(); start(); };

  let timer = 0, sized = false;
  const ro = new ResizeObserver(() => {
    if (!sized) { sized = true; rebuild(); return; }
    clearTimeout(timer); timer = window.setTimeout(rebuild, 150);
  });
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; start(); });
  io.observe(host);
  const onVisibility = () => { tabVisible = !document.hidden; start(); };
  document.addEventListener('visibilitychange', onVisibility);
  reduce.addEventListener('change', start);

  return () => {                                    // à appeler au démontage du composant
    cancelAnimationFrame(raf); clearTimeout(timer); ro.disconnect(); io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    reduce.removeEventListener('change', start);
  };
}
```

Le point de montage dépend de la pile : voir le tableau de `decouverte.md`. Dans un framework à
composants, appelle la fonction de nettoyage au démontage.

Règles de dessin :

- **L'unité est la hauteur de la scène.** Toute position et toute taille s'expriment en fraction de
  `h`. La scène garde ses proportions de 568 à 2160 px de haut.
- **La largeur ajoute du décor.** Sur un écran large on voit plus de paysage sur les côtés, les
  éléments gardent leur taille. Prévois de quoi remplir un 21:9.
- **Le portrait a sa composition.** Sous `w < h * 0.9`, déplace le sujet, change la ligne d'horizon,
  retire les éléments secondaires.
- **Le sujet évite le texte.** Place le sujet de la scène hors de la zone du titre et vérifie le
  contraste du texte sur chaque capture.
- **Un seul mouvement, lent.** Il tourne en boucle sans à-coup et s'arrête hors écran.
- **Tout est déterministe.** Un bruit pseudo-aléatoire à graine fixe redonne la même image à chaque
  reconstruction ; `Math.random()` ferait sauter le décor à chaque redimensionnement.
- **Les thèmes.** Si le site a un mode clair et un mode sombre, la scène lit les variables CSS ou a
  deux palettes, et se reconstruit quand le thème change.
- **Le poids.** Script de la scène sous 15 Ko compressé, chargé après le texte, servi depuis le
  site lui-même.
- **Le partage.** L'image d'aperçu (Open Graph, 1200 × 630) est une capture de la scène.
