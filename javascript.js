// vores variabler og konstanter
let filter = "alle";
let kunstnere;
const header = document.querySelector("h2");
const medieurl = "https://upcoming-e777.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602e74085ad3610fb5bb6332"
}

// når DOM er loadet kalder den efter funktionen "start"
document.addEventListener("DOMContentLoaded", start)

// første funktion der kaldes efter DOM er loaded
function start() {
    loadJSON();
    const filterKnapper = document.querySelectorAll(".navmenu a button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKunstnere)); // laver en eventlistener "click" på filtreringsknapperne i header
}

// Henter JSON dataen og henfører til visKunstnere funktionen
async function loadJSON() {
    const JSONData = await fetch("https://upcoming-e777.restdb.io/rest/kunstnere", {
        headers: myHeaders
    });
    kunstnere = await JSONData.json();
    console.log("Kunstnere", kunstnere);
    visKunstnere();
}

// Viser de kunstnere indenfor genren som er valgt
function filtrerKunstnere() {
    console.log("filtrerer genre")
    filter = this.dataset.genre; // Viser de kunstnere indenfor genren som er valgt
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt"); // når der klikkes på fitreringsknapperne får den trykkede knap en class
    header.textContent = this.textContent; //h2 får ny textContent svarende til teksten i knappen.
    visKunstnere();

}

//funktion der viser kunstnere i liste view
function visKunstnere() {
    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
    dest.textContent = ""; // html containeren tømmes før der fyldes nyt indhold i den
    kunstnere.forEach(kunstner => { //array'et kunstnere løbes igennem, og hver kunstner indsættes i html
        console.log(kunstner);
        // loop igennem json (kunstnere)
        if (filter == kunstner.genre || filter == "alle") {
            const klon = skabelon.cloneNode(true); // html template klones og fyldes med indhold
            klon.querySelector(".billede").src = medieurl + kunstner.billede;

            klon.querySelector(".billede").alt = "Billede af " + kunstner.navn;

            klon.querySelector(".billede").title = kunstner.navn;

            klon.querySelector(".navn").textContent = kunstner.navn;

            klon.querySelector(".genre").textContent = "Genre: " + kunstner.genre;
            //VIRKER OGSÅ: klon.querySelector(".navn").innerHTML += ` ${person.efternavn}`;
            klon.querySelector(".spotifylink").innerHTML = kunstner.spotifylink;
            klon.querySelector(".kunstner button").addEventListener("click", () => visDetaljer(kunstner)); // laver en eventlistener "click" til knap som refererer til visDetaljer funktionen
            dest.appendChild(klon); //klonen tilføjes til DOM
        }
    })
}

// her hopper man over til detalje-siden
function visDetaljer(detaljer) {
    console.log("02-detalje.html");
    location.href = `upcoming-detaljer.html?id=${detaljer._id}`;
}


// Lånt kode -----------------------------------------------
// Kode der gør, at når man har scrollet en vis længde tilføjes- eller fjernes en class fra et element.


// laver en variabel
let scrollpos = function () {
    return window.scrollY
};

// laver en eventlistener "scroll"
window.addEventListener('scroll', function () {

    scrollpos = window.scrollY;

    // laver to funktioner ud fra hvor meget man har scrollet
    if (scrollpos > 600) {
        addFixed(); // når scrollpositionen er over 600 --> addFixed
    } else if (scrollpos < 600) {
        removeFixed(); // når scrollpositionen er under 600 --> removeFixed
    }

});

// fjerner class med translatey(-100%) og tilføjer class med translatey(0%)
function addFixed() {
    document.querySelector("header").classList.remove("fixed-notshowing");
    document.querySelector("header").classList.add("fixed");
    console.log("add fixed");

}

// fjerner class med translatey(0%) og tilføjer class med translatey(-100%)
function removeFixed() {
    document.querySelector("header").classList.remove("fixed");
    document.querySelector("header").classList.add("fixed-notshowing");
    console.log("fixed not showing");
}
