let Tmin = document.getElementById("Tmin");
let Tmax = document.getElementById("Tmax");
let probaPluie = document.getElementById("ProbaPluie");
let nbHSoleil = document.getElementById("NbHSoleil");
var imgBilanMeteo = document.getElementById("imgBilanMeteo");

async function fecthMeteo(codeInsee){
    try {
        const reponse = await fetch("https://geo.api.gouv.fr/communes");
        const data = await reponse.json();
        console.table(data);
    } catch(error) {
        console.error("Erreur lors des requêtes : ", error)
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

afficherimage()