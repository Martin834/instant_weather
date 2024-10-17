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

token = "402ff5a4f3425ce73e4f302174b81109e11b83bca8e2d5e82fde474b29e90704"; // attention

let cpt = 0;
let latitudeOn = false;
let longitudeOn = false;
let comulPluieOn = false;
let ventMoyenOn = false;
let directionVentOn = false;

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
    Tmin.textContent = data["forecast"]["tmin"] + "°C";
    Tmax.textContent = data["forecast"]["tmax"] + "°C";
    probaPluie.textContent = data["forecast"]["probarain"] + "%";
    nbHSoleil.textContent = data["forecast"]["sun_hours"] + "H";

    nomVille.textContent = data["city"]["name"];
    afficherimage()
}

let urlcourante = document.location.href;
urlcourante = urlcourante.split(/[?=&]/);

while (urlcourante[cpt] != "codeInsee") {

    switch (urlcourante[cpt]) {
        case "latitude": latitudeOn = true; break;
        case "longitude": longitudeOn = true; break;
        case "cumul_pluie": cumulPluieOn = true; break;
        case "vent_moyen": ventMoyenOn = true; break;
        case "direction_vent": directionVentOn = true; break;
    }

    cpt += 1;
}

let codeInsee = urlcourante[cpt+1];


afficherElements(codeInsee);




