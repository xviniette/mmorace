# Design

## Accueil
Première page quand on arrive sur le jeu. 

* Connexion :
    * Mode connecté (login, password)
    * Mode invité (login)
* Inscription (login, password, password confirm, email (opt)) => accès Skins, Elo, xp, sauvegarde temps, ...
* Présentation (textes + images (+ vidéo?))
* Compte twitter du jeu

## Lobby
Page pour la préparation d'une course

* Liste des joueurs présents dans le lobby (pseudo, elo, xp, nombre partie joué, temps inscrit ?)
* Choix de mon skin pour la course à venir
* Choix de la map à jouer parmis une liste restreinte (X possibles et random)
* Bouton participer à la course
* Compte à rebour début course (se lance quand le premier joueur s'inscrit à la course) ex : 15 secondes
* Nombre de joueur qui participe à la course
* Liste des joueurs qui participent :
    * Pseudo
    * Elo ? Xp ? Nb partie jouées ?
    * Map votée

## Course

* Stats map (Ne s'affiche que pendant le starting time ?) :
    * Nom map
    * Record for ever
    * Mon record
* <canvas> avec le circuit/voitures/...
* Temps actuel
* Position actuel (sur combien?)
* Nombre tour actuel (sur combien ? varie en fonction des maps)
* Evennement quand on termine la course (ex : FINISH : TEMPS ! au milieu écran) 

## Classement course
Peut se supperposer sur Course ?

* Classement joueur par temps :
    * Temps
    * Elo
    * Gain ELo
    * Gain xp ?
* Drops skins/caisses

## tchat
Lobby/course/(classement?)

Tchat only emoticones

## Menu
Sur lobby/course

Un menu pour accéder : 
* Classement général :
    * Joueur (par elo/xp)
    * Par map (temps)
* Profil joueur : (default : soit-même)
    * ELo, Xp, nb played, ...
    * Meilleurs temps sur chaque map :
        * Temps
        * Classement général par temps ex : 124/727373 2.6%
* Parametres :
    * Changer touches
    * Changer paramètres affichage (son ?!)
* Marché des skins
