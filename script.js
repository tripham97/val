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


// ===== CALENDAR INFO =====
let selectedDateType = "";
const eventDate = "20260214"; // YYYYMMDD (ví dụ: 14/02/2026)
const startTime = "190000";   // 19:00
const endTime = "203000";     // 20:30
const timeZone = "Ha-Noi";

function selectDate(option) {
  selectedDateType = option;
  goTo(4);
  document.getElementById("date-result").innerText =
    `Vậy mình hẹn ${option} nha 💖\n14/02 lúc 19:00 nhé 😊`;
}

// ===== GOOGLE CALENDAR =====
function addToGoogleCalendar() {
  const title = encodeURIComponent("💖 Valentine Online Date");
  const details = encodeURIComponent(
    `Hẹn hò online cùng Hoàng Ngọc Mi 💕\n${selectedDateType}`
  );

  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${title}` +
    `&details=${details}` +
    `&dates=${eventDate}T${startTime}/${eventDate}T${endTime}` +
    `&ctz=${timeZone}`;

  window.open(url, "_blank");
}

// ===== DOWNLOAD .ICS =====
function downloadICS() {
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:💖 Valentine Online Date
DESCRIPTION:Hẹn hò online cùng Hoàng Ngọc Mi 💕 - ${selectedDateType}
DTSTART:${eventDate}T${startTime}
DTEND:${eventDate}T${endTime}
END:VEVENT
END:VCALENDAR
  `.trim();

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "valentine-date.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
