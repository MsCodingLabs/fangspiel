// Holt alle Bildschirme, die durch die Klasse ".screen" gekennzeichnet sind
const screens = document.querySelectorAll(".screen");
// Holt alle Buttons zum Auswählen der Süßigkeiten
const chooseSweetBtns = document.querySelectorAll(".choose-sweet-btn");
// Holt den Start-Button
const startButton = document.getElementById("start-btn");
// Holt das Element für das Spiel (Spielfeld)
const gameNode = document.getElementById("game-container");
// Holt die Elemente für Zeit und Punktestand
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

// Initialisiert die Zeit (in Sekunden) und den Punktestand
let seconds = 0;
let score = 0;
// Initialisiert das ausgewählte Süßigkeit-Objekt
let selectedSweet = {};

// Event-Listener für den Start-Button, der den ersten Bildschirm ausblendet und den zweiten anzeigt
startButton.addEventListener("click", () => {
  screens[0].classList.remove("visible"); // Entfernt die Sichtbarkeit des ersten Bildschirms
  screens[1].classList.add("visible"); // Macht den zweiten Bildschirm sichtbar
});

// Fügt Event-Listener zu jedem Button hinzu, der eine Süßigkeit auswählt
chooseSweetBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Holt das Bild der gewählten Süßigkeit und deren Quelle (src)
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");

    // Speichert die Quelle der ausgewählten Süßigkeit
    selectedSweet = { src };

    // Blendet den Auswahlbildschirm aus und zeigt den Spielbildschirm
    screens[1].classList.remove("visible");
    screens[2].classList.add("visible");

    // Startet das Spiel
    startGame();
  });
});

// Startet das Spiel: Setzt einen Intervall für die Zeitsteigerung und erstellt die erste Süßigkeit
function startGame() {
  setInterval(increaseTime, 1000); // Zeit alle 1000ms (1 Sekunde) erhöhen
  createSweet(); // Erzeugt die erste Süßigkeit im Spiel
}

// Erhöht die Zeit (Sekunden) und aktualisiert die Anzeige
function increaseTime() {
  timeEl.innerHTML = `Zeit: ${seconds}`; // Zeitanzeige aktualisieren
  seconds++; // Erhöht die Sekunden
}

// Erzeugt eine neue Süßigkeit an einer zufälligen Position
function createSweet() {
  const { x, y } = getRandomLocation(); // Holt eine zufällige Position

  const sweet = document.createElement("img"); // Erstellt ein neues Bild-Element für die Süßigkeit
  sweet.src = selectedSweet.src; // Setzt die Quelle der Süßigkeit

  sweet.classList.add("sweet"); // Fügt der Süßigkeit eine CSS-Klasse hinzu
  sweet.style.display = "block"; // Zeigt das Bild an
  sweet.style.top = `${y}px`; // Positioniert die Süßigkeit vertikal
  sweet.style.left = `${x}px`; // Positioniert die Süßigkeit horizontal
  sweet.style.transform = `rotate(${Math.random() * 360})deg`; // Dreht das Bild zufällig

  sweet.addEventListener("click", catchSweet); // Fügt Event-Listener hinzu, der die Süßigkeit bei Klick "fängt"

  gameNode.appendChild(sweet); // Fügt die Süßigkeit zum Spiel hinzu
}

// Gibt eine zufällige Position für die Süßigkeit innerhalb des Bildschirms zurück
function getRandomLocation() {
  const width = window.innerWidth; // Bildschirmbreite
  const height = window.innerHeight; // Bildschirmhöhe

  // Generiert eine zufällige Position, die nicht aus dem Bildschirm herausragt
  const x = Math.max(0, Math.random() * (width - 120));
  const y = Math.max(0, Math.random() * (height - 120));

  return { x, y }; // Gibt die Position als Objekt zurück
}

// Spielt das Geräusch ab, wenn eine Süßigkeit gefangen wird
function playBiteSound() {
  const audio = document.getElementById("audio"); // Holt das Audio-Element

  audio.play(); // Spielt das Audio ab
}

// Funktion, die aufgerufen wird, wenn eine Süßigkeit "gefangen" wird
function catchSweet() {
  playBiteSound(); // Spielt das Geräusch ab
  increaseScore(); // Erhöht den Punktestand

  this.remove(); // Entfernt die gefangene Süßigkeit aus dem Spiel

  addSweet(); // Fügt eine neue Süßigkeit hinzu
}

// Fügt nach einer Sekunde eine neue Süßigkeit hinzu
function addSweet() {
  setTimeout(createSweet, 1000); // Wartet 1 Sekunde und erstellt eine neue Süßigkeit
}

// Erhöht den Punktestand und aktualisiert die Anzeige
function increaseScore() {
  score++; // Erhöht den Punktestand
  scoreEl.innerHTML = `Punktestand ${score}`; // Aktualisiert die Punktestand-Anzeige
}

// Maximale Zeit für das Spiel
const maxTime = 60; // Maximalzeit in Sekunden
let timerId; // Variable, um die Timer-ID zu speichern

// Startet das Spiel mit Zeit-Intervall und Süßigkeiten-Erstellung
function startGame() {
  timerId = setInterval(increaseTime, 1000); // Speichert die Timer-ID für den Zeit-Intervall
  createSweet(); // Erzeugt die erste Süßigkeit
}

// Erhöht die Zeit und stoppt das Spiel nach Erreichen der maximalen Zeit
function increaseTime() {
  if (seconds < maxTime) {
    // Solange die Zeit unter dem Maximalwert liegt
    timeEl.innerHTML = `Zeit: ${seconds}`; // Zeit aktualisieren
    seconds++; // Zeit erhöhen
  } else {
    endGame(); // Spiel beenden, wenn die Zeit abgelaufen ist
  }
}

// Beendet das Spiel, stoppt den Timer und zeigt den Endpunktestand
function endGame() {
  clearInterval(timerId); // Stoppt den Timer
  alert(`Spiel vorbei! Dein Punktestand: ${score}`); // Zeigt die Endpunktzahl an
  location.reload(); // Lädt die Seite neu, um das Spiel zurückzusetzen
}
