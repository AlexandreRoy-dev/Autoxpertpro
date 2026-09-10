# AutoXpert

Prototype bilingue (fr-CA / en) pour comparer des pièces d’auto auprès de plusieurs marchands et gérer un garage + carnet d’entretien. Données fictives, panier sans paiement.

## Local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) — la racine redirige vers `/fr/`.

## GitHub Pages (pas de VPS)

Ce site est exporté en HTML statique (`output: "export"`). **GitHub Pages suffit.** Un VPS n’est pas requis pour le prototype.

Un VPS (ou un backend type Vercel + base de données) ne devient utile que plus tard : vrais comptes, APIs marchands, paiement, stocks en direct.

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construit le dossier `out/` et le publie via GitHub Pages. Pages sert `index.html`, **pas** le README.

1. Poussez le dépôt sur GitHub.
2. Settings → Pages → Source : **GitHub Actions**.
3. Après le workflow, le site est à `https://<compte>.github.io/<nom-du-repo>/`.

Si vous branchez un domaine personnalisé, videz `NEXT_PUBLIC_BASE_PATH` dans le workflow (laissez la variable vide) pour que les URLs partent de `/`.
