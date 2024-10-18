var imgBilanMeteo = document.getElementById("imgBilanMeteo");
let nomVille = document.getElementById("nomVille");

token = "d75a7c814a28c440a240e712a3d0c49fedebc62389dd1ca7a42a0f9aa9fa4c52"; // attention

let cpt = 0;

let ulLatitude = document.getElementById("ulLatitude");
let ulLongitude = document.getElementById("ulLongitude");
let ulCumulPluie = document.getElementById("ulCumulPluie");
let ulVentMoyen = document.getElementById("ulVentMoyen");
let ulDirectionVent = document.getElementById("ulDirectionVent");

let optionsTrue = [];

let zoneDeTest = document.getElementById("testest");

let choixNbJour = document.getElementById("choixNbJour");
let nbJour = document.getElementById("nbJour");
let carteMeteo = document.getElementById("carteMeteo");
let conteneurInfos = document.getElementById("conteneurInfos");

const listeJour = ["Lundi", "Mardi", "Mercredi", "Jeudi", " Vendredi", "Samedi", "Dimanche"];
const listeMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]


function stringDate(strDate) {
    let date = new Date(strDate);
    return listeJour[date.getDay()] + " " + date.getDate() + " " + listeMois[date.getMonth()] + " " + date.getFullYear() +" :";
}

async function fecthMeteo(codeInsee, jour){
    try {
        const reponse = await fetch("https://api.meteo-concept.com/api/forecast/daily/"+jour+"?token="+token+"&insee="+codeInsee);
        const data = await reponse.json();
        return data;
    } catch(error) {
        console.error("Erreur lors des requêtes : ", error);
        throw error;
    }
}

async function remplirElements(codeInsee){
    data = await fecthMeteo(codeInsee, 0);
    nomVille.textContent = data["city"]["name"];

    for(var pos in clone){
        data = await fecthMeteo(codeInsee, pos);

        conteneurInfos.appendChild(clone[pos]);
        if(pos != 0){
            conteneurInfos.children.item(pos).style.display = "none";
        }

        conteneurInfos.children.item(pos).querySelector("#datePrevision").textContent = stringDate(data["forecast"]["datetime"]);
        conteneurInfos.children.item(pos).querySelector("#Tmin").textContent = data["forecast"]["tmin"] + "°C";
        conteneurInfos.children.item(pos).querySelector("#Tmax").textContent = data["forecast"]["tmax"] + "°C";
        conteneurInfos.children.item(pos).querySelector("#probaPluie").textContent = data["forecast"]["probarain"] + "%";
        conteneurInfos.children.item(pos).querySelector("#nbHSoleil").textContent = data["forecast"]["sun_hours"] + "H";
        console.log(conteneurInfos.children.item(pos).querySelector("#Latitude"));
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

function afficherimage(){
    imgBilanMeteo.src = "images/rabbide_meteo_nuageux.png";
    if(Tmin.textContent > "20"){
        imgBilanMeteo.src = "images/rabbide_meteo_bbq.png";
    }
    /*---------------------a voir avec vous -----------------(pense bete : lapin soleil / lapin neige / lapin froid / et + condition )
    else if(Vmoyen.textContent > "50"){
        imgBilanMeteo.src = "images/rabbide_meteo_vent.png";
    }
    else if (probaPluie.textContent < "70%" || Cpluie.textContent > "5"){
        imgBilanMeteo.src = "images/rabbide_meteo_pluie.png";
    }
    else if (Vmoyen.textContent > "80" || Cpluie.textContent > "30"){
        imgBilanMeteo.src = "images/rabbide_meteo_alerte.png";
    }
    */

   

}


async function afficherElements(codeInsee){
    data = await fecthMeteo(codeInsee);
    console.log(data);
    Tmin.textContent = data["forecast"]["tmin"] + " °C";
    Tmax.textContent = data["forecast"]["tmax"] + " °C";
    probaPluie.textContent = data["forecast"]["probarain"] + "%";
    nbHSoleil.textContent = data["forecast"]["sun_hours"] + " h";
    nomVille.textContent = data["city"]["name"];
    
    for (i = 0; i < optionsTrue.length; i++) {
        switch (optionsTrue[i]) {
            case "latitude": latitude.textContent = data["forecast"]["latitude"]; 
            case "longitude": longitude.textContent = data["forecast"]["longitude"];
            case "cumul_pluie": cumulPluie.textContent = data["forecast"]["rr10"] + " mm";
            case "vent_moyen": ventMoyen.textContent = data["forecast"]["wind10m"] + " km/h";
            case "direction_vent": directionVent.textContent = data["forecast"]["dirwind10m"] + "°";
        }
    }

    afficherimage()
}

choixNbJour.addEventListener("input", function() {
    let choix = parseInt(choixNbJour.value)

    nbJour.innerHTML = choix + 1;

    for(i = 0; i <= choix; i++){
        conteneurInfos.children.item(i).style.display = "block";
     }
     for(i = choix+1; i <= 6; i++){
        conteneurInfos.children.item(i).style.display = "none";
     }
});

const clone = [ 
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true),
    carteMeteo.content.cloneNode(true)
];


function mettreEnDisplayBlock(e) {
    e.style.display = 'block';
}


let urlcourante = document.location.href;
urlcourante = urlcourante.split(/[?=&]/);

while (urlcourante[cpt] != "codeInsee") {
    switch (urlcourante[cpt]) {
        case "latitude": optionsTrue.push("latitude"); break;
        case "longitude": optionsTrue.push("longitude"); break;
        case "cumul_pluie": optionsTrue.push("cumul_pluie"); break;
        case "vent_moyen": optionsTrue.push("vent_moyen"); break;
        case "direction_vent": optionsTrue.push("direction_vent"); break;
    }
    cpt += 1;
}

let codeInsee = urlcourante[cpt+1];

remplirElements(codeInsee);