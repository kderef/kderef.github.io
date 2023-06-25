/*
een help function die tijd van bijvoorbeeld '5:12:6' naar '05:12:06' verandert.
 'n' is een getal zoals "5" of "16".
 'l' is de lengte die hij moet worden, bijvoorbeeld:
      n = "5" en l = 2, resultaat: "05"
      n = "10" en l = 4, resultaat: "0010"
*/

const bevrijdingsDag = "May 4"
const zelfstandigheidsDag = "May 1"

// de function die wordt 'gecalled' wanneer de gebruiker op het '?' drukt.
function showCountdownHelp(date) {
    var countdownHelpMsg;
    if (date === bevrijdingsDag) {
        /*
            dit is het bericht dat wordt getoond wanneer
            je het '?' knopje indrukt rechtsbovenin de timer window.
        */

        countdownHelpMsg = `
Tijdens de Franse overheersing (1795-1813) werd Hengelo op 1 mei 1802 een zelfstandige gemeente,
bestaande uit het dorp Hengelo en een aangrenzend deel dat werd aangeduid met Veldzijde.

bron: https://www.hengelo.nl/Ontdek-Hengelo/Geschiedenis-van-Hengelo.html`;
    }
    else if (date === zelfstandigheidsDag) {
        /*
            dit is het bericht dat wordt getoond wanneer
            je het '?' knopje indrukt rechtsbovenin de timer window.
        */

            countdownHelpMsg = `
Op donderdag 5 mei vieren wij Nationale Bevrijdingsdag.
Op de vooravond daarvan, op woensdag 4 mei, worden ook in Hengelo de slachtoffers herdacht die in Nederland of waar ook ter wereld zijn omgekomen of vermoord sinds het uitbreken van de Tweede Wereldoorlog,
in oorlogssituaties en bij vredesoperaties.
Daarom wordt om 20.00 uur twee minuten stilte in acht genomen.
Bij het herdenkingsmonument voor het stadhuis worden kransen gelegd.

bron: https://www.hengelo.nl/Welkom-in-Hengelo/Beheer/Nieuwsoverzicht/8119-Vrijheid-in-Verbondenheid.html`;
    }
    alert(countdownHelpMsg);
}

const padl = (n, l = 2) => n.toString().padStart(l, "0");

function startCountdown(date, id) {
    const currentYear = new Date().getFullYear();
    var countdownDate = new Date(`${date}, ${currentYear + 1}`);
    var update = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const msg = `<h3>${padl(days, 3)} : ${padl(hours)} : ${padl(minutes)} : ${padl(seconds)}</h3>`;

        document.getElementById(id).innerHTML = msg;
    });
}

startCountdown(bevrijdingsDag, "countdown-body-bevr");
startCountdown(zelfstandigheidsDag, "countdown-body-zelfst");