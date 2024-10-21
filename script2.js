let nomVille = document.getElementById("nomVille"); // Partie du titre contenant le nom de la commune choisie

const token = "402ff5a4f3425ce73e4f302174b81109e11b83bca8e2d5e82fde474b29e90704"; // Token pour accéder à l'API

let jourChoisi = 0; // Entier indiquant le jour choisi
let changerGauche = document.getElementById("changerGauche"); // Bouton pour voir les prévisions d'avant
let changerDroite = document.getElementById("changerDroite"); // Bouton pour voir les prévisions d'après

let cpt = 0; // Compteur pour parcourir l'URL
let optionsTrue = []; // Liste contenant les choix d'informations complémentaires de la V2

/*let zoneDeTest = document.getElementById("testest");*/

let carteMeteo = document.getElementById("carteMeteo"); // Template contenant les informations météo
let conteneurInfos = document.getElementById("conteneurInfos"); // Endroit où l'on affiche les différentes template clonées


const listeJour = ["Lundi", "Mardi", "Mercredi", "Jeudi", " Vendredi", "Samedi", "Dimanche"];
const listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

/**
 * Transforme une chaîne de caractère représentant une date sous un autre format spécifié dans le returns
 * 
 * @param {*} strDate 
 * @returns une chaîne de caractère représentant un date sous la forme <JOUR> <DATE> <MOIS> <ANNEE>
 */
function stringDate(strDate) {
    let date = new Date(strDate);
    return listeJour[date.getDay()] + " " + date.getDate() + " " + listeMois[date.getMonth()] + " " + date.getFullYear() + " :";
}


/**
 * Cherche les prévisions météo suivant une commune et un jour
 * 
 * @param {*} codeInsee 
 * @param {*} jour 
 * @returns une liste de prévision météo
 */
async function fecthMeteo(codeInsee, jour){
    try {
        const reponse = await fetch("https://api.meteo-concept.com/api/forecast/daily/" + jour + "?token=" + token + "&insee=" + codeInsee);
        const data = await reponse.json();
        return data;
    } catch (error) {
        console.error("Erreur lors des requêtes : ", error);
        throw error;
    }
}


/**
 * Crée les différents templates avec les informations météo correspondantes
 * 
 * @param {*} codeInsee 
 */
async function remplirElements(codeInsee){
    data = await fecthMeteo(codeInsee, 0);
    nomVille.textContent = data["city"]["name"];
   
    for (var pos in clone) {
        data = await fecthMeteo(codeInsee, pos);

        conteneurInfos.appendChild(clone[pos]);
        if (pos != 0) {
            conteneurInfos.children.item(pos).style.display = "none";
        }

        conteneurInfos.children.item(pos).querySelector("#datePrevision").textContent = stringDate(data["forecast"]["datetime"]);
        conteneurInfos.children.item(pos).querySelector("#Tmin").textContent = data["forecast"]["tmin"] + "°C";
        conteneurInfos.children.item(pos).querySelector("#Tmax").textContent = data["forecast"]["tmax"] + "°C";
        conteneurInfos.children.item(pos).querySelector("#probaPluie").textContent = data["forecast"]["probarain"] + "%";
        conteneurInfos.children.item(pos).querySelector("#nbHSoleil").textContent = data["forecast"]["sun_hours"] + "H";
        for (i = 0; i < optionsTrue.length; i++) {
            switch (optionsTrue[i]) {
                case "latitude": conteneurInfos.children.item(pos).querySelector("#Latitude").textContent = data["forecast"]["latitude"]; mettreEnDisplayBlock(conteneurInfos.children.item(pos).querySelector("#ulLatitude")); break;
                case "longitude": conteneurInfos.children.item(pos).querySelector("#Longitude").textContent = data["forecast"]["longitude"]; mettreEnDisplayBlock(conteneurInfos.children.item(pos).querySelector("#ulLongitude")); break;
                case "cumul_pluie": conteneurInfos.children.item(pos).querySelector("#CumulPluie").textContent = data["forecast"]["rr10"] + " mm"; mettreEnDisplayBlock(conteneurInfos.children.item(pos).querySelector("#ulCumulPluie")); break;
                case "vent_moyen": conteneurInfos.children.item(pos).querySelector("#VentMoyen").textContent = data["forecast"]["wind10m"] + " km/h"; mettreEnDisplayBlock(conteneurInfos.children.item(pos).querySelector("#ulVentMoyen")); break;
                case "direction_vent": conteneurInfos.children.item(pos).querySelector("#DirectionVent").textContent = data["forecast"]["dirwind10m"] + "°"; mettreEnDisplayBlock(conteneurInfos.children.item(pos).querySelector("#ulDirectionVent")); break;
            }
        }
        afficherimage(conteneurInfos.children.item(pos).querySelector("#imgBilanMeteo"), data["forecast"]["weather"]);
    }
}

