let Tmin = document.getElementById("Tmin");
let Tmax = document.getElementById("Tmax");
let probaPluie = document.getElementById("probaPluie");
let nbHSoleil = document.getElementById("nbHSoleil");

async function fecthMeteo(codeInsee){
    try {
        const reponse = await fetch("https://geo.api.gouv.fr/communes");
        const data = await reponse.json();
        console.table(data);
    } catch(error) {
        console.error("Erreur lors des requêtes : ", error)
    }
}