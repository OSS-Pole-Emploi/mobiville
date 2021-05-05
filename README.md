# Mobiville

## Présentation

Mobiville est un outil d’aide à la décision pour orienter les candidats à la mobilité vers les bassins d’emploi qui recrutent afin de saisir des opportunités dans de nouveaux territoires.

## Stack technique

* une api (back) en node.js
* un site web (front) en react
* une base de donnée (MariaDB)

## Installation

Pré-requis: docker, docker-compose et yarn

### installer npm

```
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
apt install nodejs
yarn
```

### construire et démarrer les conteneurs

1. provision .env (exemple voir .env.exemple dans le repo)
2. `yarn build`
3. `yarn start`


## API alimenter/synchroniser la base de donnée

```
// populate all cities in France
GET http://localhost/api/sync/sync-cities   ~ 71000ms
```

```
// populate all cities in tension
GET http://localhost/api/sync/sync-profession-in-tension   ~ 65000ms
```

```
// populate all regions
GET http://localhost/api/sync/sync-regions   ~ 250ms
```

## Construire les images

Créer et sauver les images docker à pousser sur le serveur
```
yarn build:recette // création et sauvagarde desimages de recette
scp images-docker // et copie sur le serveur cible
```

## Les tests

```
chmode +x ./scripts/wait-for-it.sh
yarn start:test
```

## Logs

View api logs
```
yarn logs:api
```

## Les données

Code rome I1401 (Informaticien)  
Nb ville proche mer : 704  
Nb ville proche en montagne : 2416  
Nb ville à la campagne : 1978  
Nb petite ville : 4831  
Nb ville moyenne : 111  
Nb grande ville : 52  
Nb metropole : 6  


Code rome J1501 (Aide soignant)  
Nb ville proche mer : 2755  
Nb ville proche en montagne : 10588  
Nb ville à la campagne : 8681  
Nb petite ville : 21482  
Nb ville moyenne : 106  
Nb grande ville : 47  
Nb metropole : 6  

## Données et sources de données

Liste des villes -> Fichier importé depuis le fichier cities-france.csv (Un appel depuis la route http://localhost/api/sync/sync-cities supprime et remplace totalement les données des villes)
Le fichier cities-france.csv est issue du site data.gouv.fr et est mis à jours tout les ans. A voir comment l'importer de nous chez Mobiville.

Format d'une ville:
- code_comm: 
- nom_dept: Nom du département,
- statut: Type de commune,
- z_moyen: Altitude moyenne,
- nom_region: Nom de région,
- code_reg: Code de la région (Ceci est l'ancien code des régions),
- insee_com: Identifiant europeen de la commune,
- code_dept: Code du département,
- geo_point_2d_x: Centre de la ville en longitude,
- geo_point_2d_y: Centre de la ville en latitude,
- postal_code: Code postal Français de la ville,
- id_geofla: Id de la latitude et longitude celon le code Geofla,
- code_cant: ,
- superficie: Supperficie en km2,
- nom_comm: Nom de la commune,
- code_arr:
- population: Population en milier (Info de 2017),
- distance_from_sea: Distance par rapport à la mer par rapport au centre. (Valeur à null puis un cron teste le point geographique le plus proche celon le fichier france-shape-side-sea.geo.json),
- average_temperature: Température moyenne de la ville sur toute l'année des 10 dernieres années avec 3 ans de retard. (Valeur à null puis un cron chercher la balise météorologie la plus proche de la ville. Les balises sont issues de donneespubliques.meteofrance.fr. Pour info, il n'y a pas beaucoup de balise en France, quelques centaines),
- description: Description de la ville. (Valeur à null puis un cron demande à l'api wikipedia la description),
- average_houseselled: Prix moyen du m2 des logements (Valeur à null puis un cron demande au fichier dvf-communes-2019.csv issue de data.gouv.fr),
- city_house_tension: Definition du niveau de tension (Valeur à null puis un cron demande au fichier dvf-communes-2019.csv issue de data.gouv.fr),
- average_houserent: Prix moyen du loyer des appartement au m2 (Value à null puis un demande au fichier indicateurs-loyers-appartements.csv issue de data.gouv.fr),
- photo: Url de photo de la ville. (Valeur à null puis un cron demande à l'api wikipedia la photo),


Liste des villes en tensions -> Fichier importé depuis le fichier cities-tension-utf8.csv (Un appel depuis la route http://localhost/api/sync/sync-profession-in-tension)

Liste des villes <-> bassins  -> Fichier importé depuis le fichier lexique-bassins.csv (Un appel depuis la route http://localhost/api/sync/sync-cities)

Liste des regions, nouvelle nomenclature -> Fichier importé depuis le fichier anciennes-nouvelles-regions.json (Un appel depuis la route http://localhost/api/sync/sync-regions)



## API

API Offre d'emploi, pour afficher la liste des offres pour une ville et un métier

API Info travail, pour afficher la tranche de salaire d'une region et d'un métier sur la fiche ville