// vores variabler og konstanter
let filter = "alle";
let kunstnere;
let kunstner;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const medieurl = "https://upcoming-e777.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602e74085ad3610fb5bb6332"
}

console.log("ID", id);

// når DOM er loadet kalder den efter funktionen "loadJSON"
document.addEventListener("DOMContentLoaded", loadJSON);

// Henter JSON dataen for specifikke kunstner ved hjælp af id og henfører til visKunstner funktionen
async function loadJSON() {
    const JSONData = await fetch(`https://upcoming-e777.restdb.io/rest/kunstnere/${id}`, {
        headers: myHeaders
    });
    kunstner = await JSONData.json();

    console.log("Kunstner", kunstner);
    visKunstner(kunstner);
}

//html articles fyldes med indhold
function visKunstner() {
    document.querySelector(".billede").src = medieurl + kunstner.billede;

    document.querySelector(".billede").alt = "Billede af " + kunstner.navn;

    document.querySelector(".billede").title = kunstner.navn;

    document.querySelector(".billedecredits").textContent = kunstner.billedecredits;

    document.querySelector(".navn").textContent = kunstner.navn;

    document.querySelector(".genre").textContent = "Genre: " + kunstner.genre;
    //VIRKER OGSÅ: klon.querySelector(".genre").innerHTML += ` ${kunstner.efternavn}`;

    document.querySelector(".youtubelink").innerHTML = kunstner.youtube;
    document.querySelector(".om").textContent = kunstner.om;
    document.querySelector(".lyttere").textContent = kunstner.lyttere;

    document.querySelector("button").addEventListener("click", tilbageTilKunstnere); //laver en eventlistener "click" på tilbageknap og refererer til tilbageTilKunstnere

}

// funktion der går tilbage til forrige side
function tilbageTilKunstnere() {
    history.back();
}
