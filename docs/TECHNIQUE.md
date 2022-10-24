# Partie technique

## Architecture

L'architecture du projet est décrite dans le fichier ```docs/Architecture.pdf``` ou alors via Figma : https://www.figma.com/file/P7wwaswyUXCcbBPLqaTSeY/FlexSante?node-id=0%3A1

### Architecture backend

Le backend est un projet NestJS (https://nestjs.com/) avec une base de données MongoDB (https://www.mongodb.com/fr-fr) qui communique via les méthodes du package mongoose (https://mongoosejs.com/). <br>
NestJS est un framework NodeJS permettant de structurer et accélerer le développement d'APIs.
Nous l'avons choisi car rapidement une API NodeJS a tendance à devenir brouillon et difficile à maintenir. Ce framework fournit un cadre que l'on est fortement recommandé de suivre. <br>
De plus, il facilite grandement la gestion des routes, de la base de données et des différents types de tests. 
Les tests sont écrits avec Jest (https://jestjs.io/). C'est une base de test mise en place automatique par NestJS. <br>
Nous avons choisi mongodb car c'est une base de données NoSQL qui est très simple à mettre en place et à utiliser. <br> En effet, avec une API RESTful en NodeJS et un front en ReactJS, il est plus simple de passer par une base de données NoSQL qui stocke des objets JSON. <br>

### Architecture frontend

Le frontend est un projet ReactJS (https://fr.reactjs.org/) avec ViteJS (https://vitejs.dev/) comme bundler. Notre objectif étant de créer une PWA, nous avons choisi ReactJS car il est parfaitement adapté à ce but.<br> 
Nous avons choisi ViteJS plutôt que Webpack comme bundler car c'est un empaqueteur plus rapide et plus léger. <br>
En plus de celà, nous avons installé MUI (https://mui.com/) pour faciliter la création de composants et de pages. MUI est une librairie React qui fournit des composants prêts à l'emploi.
Cela nous permet de gagner du temps et de nous concentrer sur le reste du développement. <br>
Enfin, afin de gérer les informations et les états de notre application, nous avons installé Redux (https://redux.js.org/). Redux est un gestionnaire d'état qui permet de gérer les données de manière centralisée et de les partager entre les composants. Associé à Redux-Saga (https://redux-saga.js.org/), il permet de gérer efficacement et sans effet de bord les requêtes asynchrones.

### Docker 

Chacun des projets (backend et frontend) possède un fichier Dockerfile permettant de créer une image Docker. 
Ces images sont ensuite utilisées pour créer des conteneurs Docker qui sont orchestrés par Docker Compose sur le serveur de production.

### Pipeline

Lors d'un déploiement sur la branche master, la pipeline de déploiement est déclenché. Il s'agit d'une pipeline Github Actions qui permet de construire les images Docker et de les publier sur le DockerHub. <br />
En parallèle, un webhook déclenche une action sur le serveur de production qui construit ses images Docker et les lance dans des conteneurs Docker orchestrés par Docker Compose.


## Installation

### Prérequis

#### Pour une installation via Docker

- Docker (https://docs.docker.com/get-docker/)

#### Pour une installation manuelle

- NodeJS (https://nodejs.org/en/download/)
- MongoDB (https://docs.mongodb.com/manual/installation/)

### Lancement

#### Via Docker

- Cloner le projet
- Se placer dans le dossier du projet
- Lancer ```docker compose build```
- Lancer ```docker compose up```
- Le front est accessible à l'adresse ```http://localhost:4000```
- L'API est accessible à l'adresse ```http://localhost:3000```

#### Manuellement

- Cloner le projet
- Se placer dans le dossier du projet
- Copier les fichiers ```.env.example``` en ```.env``` dans les dossiers ```front``` et ```back```
- Se placer dans le dossier ```back```
- Lancer ```npm install``` puis ```npm run start:dev```
- Dans un autre terminal, se placer dans le dossier ```front```
- Lancer ```npm install``` puis ```npm run dev```

