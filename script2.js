let Tmin = document.getElementById("Tmin");
let Tmax = document.getElementById("Tmax");
let probaPluie = document.getElementById("ProbaPluie");
let nbHSoleil = document.getElementById("NbHSoleil");
let nomVille = document.getElementById("nomVille");

token = "402ff5a4f3425ce73e4f302174b81109e11b83bca8e2d5e82fde474b29e90704";

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

async function afficherElements(codeInsee){
    data = await fecthMeteo(codeInsee);
    console.log(data);
    Tmin.textContent = data["forecast"]["tmin"] + "°C";
    Tmax.textContent = data["forecast"]["tmax"] + "°C";
    probaPluie.textContent = data["forecast"]["probarain"] + "%";
    nbHSoleil.textContent = data["forecast"]["sun_hours"] + "H";
    nomVille.textContent = data["city"]["name"];
}

let urlcourante = document.location.href;
let codeInsee = urlcourante.split("=")[1];

afficherElements(codeInsee);

