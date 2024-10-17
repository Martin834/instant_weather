let listeVille = document.getElementById("listeVille");
listeVille.style.display = "none";
let codePostal = document.getElementById("codePostal");
console.log(listeVille.style.appearance)

codePostal.addEventListener("input", function() {
  
  code = "";

  for(char in codePostal.value){
    if(codePostal.value[char] >= "0" && codePostal.value[char] <= "9"){
      code += codePostal.value[char];
    }
  }

  codePostal.value = code;

  if(codePostal.value.length == 5){
    afficherCommunes(codePostal.value);
    listeVille.style.display = "block";
    listeVille.style.appearance = "";
  } else {
    listeVille.innerHTML = ""
    listeVille.style.display = "none";
  }
  
});

async function fetchCommunes(codePostal) {
  try {
    const reponse = await fetch("https://geo.api.gouv.fr/communes?codePostal="+codePostal);
    const data = await reponse.json();
    return data;
  } catch(error) {
    console.error("Erreur lors des requêtes : ", error);
    throw error;
  }
}

 async function afficherCommunes(codePostal) {
  villes = await fetchCommunes(codePostal);
  console.log(villes);
  if(villes.length == 0){
    listeVille.innerHTML += "<option value = \"\" >-- Aucune commune trouvée --</option>"
    listeVille.style.appearance = "none";
  } else {
    listeVille.innerHTML += "<option value = \"\" >-- Choisissez une commune --</option>"
    for(i = 0; i < villes.length; i++){
      listeVille.innerHTML += "<option value = "+ villes[i]["code"] +">"+ villes[i]["nom"] +"</option>"
    }
  }
}



