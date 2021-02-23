const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const medieurl = "https://upcoming-e777.restdb.io/media/";
let menu;
const myHeaders = {
	"x-apikey": "602e74085ad3610fb5bb6332"
}

console.log("ID", id);
document.addEventListener("DOMContentLoaded", loadJSON);


let filter = "alle";
let menuer;

async function loadJSON() {
	const JSONData = await fetch(`https://upcoming-e777.restdb.io/rest/kunstnere/${id}`, {
		headers: myHeaders
	});
	menu = await JSONData.json();

	console.log("Menu", menu);
	visMenu(menu);

	const filterKnapper = document.querySelectorAll(".navmenu a");
	filterKnapper.forEach(knap => knap.addEventListener("click", filtrerMenuer));

	const filterKnapper2 = document.querySelectorAll(".burgermenu a");
	filterKnapper2.forEach(knap => knap.addEventListener("click", filtrerMenuer));
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

	document.querySelector(".billedecredits").textContent = menu.billedecredits;

	document.querySelector(".navn").textContent = menu.navn;

	document.querySelector(".genre").textContent = "Genre: " + menu.genre;
	//VIRKER OGSÅ: klon.querySelector(".navn").innerHTML += ` ${menu.efternavn}`;

	document.querySelector(".youtubelink").innerHTML = menu.youtube;
	document.querySelector(".om").textContent = menu.om;
	document.querySelector(".lyttere").textContent = menu.lyttere;

	document.querySelector("button").addEventListener("click", tilbageTilMenu);

}

function tilbageTilMenu() {
	history.back();
}
