function goTo(screenNumber) {
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('hidden');
  });
  document.getElementById(`screen${screenNumber}`).classList.remove('hidden');
}

function startExperience(screen) {
  const music = document.getElementById("bg-music");
  music.volume = 0.3;
  music.play();
  goTo(screen);
}

function goToWrong() {
  alert("Oops! Wrong mailbox 📫");
}

function selectDate(option) {
  goTo(4);
  document.getElementById("date-result").innerText =
    `Yay! ${option} it is 💖\nI can’t wait 😊`;
}
