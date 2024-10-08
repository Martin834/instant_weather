//textFit(document.querySelector("h1"));

let para = document.createElement("p");
const r = fetch("https://geo.api.gouv.fr/communes?codePostal=61200");

r.then(response => {
  return response.json()
}).then(people => {
  console.log(people);
  para.textContent = people[0];
});