/**
 * Choisis l'image approprié suivant les infos météos
 * 
 * @param {*} imgBilanMeteo 
 * @param {*} variable 
 */
function afficherimage(imgBilanMeteo, variable) {
    imgBilanMeteo.src = "images/rabbide_meteo_nuageux.png";//nuageux
    imgBilanMeteo.alt = "Image météo avec un lapin crétin naviguant sur un nuage";
    if(variable == 0 ){//soleil
        imgBilanMeteo.src = "images/rabbide_meteo_soleil.jpg";
        imgBilanMeteo.alt = "Image météo avec un lapin crétin sous le soleil";
    }
    else if(10 <= variable && variable <= 19 ){//pluie
        imgBilanMeteo.src = "images/rabbide_meteo_pluie.png";
        imgBilanMeteo.alt = "Image avec un lapin crétin dans l'eau sous la pluie";
    }
    else if((20 <= variable && variable <= 29) ){//neige
        imgBilanMeteo.src = "images/rabbide_meteo_neige.jpg";
        imgBilanMeteo.alt = "Image météo avec des lapins crétins sous la neige";
    }
    else if((40 <= variable && variable <= 79) ){//vent
        imgBilanMeteo.src = "images/rabbide_meteo_vent.png";
        imgBilanMeteo.alt = "Image météo avec un lapin crétin volant dans le vent";
    }
    else if(100 <= variable && variable <= 200 ){//alerte meteo
        imgBilanMeteo.src = "images/rabbide_meteo_alerte.png";
        imgBilanMeteo.alt = "Image météo avec un lapin crétin fille tenant une pancarte alerte météo";
    }
}

changerGauche.addEventListener("click", function() { // Quand on appuie pour voir les prévisions précédentes

    if(jourChoisi != 0){
        mettreEnDisplayNone(conteneurInfos.children.item(jourChoisi)); // On cache l'ancienne séléction
        jourChoisi--;
        mettreEnDisplayBlock(conteneurInfos.children.item(jourChoisi)); // On affiche la nouvelle
    }

    if(jourChoisi == 0){
        changerGauche.disabled = true; // On désactive le bouton qui va vers la gauche si on est à la première prévision
    }
    changerDroite.disabled = false;

});

changerDroite.addEventListener("click", function() { // Quand on appuie pour voir les prévisions suivantes

    if(jourChoisi != 6){
        mettreEnDisplayNone(conteneurInfos.children.item(jourChoisi)); // On cache l'ancienne séléction
        jourChoisi++;
        mettreEnDisplayBlock(conteneurInfos.children.item(jourChoisi)); // On affiche la nouvelle
    }
    if(jourChoisi == 6){
        changerDroite.disabled = true; // On désactive le bouton qui va vers la droite si on est à la dernière prévision
    }
    changerGauche.disabled = false;

});


const clone = [ // Liste des tempates
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true)
];

/**
 * Permet d'afficher un élément en block
 * 
 * @param {*} e 
 */
function mettreEnDisplayBlock(e) {
    e.style.display = 'block';
}

/**
 * Permet de masquer un élément
 * 
 * @param {*} e 
 */
function mettreEnDisplayNone(e) {
    e.style.display = 'none';
}

// Récupération de l'URL
let urlcourante = document.location.href;
urlcourante = urlcourante.split(/[?=&]/);
console.log(urlcourante)
while (cpt < urlcourante.length) { // Indique les options choisis par l'utilisateur
    switch (urlcourante[cpt]) {
        case "latitude": optionsTrue.push("latitude"); break;
        case "longitude": optionsTrue.push("longitude"); break;
        case "cumul_pluie": optionsTrue.push("cumul_pluie"); break;
        case "vent_moyen": optionsTrue.push("vent_moyen"); break;
        case "direction_vent": optionsTrue.push("direction_vent"); break;
    }
    cpt += 1;
}

// Récupération du codeInsee
let codeInsee = urlcourante[2];

remplirElements(codeInsee);

changerGauche.disabled = true;