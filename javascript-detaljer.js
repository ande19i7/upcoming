const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const medieurl = "https://babushka-dd8a.restdb.io/media/";
let menu;
const myHeaders = {
    "x-apikey": "600ec2fb1346a1524ff12de4"
}

console.log("ID", id);
document.addEventListener("DOMContentLoaded", loadJSON);


let filter = "alle";
let menuer;

async function loadJSON() {
    const JSONData = await fetch(`https://babushka-dd8a.restdb.io/rest/menu/${id}`, {
        headers: myHeaders
    });
    menu = await JSONData.json();

    console.log("Menu", menu);
    visMenu(menu);

    const filterKnapper = document.querySelectorAll(".navmenu a");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerMenuer));
    loadJSON();

    const filterKnapper2 = document.querySelectorAll(".burgermenu a");
    filterKnapper2.forEach(knap => knap.addEventListener("click", filtrerMenuer));
    loadJSON();



    document.querySelector("#burgerknap").addEventListener("click", toggleMenu);

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
    filter = this.dataset.kategori;

    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    header.textContent = this.textContent;


}

function visMenu() {
    document.querySelector(".billede").src = medieurl + menu.billede;

    document.querySelector(".billede").alt = "Billede af " + menu.navn;

    document.querySelector(".billede").title = menu.navn;

    document.querySelector(".navn").textContent = menu.navn;

    document.querySelector(".pris").textContent = menu.pris + " kr.";
    //VIRKER OGSÅ: klon.querySelector(".navn").innerHTML += ` ${menu.efternavn}`;


    document.querySelector(".langbeskrivelse").textContent = menu.langbeskrivelse;
    document.querySelector(".oprindelsesregion").textContent = menu.oprindelsesregion;

    document.querySelector("button").addEventListener("click", tilbageTilMenu);

}

function tilbageTilMenu() {
    history.back();
}
