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

  // nếu chưa có src thì gán bài đầu
  if (!musicPlayer.src) {
    musicPlayer.src = musicList[currentMusicIndex];
  }

  musicPlayer.play().catch(() => {
    console.log("Chờ tương tác người dùng để phát nhạc");
  });

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


// ===== NO BUTTON RUN AWAY (UPGRADED 😈) =====
const noBtn = document.getElementById("no-btn");

let runawayLevel = 1; // càng hover càng chạy xa

if (noBtn) {
  noBtn.addEventListener("mouseenter", runAway);
  noBtn.addEventListener("touchstart", runAway);
}

function runAway() {
  runawayLevel++;

  // phạm vi chạy trốn tăng dần
  const maxX = Math.min(220 + runawayLevel * 20, 420);
  const maxY = Math.min(160 + runawayLevel * 15, 300);

  const x = Math.floor(Math.random() * maxX * 2) - maxX;
  const y = Math.floor(Math.random() * maxY * 2) - maxY;

  noBtn.style.transition = "transform 0.15s ease-out";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function toggleMusic() {
  if (musicPlayer.paused) {
    musicPlayer.src = musicList[currentMusicIndex];
    musicPlayer.play();
  } else {
    musicPlayer.pause();
  }
}
