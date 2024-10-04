let para = document.createElement("p");
const r = fetch("https://geo.api.gouv.fr/communes?codePostal=61570");

r.then(response => {
  return response.json()
}).then(people => {
  console.log(people);
  para.textContent = people[0];
});