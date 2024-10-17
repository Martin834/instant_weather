var imgBilanMeteo = document.getElementById("imgBilanMeteo");
let nomVille = document.getElementById("nomVille");
let choixNbJour = document.getElementById("choixNbJour");
let nbJour = document.getElementById("nbJour");
let carteMeteo = document.getElementById("carteMeteo");
let conteneurInfos = document.getElementById("conteneurInfos");
const token = "402ff5a4f3425ce73e4f302174b81109e11b83bca8e2d5e82fde474b29e90704";

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
    }
    
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

let urlcourante = document.location.href;
let codeInsee = urlcourante.split("=")[1];

remplirElements(codeInsee);


