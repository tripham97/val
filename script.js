// ===== MUSIC =====
const musicList = [
  "music.mp3",
  "music2.mp3",
  "music3.mp3"
];

let currentMusicIndex = 0;
const musicPlayer = document.getElementById("bg-music");

// ===== NAVIGATION =====
function goTo(screenNumber) {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.add("hidden");
  });
  document.getElementById(`screen${screenNumber}`).classList.remove("hidden");
}

function startExperience(screen) {
  musicPlayer.volume = 0.3;
  musicPlayer.src = musicList[currentMusicIndex];
  musicPlayer.play();
  goTo(screen);
}

function nextMusic() {
  currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
  musicPlayer.src = musicList[currentMusicIndex];
  musicPlayer.play();
}

function goToWrong() {
  alert("Hình như gửi nhầm người rồi 📫");
}

function selectDate(option) {
  goTo(4);
  document.getElementById("date-result").innerText =
    `Vậy chọn ${option} nha 💖\nAnh mong chờ lắm đó 😊`;
}

// ===== NO BUTTON RUN AWAY =====
const noBtn = document.getElementById("no-btn");

if (noBtn) {
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("touchstart", moveNoButton);
}

function moveNoButton() {
  const x = Math.floor(Math.random() * 140) - 70;
  const y = Math.floor(Math.random() * 90) - 45;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
