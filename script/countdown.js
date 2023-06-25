/*
dit is het bericht dat wordt getoond wanneer
je het '?' knopje indrukt rechtsbovenin de timer window.
*/
const countdownHelpMsg = `
Tijdens de Franse overheersing (1795-1813) werd Hengelo op 1 mei 1802 een zelfstandige gemeente,
bestaande uit het dorp Hengelo en een aangrenzend deel dat werd aangeduid met Veldzijde.

bron: https://www.hengelo.nl/Ontdek-Hengelo/Geschiedenis-van-Hengelo.html`;

// de function die wordt 'gecalled' wanneer de gebruiker op het '?' drukt.
const showCountdownHelp = () => alert(countdownHelpMsg);
/*
een help function die tijd van bijvoorbeeld '5:12:6' naar '05:12:06' verandert.
 'n' is een getal zoals "5" of "16".
 'l' is de lengte die hij moet worden, bijvoorbeeld:
      n = "5" en l = 2, resultaat: "05"
      n = "10" en l = 4, resultaat: "0010"
*/
const fmt00 = (n, l = 2) => n.toString().padStart(l, "0");

const currentYear = new Date().getFullYear();
var countdownDate = new Date(`May 1, ${currentYear + 1}`);
var update = setInterval(function () {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const msg = `<h3>${fmt00(days, 3)} : ${fmt00(hours)} : ${fmt00(minutes)} : ${fmt00(seconds)}</h3>`;

    document.getElementById("countdown-body").innerHTML = msg;
});