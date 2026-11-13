---
name: ai-patterns-audit
description: Évite et audite les marqueurs actuels de « design généré par IA » dans une interface (HTML, CSS, JS, gabarits, textes). À lire AVANT de concevoir ou d'écrire tout front-end (references/regles.md dit quoi faire à la place), et à lancer en audit après toute création ou modification de front-end, ou quand l'utilisateur demande « vérifie les patterns IA », « est-ce que ça fait généré », « de-slop ». Rafraîchit la liste des marqueurs par une recherche web datée du mois en cours.
---

# Audit des marqueurs de design généré par IA

Objectif : que chaque choix visible ait été décidé par quelqu'un. Un marqueur signale un choix par
défaut ; il ne prouve rien sur l'origine de la page. Ce qui compte, c'est l'accumulation.

Les chemins ci-dessous sont relatifs au dossier de ce skill.

## 0. Avant de concevoir (mode prévention)

Quand la tâche est de créer ou de modifier une interface, lire `references/regles.md` et la grille de
`references/patterns.md` avant le premier fichier, et choisir la forme en conséquence : hiérarchie
typographique plutôt que cartes, un effet par écran lié à une donnée, arrivée progressive qui reste.
L'audit (étapes 1 à 5) vient ensuite et s'ajoute à ce choix initial.

## 1. Rafraîchir la liste des marqueurs (à chaque lancement)

1. Lis `references/patterns.md` et sa date de mise à jour.
2. Lance 2 ou 3 recherches web, datées du mois et de l'année en cours, par exemple :
   - `AI generated website design tells <mois> <année>`
   - `AI slop UI patterns to avoid <année>`
   - `AI writing tells copywriting <année>`
3. Ajoute à `references/patterns.md` les marqueurs nouveaux ou en hausse, avec leur source (URL) et la
   date. Ne recopie pas un marqueur déjà présent. Si une source est un vendeur d'outil, note-le. Une
   piste vue dans une seule source commerciale va dans « Vus sans être ajoutés ».
4. Ajoute une ligne au « Journal des relances » : date, recherches, ce qui a été ajouté ou écarté.
5. Si la recherche web est indisponible, dis-le et continue avec la liste existante.

## 2. Scanner automatiquement

```bash
python3 scan.py            # fichiers front modifiés ou non suivis (git)
python3 scan.py dist/      # un dossier : sources ou site construit
```

Lance la commande depuis la racine du projet audité, avec le chemin complet de `scan.py`. Le scanner
repère ce qui se détecte par motif (police par défaut, dégradés décoratifs, capitales espacées,
séparateurs « · », flèches « → », fondus à l'apparition, chiffres ronds, tournures « pas X mais Y »…).
Ses résultats sont des pistes à vérifier à l'œil.

## 3. Audit visuel (ce qu'un motif ne voit pas)

Prends des captures de l'accueil et d'une page de contenu, en sombre et en clair si le site a deux
thèmes, à 360 et 1440 px, et passe la grille de `references/patterns.md`. Cherche en priorité :
- un titre qui ne se lit pas tel quel sans mise en forme (copier-coller, aperçu de partage) ;
- un mot isolé en italique, en gras ou en couleur dans un titre ;
- des effets « partout » (lueurs, dégradés, ombres, survol qui soulève chaque carte, fondus à chaque bloc) ;
- des chiffres non sourcés ou ronds, des libellés génériques, des boutons de même poids ;
- une structure en cartes identiques pour des contenus qui n'ont pas la même importance.

## 4. Corriger, puis prouver

1. Classe les constats : bloquant (trompe ou gêne la lecture), majeur (marqueur évident), mineur.
2. Corrige les bloquants et les majeurs à la source, en respectant les règles du projet
   (accessibilité, mouvement réduit, conventions du dépôt).
3. Ce que l'utilisateur a explicitement demandé reste, même si c'est un marqueur : signale-le sans
   le retirer.
4. Reconstruis, relance le scanner, refais une capture, vérifie les contrastes.
5. Remplacer un défaut par un autre défaut ne corrige rien : le remède vient du contenu du projet.

## 5. Rapport

Court, dans la langue de l'utilisateur : marqueurs corrigés, marqueurs gardés et pourquoi, nouveaux
marqueurs ajoutés à la liste (avec leurs sources en liens).
