let imgBilanMeteo = document.getElementById("imgBilanMeteo"); // Image correspondant au bilan météo
let nomVille = document.getElementById("nomVille"); // Partie du titre contenant le nom de la commune choisie

const token = "d75a7c814a28c440a240e712a3d0c49fedebc62389dd1ca7a42a0f9aa9fa4c52"; // Token pour accéder à l'API


let cpt = 0;
let optionsTrue = []; // Liste contenant les choix d'informations complémentaires de la V2s

/*let zoneDeTest = document.getElementById("testest");*/

let choixNbJour = document.getElementById("choixNbJour"); // Jauge permettant de choisir le nombre de jour de prévisions à afficher
let nbJour = document.getElementById("nbJour"); // Partie du label de la jauge exprimant le nombre de jour choisi
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
    afficherimage(data["forecast"]["weather"]);
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
    }
}
function afficherimage(variable) {
    imgBilanMeteo.src = "images/rabbide_meteo_nuageux.png";//nuageux
    if(variable == 0 ){//soleil
        imgBilanMeteo.src = "images/rabbide_meteo_soleil.jpg";
    }
    else if(10 <= variable && variable <= 19 ){//pluie
        imgBilanMeteo.src = "images/rabbide_meteo_pluie.png";
    }
    else if((20 <= variable && variable <= 29) ){//neige
        imgBilanMeteo.src = "images/rabbide_meteo_neige.jpg";
    }
    else if((40 <= variable && variable <= 79) ){//vent
        imgBilanMeteo.src = "images/rabbide_meteo_vent.png";
    }
    else if(100 <= variable && variable <= 200 ){//alerte meteo
        imgBilanMeteo.src = "images/rabbide_meteo_alerte.png";
    }
}


choixNbJour.addEventListener("input", function() { //Quand on modifie le niveau de la jauge

    let choix = parseInt(choixNbJour.value)

    // Affiche le nombre de jour choisi
    nbJour.innerHTML = choix + 1;

    // Affiche le nombre de templates correspondant
    for(i = 0; i <= choix; i++){

        conteneurInfos.children.item(i).style.display = "block";
    }
    for (i = choix + 1; i <= 6; i++) {
        conteneurInfos.children.item(i).style.display = "none";
    }
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
