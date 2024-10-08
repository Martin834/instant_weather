
let listeVille = document.getElementById("listeVille");
listeVille

let codePostal = document.getElementById("codePostal");

codePostal.addEventListener("input", function() {
  if(codePostal.value.length == 5){
    afficherCommunes(codePostal.value);
  }
  
});

 function afficherCommunes(codePostal) {
  const r = fetch("https://geo.api.gouv.fr/communes?codePostal="+codePostal);
  r.then(response => {
    return response.json()
  }).then(villes => {
  
    listeVille.innerHTML += "<option value = \"\" >-- Choisissez une commune --</option>"
    for(i = 0; i < villes.length; i++){
      listeVille.innerHTML += "<option value = "+ villes[i]["nom"] +">"+ villes[i]["nom"] +"</option>"
    }
  
    
  });
}



