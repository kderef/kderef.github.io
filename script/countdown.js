const createCountdownDate = (date, desc, help) => {
    return {
        "date": date,
        "description": desc,
        "help": help
    }
}

const bevrijdingsDag = createCountdownDate(
    "May 4", "bevrijdingsdag (4 mei)&emsp;&emsp;&emsp;&emsp;&emsp;",
    `
Tijdens de Franse overheersing (1795-1813) werd Hengelo op 1 mei 1802 een zelfstandige gemeente,
bestaande uit het dorp Hengelo en een aangrenzend deel dat werd aangeduid met Veldzijde.

bron: https://www.hengelo.nl/Ontdek-Hengelo/Geschiedenis-van-Hengelo.html`
)
const zelfstandigheidsDag = createCountdownDate(
    "May 1", "zelfstandigheidsdag (1 mei)&emsp;&emsp;&nbsp;",
    `
Tijdens de Franse overheersing (1795-1813) werd Hengelo op 1 mei 1802 een zelfstandige gemeente,
bestaande uit het dorp Hengelo en een aangrenzend deel dat werd aangeduid met Veldzijde.

bron: https://www.hengelo.nl/Ontdek-Hengelo/Geschiedenis-van-Hengelo.html`
)

// de function die wordt 'gecalled' wanneer de gebruiker op het '?' drukt.
function showCountdownHelp(date) {
    alert(date["help"]);
}

const padl = (n, l = 2) => n.toString().padStart(l, "0");

function startCountdown(date, id) {
    const currentYear = new Date().getFullYear();
    var countdownDate = new Date(`${date["date"]}, ${currentYear + 1}`);
    var update = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const msg = `${padl(days, 3)} : ${padl(hours)} : ${padl(minutes)} : ${padl(seconds)}`;

        document.getElementById(id).innerHTML = `${date["description"]}[${msg}]`;
    });
}

startCountdown(bevrijdingsDag, "countdown-a");
startCountdown(zelfstandigheidsDag, "countdown-b");