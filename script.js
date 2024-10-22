let listeVille = document.getElementById("listeVille"); // Liste déroulante contenant les communes
listeVille.style.display = "none";
let codePostal = document.getElementById("codePostal"); // Entrée textuel pour le code postal
console.log(listeVille.style.appearance)


codePostal.addEventListener("input", function() { //Quand on entre du texte dans codePostal
  
  //Vérifie que le texte entré ne comporte que des chiffres
  code = "";

  for (char in codePostal.value) {
    if (codePostal.value[char] >= "0" && codePostal.value[char] <= "9") {
      code += codePostal.value[char];
    }
  }

  codePostal.value = code;


if(codePostal.value.length == 5){ // Si le code postal est complet on cherche la liste des communes correspondant
    afficherCommunes(codePostal.value);
    listeVille.style.display = "block";
    listeVille.style.appearance = "";
  } else { // Si le code Postal est incomplet on cache la liste des communes
    listeVille.innerHTML = ""
    listeVille.style.display = "none";
  }

});

/**
 * Permet de récupérer une liste de communes suivant un code postal
 * 
 * @param {*} codePostal 
 * @returns une liste de communes
 */
async function fetchCommunes(codePostal) {
  try {
    const reponse = await fetch("https://geo.api.gouv.fr/communes?codePostal=" + codePostal);
    const data = await reponse.json();
    return data;
  } catch (error) {
    console.error("Erreur lors des requêtes : ", error);
    throw error;
  }
}
/**
 * Remplit la liste déroulante avec les différentes communes
 * 
 * @param {*} codePostal 
 */
async function afficherCommunes(codePostal) {
  villes = await fetchCommunes(codePostal);
  console.log(villes);
  if(villes.length == 0){ // Si on a trouvé des villes

    listeVille.innerHTML = "<option value = \"\" >-- Aucune commune trouvée --</option>"
    listeVille.style.appearance = "none";
  } else { // Si aucune ville n'a été trouvée
    listeVille.innerHTML = "<option value = \"\" >-- Choisissez une commune --</option>"
    for (i = 0; i < villes.length; i++) {
      listeVille.innerHTML += "<option value = " + villes[i]["code"] + ">" + villes[i]["nom"] + "</option>"
    }
  }
}