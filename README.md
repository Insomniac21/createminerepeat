# CreateMineRepeat — site web statique

Site vitrine du serveur **CreateMineRepeat** (serveur québécois pour Minecraft Bedrock, basé à Montréal).
HTML + CSS purs, aucune étape de compilation. Un petit script JavaScript (`assets/site.js`) gère la bascule FR/EN, le menu mobile et les boutons « Copier ». Sans JavaScript, le site s'affiche en français et reste utilisable.

> CreateMineRepeat n'est pas un produit officiel Minecraft. Non approuvé par Mojang ou Microsoft, ni associé à eux.

## Structure

```
index.html            Accueil : présentation, infos de connexion (adresse + port avec boutons Copier), guide Bedrock, modes, teaser créateurs, contact
regles-et-prix.html   Règles et prix (page publique obligatoire ; prix indicatifs tant que la boutique n'est pas ouverte)
createurs.html        Programme créateurs (créer → soumettre → publier ; rémunération à venir)
jeux.html             Vitrine des jeux de la communauté (vide pour l'instant ; modèle de carte en commentaire)
confidentialite.html  Avis de confidentialité (Loi 25)
404.html              Page introuvable
assets/style.css      Thème nuit (bleu profond / violet, accents cyan)
assets/site.js        Bascule FR/EN (mémorisée dans localStorage, ou ?lang=en), menu mobile, copier
assets/lantern.svg    Icône (lanterne pixel originale, aucun art officiel)
.nojekyll             Désactive Jekyll sur GitHub Pages
```

### Bilingue
Chaque texte existe en deux versions : `<span class="fr">…</span><span class="en">…</span>` (ou `<div>`). Le CSS masque la langue inactive selon `html[data-lang]`. Pour modifier un texte, changez **les deux** versions. Lien direct en anglais : `…/index.html?lang=en`.

### Ajouter plus tard les comptes créateurs / tableau de bord
- Chaque page contient dans le menu le lien « Mon compte » (`<li class="nav-slot" id="nav-account">`) vers https://compte.createminerepeat.com/ (comptes CMR, VIP Patreon, pièces CMR ; Cloudflare Worker, code dans le dépôt cmr-local, `web/comptes`). Pas de gabarit commun : modifier les 6 pages.
- GitHub Pages ne sert que des fichiers statiques : un vrai système de comptes demandera un service externe (ex. backend séparé, Supabase/Firebase, ou authentification Xbox via un serveur à vous). Le site peut rester ici et appeler ce service.
- L'en-tête et le pied de page sont répétés dans chaque fichier HTML (pas de gabarit) : modifiez-les partout, ou passez à un générateur (Eleventy, Jekyll) si le site grossit.

## Déployer sur GitHub Pages

1. Créez un dépôt public nommé **`createminerepeat`** sur GitHub (compte `insomniac21`).
2. Envoyez le contenu de ce dossier à la racine du dépôt :
   ```bash
   cd /workspace/cmr-site
   git init
   git add .
   git commit -m "Site CreateMineRepeat"
   git branch -M main
   git remote add origin https://github.com/insomniac21/createminerepeat.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Build and deployment → Source : Deploy from a branch**, branche **`main`**, dossier **`/ (root)`**, puis **Save**.
4. Après 1–2 minutes, le site est en ligne à **https://insomniac21.github.io/createminerepeat/**
   - Règles et prix : https://insomniac21.github.io/createminerepeat/regles-et-prix.html
5. (Optionnel) Domaine personnalisé : Settings → Pages → Custom domain, puis ajoutez un enregistrement DNS `CNAME` vers `insomniac21.github.io`. Cochez **Enforce HTTPS**.

Tous les liens internes sont relatifs : le site fonctionne dans le sous-dossier `/createminerepeat/`, sur un domaine personnalisé ou en local.

## Tester en local

```bash
cd /workspace/cmr-site
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/
```

## À mettre à jour régulièrement
- `regles-et-prix.html` : prix définitifs, lien vers l'historique d'achats et la politique de remboursement **avant** l'ouverture de la boutique ; date de « Dernière mise à jour ».
- `jeux.html` : ajouter une carte par jeu publié (avec l'accord du créateur, et du parent pour un mineur).
- `createurs.html` : détails du programme de rémunération une fois l'entente finalisée.
