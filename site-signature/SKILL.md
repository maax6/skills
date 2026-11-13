---
name: site-signature
description: Refonte d'un site personnel ou d'un portfolio avec une scène d'accueil propre à son auteur et une mise en page qui tient du téléphone de 320 px à l'écran 4K. À utiliser quand l'utilisateur dit « refais mon site », « je veux un accueil qui marque », « rends ça beau sur grand écran », « vérifie le responsive », ou travaille sur l'accueil, une scène animée ou la grille de son site. Découvre la pile technique du projet avant de proposer quoi que ce soit.
---

# Site signature

Tu aides quelqu'un à refaire son site personnel. Le résultat visé : un premier écran qu'on ne voit
nulle part ailleurs, et une page qui reste juste sur un petit téléphone, un portable, un écran 21:9
et une télévision.

Ce skill décrit une façon de décider. Il ne fournit ni gabarit, ni palette, ni scène toute faite :
tout cela sort de la personne et de son contenu.

## Comment on décide

Quatre choix, pris dans cet ordre, chacun validé par la personne avant le suivant.

1. **Le contenu d'abord.** On lit ce que le site dit déjà et on repère ce qui est singulier : une
   phrase, un chiffre, un parcours, une rubrique que les autres sites n'ont pas. La refonte lui donne
   plus de place.
2. **Une scène, tirée de sa vie.** Un lieu, un objet ou un phénomène que la personne connaît de
   près, dessiné par du code, dans une seule matière graphique.
3. **Une donnée vraie dans la scène.** Quelque chose de calculé ou de mesuré, exact à l'instant où on
   regarde. C'est ce détail qui fait revenir.
4. **Des plages, jamais des valeurs fixes.** Chaque taille a un minimum et un maximum, et la page
   réagit à sa forme (étroite, large, basse).

Les chiffres trient les problèmes. Les captures d'écran, regardées par la personne, tranchent.

## Fichiers

- `references/decouverte.md` : identifier la pile technique, mesurer le site existant, relever ce
  qu'on garde. À faire en premier.
- `references/scene.md` : trouver la scène avec la personne et la construire.
- `references/responsive.md` : les règles de mise en page et de rendu sur tous les écrans.
- `scripts/check-viewports.mjs` : passe une URL sur dix tailles d'écran, sort les défauts mesurables
  et une capture par taille.

Si le skill `ai-patterns-audit` est installé, lis ses `references/regles.md` avant d'écrire du
front-end et lance son audit à la fin.

## Déroulé

1. **Découvrir** : pile technique, organisation du dépôt, commandes de développement et de
   déploiement, fonctions existantes à préserver (`references/decouverte.md`).
2. **Mesurer avant de toucher** : lance le script sur le site en ligne ou sur le serveur local et
   garde les captures comme point de départ. Résume à la personne ce qui est déjà bon et ce qui
   bride le site, mesures à l'appui.
3. **Trouver la scène** : pose les questions de `references/scene.md`, une par message. Propose
   ensuite trois pistes de deux phrases chacune. Aucun code avant son choix. Si le site a déjà une
   scène à lui, elle reste : passe-la au crible des quatre conditions et des règles de dessin du
   même fichier, et corrige seulement ce qui manque (recadrage en portrait, donnée vraie, pause
   hors écran).
4. **Construire l'accueil** : la scène en plein écran, le nom, deux phrases, les liens. Le reste du
   contenu commence sous le premier écran.
5. **Reprendre le reste de la page**, section par section, avec `references/responsive.md`.
6. **Vérifier** : script sur le serveur local, lecture des captures une par une, puis navigation au
   clavier seul, puis mouvement réduit. Montre les captures, la personne tranche à l'œil.

## Ce qui ne bouge pas sans accord

- Les textes de la personne. On les déplace et on les hiérarchise ; une réécriture se demande.
- Les chiffres : exacts, jamais arrondis ni gonflés.
- Ce qui fonctionne déjà : langues, thèmes clair et sombre, formulaire, mesure d'audience et son
  consentement, flux RSS, routes d'API, référencement.
- La pile technique en place. On en change seulement si la personne le demande.

## Ce qu'on s'interdit

- Reprendre la scène d'un autre site, même admiré. Une piste qui ressemble à une référence connue
  est écartée.
- Une grille de cartes identiques pour une liste de projets ou d'articles. Une entrée se lit comme
  du texte composé : le chiffre ou l'année en grand, le titre, une ligne de conséquence.
- Une étiquette en capitales espacées au-dessus de chaque bloc. Une par écran au plus, quand elle
  porte une information.
- Le même fondu-montée sur chaque section, un survol qui soulève, un halo qui pulse.
- Un dégradé ou une lueur décorative hors de la scène.
- Une dépendance lourde pour la scène. Un canvas 2D ou un shader court suffisent ; une bibliothèque
  3D seulement si la piste retenue est vraiment en volume.
- Commiter, pousser ou déployer sans que la personne l'ait demandé.

## Quand c'est fini

- Le script ne signale aucun débordement horizontal sur les dix tailles.
- À 2560 et 3840 px de large, la scène occupe tout l'écran et le texte garde une longueur de ligne
  lisible.
- À 375 px, le nom et la phrase d'accroche se lisent sans défilement, bandeaux éventuels ouverts.
- Avec `prefers-reduced-motion`, la scène montre une image fixe complète.
- Sans JavaScript, le premier écran affiche le nom, l'accroche et les liens.
- La personne a regardé les captures et reconnaît son site.
