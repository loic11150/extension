Le dossier worshop c'est le dossier à mettre sur un serveur web au www.
Le dossier smart-saver-final c'est l'extension.
l'extension est censé utiliser l'API de https://www.websitecarbon.com/ mais comme il ne nous on pas répondu attends nous avons fait du web scrapping sur ce site.
Pour le web scrapping on utilise python, le fichier python est appelé par un script PHP qui mets en forme la données pour créer un JSON (API REST GET)
La partie extension c'est du JS pour le back qui appel l'api + HTML/CSS pour le front.

Fonctionnalités :
Donne le bilan carbonne du site,
la consomation énergétique,
si le site est plus ou moins propre selon https://www.websitecarbon.com/ ,
cela incrémente l'énergie utilisé au fur et à mesure,
ferme les onglets inutilisé selon un timer prédéfini,
accès à la boite mail.
