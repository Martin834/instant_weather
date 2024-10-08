































































let listeVille = document.getElementById("listeVille");

let codePostal = document.getElementById("codePostal");

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
  } else {
    listeVille.innerHTML = ""
  }
  
});

 async function afficherCommunes(codePostal) {
  const r =  fetch("https://geo.api.gouv.fr/communes?codePostal="+codePostal);
  r.then(response => {
    return response.json()
  }).then(villes => {
    
    if(villes.length == 0){
      listeVille.innerHTML += "<option value = \"\" >-- Aucune commune trouvée --</option>"
    } else {
      listeVille.innerHTML += "<option value = \"\" >-- Choisissez une commune --</option>"
      for(i = 0; i < villes.length; i++){
        listeVille.innerHTML += "<option value = "+ villes[i]["code"] +">"+ villes[i]["nom"] +"</option>"
      }
    }
  });
}



