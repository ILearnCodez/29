const addButtonEl = document.getElementById("create-player-btn");
const playerContainerEl = document.getElementById("player-container");
let database = [];
addButtonEl.addEventListener("click", registerPlayer);
function registerPlayer() {
  let div = document.createElement("div");
  let playerNameEl = document.createElement("div");
  let playerScoreEl = document.createElement("div");
  playerScoreEl.textContent = "0";
  div.classList.add("player-panel");
  addButtonEl.style.display = "none";

  playerNameEl.contentEditable = true;
  playerNameEl.style.outline = "none";
  const focusOnPlayerName = function () {
    playerNameEl.focus();
  };
  const inputVerification = function (event) {
    if (
      (event.inputType != "deleteContentBackward" &&
        div.textContent.length == 14) ||
      event.inputType === "insertParagraph"
    ) {
      event.preventDefault();
    }
  };

  const confirmRegistration = function () {
    addButtonEl.style.display = "block";
    if (playerNameEl.textContent == "") {
      div.remove();
      return;
    }
    database.push({
      name: playerNameEl.textContent,
      score: playerScoreEl.textContent,
    });
    console.log(database[database.length - 1]);
    div.removeEventListener("click", focusOnPlayerName);
    playerNameEl.removeEventListener("blur", confirmRegistration);
    playerNameEl.removeEventListener("beforeinput", () =>
      inputVerification(event),
    );
    playerNameEl.contentEditable = false;
  };
  div.addEventListener("click", focusOnPlayerName);
  playerNameEl.addEventListener("blur", confirmRegistration);
  playerNameEl.addEventListener("beforeinput", () => inputVerification(event));
  div.append(playerNameEl, playerScoreEl);
  playerContainerEl.insertBefore(div, addButtonEl);
  playerNameEl.focus();
}
