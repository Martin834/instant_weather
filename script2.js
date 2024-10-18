let Tmin = document.getElementById("Tmin");
let Tmax = document.getElementById("Tmax");
let probaPluie = document.getElementById("ProbaPluie");
let nbHSoleil = document.getElementById("NbHSoleil");
var imgBilanMeteo = document.getElementById("imgBilanMeteo");
let nomVille = document.getElementById("nomVille");
let latitude = document.getElementById("Latitude");
let longitude = document.getElementById("Longitude");
let cumulPluie = document.getElementById("CumulPluie");
let ventMoyen = document.getElementById("VentMoyen");
let directionVent = document.getElementById("DirectionVent");

token = "d75a7c814a28c440a240e712a3d0c49fedebc62389dd1ca7a42a0f9aa9fa4c52"; // attention

let cpt = 0;

let ulLatitude = document.getElementById("ulLatitude");
let ulLongitude = document.getElementById("ulLongitude");
let ulCumulPluie = document.getElementById("ulCumulPluie");
let ulVentMoyen = document.getElementById("ulVentMoyen");
let ulDirectionVent = document.getElementById("ulDirectionVent");

let latitudeOn = false;
let longitudeOn = false;
let cumulPluieOn = false;
let ventMoyenOn = false;
let directionVentOn = false;
let optionsTrue = [];

let zoneDeTest = document.getElementById("testest");

async function fecthMeteo(codeInsee){
    try {
        const reponse = await fetch("https://api.meteo-concept.com/api/forecast/daily/0?token="+token+"&insee="+codeInsee);
        const data = await reponse.json();
        return data;
    } catch(error) {
        console.error("Erreur lors des requêtes : ", error);
        throw error;
    }
}

function afficherimage(){
    if(nbHSoleil.textContent >= "6"){
        imgBilanMeteo.src = "images/rabbide_meteo_bbq.png";
    }
    if(nbHSoleil.textContent < "6"){
        imgBilanMeteo.src = "images/rabbide_meteo_nuageux.png";
    }
   
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

function mettreEnDisplayBlock(e) {
    e.style.display = 'block';
}


let urlcourante = document.location.href;
urlcourante = urlcourante.split(/[?=&]/);

while (urlcourante[cpt] != "codeInsee") {
    switch (urlcourante[cpt]) {
        case "latitude": latitudeOn = true; optionsTrue.push("latitude"); mettreEnDisplayBlock(ulLatitude); break;
        case "longitude": longitudeOn = true; optionsTrue.push("longitude"); mettreEnDisplayBlock(ulLongitude); break;
        case "cumul_pluie": cumulPluieOn = true; optionsTrue.push("cumul_pluie"); mettreEnDisplayBlock(ulCumulPluie); break;
        case "vent_moyen": ventMoyenOn = true; optionsTrue.push("vent_moyen"); mettreEnDisplayBlock(ulVentMoyen); break;
        case "direction_vent": directionVentOn = true; optionsTrue.push("direction_vent"); mettreEnDisplayBlock(ulDirectionVent); break;
    }
    cpt += 1;
}

let codeInsee = urlcourante[cpt+1];

afficherElements(codeInsee);




