# Skills

Deux skills pour agents de code (Claude Code et compatibles), écrits en français.

| Skill | À quoi il sert |
|---|---|
| [`site-signature`](site-signature/SKILL.md) | Refaire un site personnel : une scène d'accueil propre à son auteur, une mise en page qui tient de 320 px à la 4K. Découvre la pile technique du projet, fournit un script de contrôle sur dix tailles d'écran. |
| [`ai-patterns-audit`](ai-patterns-audit/SKILL.md) | Éviter puis auditer les marqueurs de « design généré par IA » : liste datée et sourcée, règles de conception, scanner par motifs. |

Les deux vont ensemble : `site-signature` lit les règles d'`ai-patterns-audit` avant d'écrire du
front-end et lance son audit à la fin.

## Installation

```bash
git clone https://github.com/maax6/skills.git
```

```bash
cp -R skills/site-signature skills/ai-patterns-audit ~/.claude/skills/
```

Pour un seul projet, copie-les dans `.claude/skills/` à la racine du dépôt.

## Utilisation

Dans le dépôt de ton site, dis à l'agent « refais mon site » ou « vérifie le responsive ». Après une
modification d'interface : « vérifie les patterns IA ».

Le script de contrôle demande Node et Playwright :

```bash
npm i -D playwright
```

```bash
node ~/.claude/skills/site-signature/scripts/check-viewports.mjs http://localhost:4321 captures
```

Le scanner de marqueurs demande Python 3, sans dépendance :

```bash
python3 ~/.claude/skills/ai-patterns-audit/scan.py src/
```
