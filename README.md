# Les Mystérieuses Aventures de Claude Conseil

Site officiel du court-métrage de Marie-Lola Terver et Paul Jousselin.

**En ligne : [claudeconseil.fr](https://claudeconseil.fr)**

Le site reprend l'interface d'un bureau Windows XP : chaque rubrique
(présentation, photos, générique, sélections et prix, critiques) s'ouvre
comme une fenêtre d'application.

---

## Pile technique

| | |
|---|---|
| Framework | React 16 + Create React App (`react-scripts` 5) |
| Styles | styled-components |
| Traductions | i18next (français / anglais) |
| Base de données | Firebase (projet `claude-conseil`) |
| Mesure d'audience | Google Analytics (`G-SGHXTLN7VW`) |
| Hébergement | **Netlify** |
| DNS | Netlify DNS (serveurs de noms NS1 `*.nsone.net`) |

Ce dépôt est un fork de [ArvalF/winXP](https://github.com/ArvalF/winXP),
lui-même dérivé de [ShizukuIchi/winXP](https://github.com/ShizukuIchi/winXP).

---

## Développement

```
npm install
npm start
```

Le site est servi sur http://localhost:3000.

Un fichier `.env` (non versionné, et qui doit le rester) fournit les
variables du formulaire de contact : `EMAIL_USER`, `EMAIL_PASS`,
`EMAIL_TO`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `PORT`.

---

## Déploiement

Netlify reconstruit le site **depuis les sources** à chaque déploiement.

Le dossier `build/` n'est donc **pas** versionné (il figure dans
`.gitignore`). Il ne faut pas le committer : une version partielle de ce
dossier a longtemps traîné dans l'historique et ne correspondait plus à
rien.

La commande de build est définie dans l'interface Netlify
(*Site settings → Build & deploy*), pas dans `netlify.toml`, pour éviter
que les deux réglages divergent.

`netlify.toml` ne contient que le dossier à publier, les en-têtes de
sécurité et les règles de cache.

### Certificat HTTPS

Le certificat Let's Encrypt est renouvelé automatiquement par Netlify
tous les deux mois environ.

**En cas d'alerte de sécurité dans le navigateur**, c'est que le
renouvellement automatique a échoué et que Netlify sert son certificat
générique `*.netlify.app` à la place. La marche à suivre :

*Netlify → le site → Domain management → HTTPS → **Renew certificate***
(ou *Verify DNS configuration* puis *Provision certificate*).

Pour vérifier la date d'expiration du certificat servi :

```
echo | openssl s_client -connect claudeconseil.fr:443 -servername claudeconseil.fr 2>/dev/null | openssl x509 -noout -subject -dates
```

Le champ `subject` doit mentionner `claudeconseil.fr`. S'il indique
`*.netlify.app`, le certificat du domaine est absent ou expiré.

---

## Licence

Le nom, les visuels et la marque Windows XP appartiennent à Microsoft.
La base technique de ce projet est fournie à des fins éducatives et n'est
ni affiliée à Microsoft ni approuvée par Microsoft. Voir `LICENSE`.
