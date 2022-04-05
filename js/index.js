const apicall = "http://api.quotable.io/random";

const tempsAffche = document.querySelector('.temps');
const scoreAffche = document.querySelector('.score');
const phraseEcrire = document.querySelector('.phraseAEcrire');
const phraseTest = document.querySelector('.phrase-test');
const p = document.querySelector('.p');
let copy = document.getElementById("copyPhrase")
    //
let temps = 60;
let score = 0;
let phrasePourScore;
tempsAffche.innerText = 'Temps :' + temps;
scoreAffche.innerText = 'Score :' + score;

// Gestion des messages pour voir si l'utilisateur à copier où non
phraseEcrire.addEventListener('copy', (copyText))




// Mettre un timer
let timer = setInterval(time, 1000);

function time() {
    temps--
    tempsAffche.innerText = 'Votre Temps :' + temps;
    scoreAffche.innerText = 'Score :' + score;
    if (temps === 0) {
        clearInterval(timer)
        p.innerText = 'Vous avez Pu totaliser un Score de: ' + score + " points" + " En 60s ";

    }

}

// Prendre une phrase de l'api
async function afficherNvPhrase() {
    const appel = await fetch(apicall);
    const resultats = await appel.json();
    console.log(resultats.content)
    const phrase = resultats.content;
    phrasePourScore = phrase.length;
    //
    phraseEcrire.innerHTML = "";
    phrase.split("").forEach(carac => {
        const caracSpan = document.createElement("span");
        caracSpan.innerText = carac;
        phraseEcrire.appendChild(caracSpan);
    });
    phraseTest.value = null;
}
afficherNvPhrase()

// Cette function nous permettra de savoir si les phrases ecrites par l'utilisateur 
phraseTest.addEventListener("input", () => {
    const tableauPhrase = phraseEcrire.querySelectorAll('span');
    const tableauTest = phraseTest.value.split('');

    let correct = true;

    tableauPhrase.forEach((caracSpan, index) => {
        console.log(caracSpan)
        const caractere = tableauTest[index];

        if (caractere === undefined) {
            caracSpan.classList.remove('correct');
            caracSpan.classList.remove('incorrect');
            correct = false;
        } else if (caractere === caracSpan.innerText) {
            caracSpan.classList.add('correct');
            caracSpan.classList.remove('incorrect');
        } else {
            caracSpan.classList.remove('correct');
            caracSpan.classList.add('incorrect');
            correct = false;
        }

    })
    if (correct) {
        afficherNvPhrase();
        score += phrasePourScore;
    } else {
        score -= phrasePourScore;
    }

})

function copyText() {
    copy.innerHTML = "Tu as copié(e), je pensais pourvoir compter sur ta sincérité ..! Une sanction te sera donc accordé(e). Pour éviter des triches, à chaque copie que tu feras des points seront enlevés";
    setTimeout(() => {
        copy.style.display = "none";
    }, 9000);
    score -= phrasePourScore;
}