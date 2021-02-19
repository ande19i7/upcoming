const header = document.querySelector("h2");
const medieurl = "https://upcoming-e777.restdb.io/media/";
const myHeaders = {
    "x-apikey": "602e74085ad3610fb5bb6332"
}
document.addEventListener("DOMContentLoaded", start)

let filter = "alle";
let menuer;



// første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll(".navmenu a");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerMenuer));
    loadJSON();

    const filterKnapper2 = document.querySelectorAll(".burgermenu a");
    filterKnapper2.forEach(knap => knap.addEventListener("click", filtrerMenuer));
    loadJSON();






}



function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#burgersection").classList.toggle("hidden");

    let erSkjult = document.querySelector("#burgersection").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#burgerknap").textContent = "☰";

    } else {
        document.querySelector("#burgerknap").textContent = "✖";


    }
}




function filtrerMenuer() {
    filter = this.dataset.genre;

    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    header.textContent = this.textContent;

    visMenuer();
}



async function loadJSON() {
    const JSONData = await fetch("https://upcoming-e777.restdb.io/rest/kunstnere", {

        headers: myHeaders
    });
    menuer = await JSONData.json();
    console.log("Menu", menuer);
    visMenuer();
}



//funktion der viser menuer i liste view
function visMenuer() {
    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
    dest.textContent = "";
    menuer.forEach(menu => {
        console.log(menu);
        // loop igennem json (menuer)
        if (filter == menu.genre || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + menu.billede;

            klon.querySelector(".billede").alt = "Billede af " + menu.navn;

            klon.querySelector(".billede").title = menu.navn;

            klon.querySelector(".navn").textContent = menu.navn;

            klon.querySelector(".genre").textContent = "Genre: " + menu.genre;
            //VIRKER OGSÅ: klon.querySelector(".navn").innerHTML += ` ${person.efternavn}`;


            klon.querySelector(".spotifylink").innerHTML = menu.spotifylink;



            klon.querySelector(".menu button").addEventListener("click", () => visDetaljer(menu));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(detaljer) {
    console.log("02-detalje.html");
    location.href = `upcoming-detaljer.html?id=${detaljer._id}`;
}
