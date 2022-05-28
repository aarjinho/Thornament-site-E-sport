# Thornament

Thornament est un site web qui permet à n'importe quel utilisateur de creer et rejoindre un tournois sur une selection de jeux vidéos.
Les tournois sont personnalisable à 100% (titre, taille, jeu, format plateforme etc...). 
La gestion du tournoi est automatique :  l'utilisateur appuie sur le bouton "i won" ou "i lost" et le bracket se met automatiquement à jour et creer les nouveaux matchs et rounds en fonction des resultats.

Fonctionnalitées : 
- inscription
- connexion
- deconnexion
- rejoindre un tournois public (en equipe / en solo)
- rejoindre un tournois privé (en equipe / en solo)
- quitter un tournoi
- creer un tournois privé
- creer un tournois public
- en tant qu'organisateur : demarrer son tournoi
- en tant qu'organisateur d'un tournoi : exlures des equipes
- en tant que participant à un tournoi : exprimer sa victoire/sa defaite.
- contacter les admins via un formulaire.
- voir un historique de ses tournois rejoins
- voir un historique de ses tournois crées


## Demo en live 
www.thornament.com

## Installation 

#### Node.js:

Windows & Mac
- https://nodejs.org/en/download/

Linux
```bash
  sudo apt install curl
  curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs

```

#### Projet:
```bash
git clone -b master https://gitlab.sjeannin.com/e2/thornament.git nom_projet
cd nom_projet
```
Installation de React et  des Dépendances

```bash
npm install react
```
```bash
npm install react-dom
```
```bash
npm install react-scripts
```
Bootstrap
```bash
npm install react-bootstrap
```
Markdown Reader
```bash
npm install react-markdown 
```
```bash
 npm install remark-gfm 
```
Bracket
```bash
 npm install @g-loot/react-tournament-brackets 
```
Fontawesome
```bash
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
 ```
## Lancer le Projet

```bash
  npm start
```


## Tech Stack

**Site:** React, Bootstrap

**Base de données:** Firebase, Express


## Create By

- Yahya
- Sahli Mootez
- Ayoub 
