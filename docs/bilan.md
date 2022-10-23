# Bilan du projet

## Travail accompli

Les fonctionnalités suivantes ont été implémentées :
- Authentification (connexion, inscription, déconnexion)
- Visualisation des informations personnelles de l'utilisateur
- Visualisation des données de santé de l'utilisateur (graphiques)
  - Affichage différent selon le rôle de l'utilisateur (patient, proche, médecin, infirmier)
- Formulaire de santé (ajout de données de santé sur les ressenti du patient)
- Gestion du cercle personnel (ajout d'utilisateur, gestion des notifications)
- Génération automatique d'un an de données de santé pour tout les patients. 

La plateforme est une PWA installable sur mobile et ordinateur. 

Concernant la pipeline de déploiement, nous avons utilisé Docker, Docker compose et Github Actions pour générer des images docker et les orchestrer sur un serveur dédié.

## Travail non accompli

Les fonctionnalités ont été implémentées dans leur globalité.

## Évolution possible du projet

- Modifier l'interface pour la rendre plus intuitive pour les personnes âgées.
- Ajouter un système de chat pour permettre aux proches de communiquer entre eux.
- Profiter du fait que l'application soit une PWA pour permettre aux proches de recevoir les notifications sur leur téléphone.
- Afficher de manière plus pertinente les données de santé. 
- Ajouter un système de prise de rendez-vous (en vision pour tout les membres du cercle personnel ?)

# Problèmes rencontrés

## Backend 

- Au début du projet, nous sommes partis sur une API NodeJS classique. Cependant, nous avons rapidement rencontré des problèmes d'organisation et de propreté du code. En effet, les tests étaient très compliqués à mettre en place et le code était très peu structuré. Nous avons donc décidé de changer de technologie et de passer sur une API avec NestJS.
- L'écriture des tests n'était pas simple. En effet, les tests utilisent une base de données de test différente de la base de données de production. Cela permet d'être plus proche du fonctionnement réel de l'application mais cela rend les tests plus compliqués à mettre en place car il y a peu de documentation sur le sujet. 

## Frontend

- Pour Dylan et Matis, c'était globalement une découverte de ReactJS donc il y a eu beaucoup de choses à apprendre (ReactJS, MUI, Redux, Redux-Saga...).
- La répartition des tâches n'était pas évidente. En effet, il est facile de se retrouver à travailler sur les mêmes parties du code, ce qui créé des conflits lors des merge requests.

## CI / CD

- Pour commencer, nous avons travaillé sur un Dockerfile pour le backend avec son fichier docker-compose. Cependant nous avons rencontré un problème avec la mise à des dispositions des variables d'environnement pour l'API NestJS. En effet, lorsque le projet est lancé en production via Docker, NestJS n'avait pas accès aux variables d'environnement et ne pouvait donc pas se connecter à la base de données. <br /> Cependant, pour une raison inconnue, nous n'avons pas rencontré ce problème lorsque nous avons orchestré le projet avec un fichier docker-compose placé dans le dossier parent (permettant de gérer le frontend et le backend). 
- Globalement, le plus compliqué a été de mettre à disposition les variables d'environnement de manière sécurisée (sans devoir push les variables sur le git). 
- Le lancement du webhook dès lors que le déploiement des images sur le dockerhub est terminé a été compliqué à mettre en place. En effet, toutes les actions déjà existantes ne permettaient pas de lancer un webhook vers un serveur via un protocol non sécurisé (HTTP et non HTTPS). Nous avons donc dû utiliser la fonction Webhook de base de Github pour lancer le webhook vers notre serveur.

# Points forts / Points faibles du projet

## Points forts

- La plateforme est une PWA responsive installable sur mobile et ordinateur.
- Pipeline de construction et déploiement automatisé.
- Intégration de toutes les fonctionnalités prévues initialement.
- Tableau de suivi des tâches et des bugs bien organisé avec des labels, des milestones et des assignations.

## Points faibles

- Nous découvrons NestJS donc il doit y avoir beaucoup de choses à améliorer, surtout au niveau de l'écriture des tests. 
- Il y a des tests unitaires mais pas de tests d'intégration.
- Les tests unitaire sont relativement complet pour la partie Authentification mais sont très limités sur les autres parties. 
- Il n'y a pas d'étapes de test juste avant de construire les images docker ou de déployer.
- La plateforme n'est pas intuitive pour une personne âgée. 

