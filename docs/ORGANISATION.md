# Organisation du projet

Le projet est découpé en trois grandes parties :
- Le développement du serveur (backend).
- Le développement du site web (frontend).
- Le processus de construction et de déploiement automatique.

Le développement du serveur est découpé en plusieurs parties : 
- La gestion des utilisateurs (authentification, création de compte, etc.)
- La gestion du cercle personnel (ajout de membres, gestion des notifications, etc.)
- La gestion des données de santés (formulaire de santé, génération de données, etc.)
- Les tests unitaires

Le développement du site web est découpé en plusieurs parties :
- Les pages d'authentification (connexion, inscription)
- Le dashboard (page d'accueil) composé de plusieurs onglets : 
  - Informations personnelles
  - Affichage des données de santé
  - Formulaire de santé
  - Gestion du cercle personnel
- Création d'une PWA

Le processus de construction et de déploiement automatique est découpé en plusieurs parties :
- Création des Dockerfiles pour l'API et le site web
- Création d'un fichier docker-compose.yml pour orchester les conteneurs
- Création d'une action Github pour la construction automatique des images et la publication sur le Docker Hub
- Mise en place d'un webhook pour le déploiement automatique sur le serveur


## Répartition du travail

La répartition des tâches est visible en détail sur le kanban Github du projet. 
Chaque tâche est assignée à un membre du groupe. Elle possède des labels qui permettent de la catégoriser. Elle rejoint un milestone qui permet de la regrouper avec d'autres tâches.
Les tâches complexes sont complétés par une description. <br>

Nous avons deux milestones. Le premier correspond à la partie installation et authentification (création des repos, initialisation des projets, première fonctionnalités...). Le second milestone correspond au développement des fonctionnalités nécessaire à la livraison d'une MVP. <br>

Globalement :
- Le développement des Dockerfile, du fichier docker-compose.yml et de l'action Github est un travail commun. 
  - La mise en place du déploiement automatique est réalisé par Pierre-Adrien Vasseur (Pierrad)
- Le backend est développé par Pierre-Adrien Vasseur (Pierrad).
- Le frontend est développé par Dylan Lafaire (Dragun06), Matis Terzi (Tryns) et Pierre-Adrien Vasseur (Pierrad).
  - Dylan Lafaire (Dragun06) et Matis Terzi (Tryns) se sont occupés majoritairement du développement avec Pierre-Adrien Vasseur (Pierrad) en support.
