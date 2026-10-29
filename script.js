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


// ===== DATE IDEAS & CALENDAR =====
const dateIdeas = {
  music: "Nghe nhạc live",
  golf: "Mini golf",
  arcade: "Arcade",
  cinema: "Xem phim",
  bowling: "Bowling"
};
let selectedDateType = "";
let selectedCuisine = "";
const cuisines = {
  "vietnamese": "Món Việt",
  "japanese": "Món Nhật",
  "korean": "Món Hàn",
  "thai": "Món Thái",
  "chinese": "Món Hoa",
  "italian": "Món Ý",
  "mexican": "Món Mexico",
  "american": "Món Mỹ",
  "surprise": "Anh chọn cho em"
};

function getDatePlan() {
  return `${selectedDateType} + Bữa tối: ${selectedCuisine}`;
}

function selectDate(option) {
  if (!Object.hasOwn(dateIdeas, option)) return;
  selectedDateType = dateIdeas[option];
  goTo(6);
}

function selectCuisine(option) {
  if (!selectedDateType || !Object.hasOwn(cuisines, option)) return;
  selectedCuisine = cuisines[option];
  document.getElementById("date-result").textContent =
    `Hoạt động: ${selectedDateType} 🎃\nBữa tối: ${selectedCuisine} 🍽️\nZui quá chờiiii 😊`;
  goTo(4);
  notifyDateSelection();
}

function getEventStart() {
  if (!selectedDateType || !selectedCuisine) return null;
  const date = document.getElementById("event-date");
  const time = document.getElementById("event-time");
  if (!date.reportValidity() || !time.reportValidity()) return null;
  return date.value.replaceAll("-", "") + "T" + time.value.replaceAll(":", "") + "00";
}

function addToGoogleCalendar() {
  const start = getEventStart();
  if (!start) return;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `💖 Hẹn hò — ${getDatePlan()}`,
    details: `Hẹn hò cùng em 💕\n${getDatePlan()}`,
    dates: `${start}/${start}`,
    ctz: "America/Chicago"
  });
  window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener,noreferrer");
}

function downloadICS() {
  const start = getEventStart();
  if (!start) return;
  const escapeICS = value => value.replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Date Invitation//VI", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:${Date.now()}@date-invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `SUMMARY:${escapeICS(`💖 Hẹn hò — ${getDatePlan()}`)}`,
    `DESCRIPTION:${escapeICS(`Hẹn hò cùng em 💕\n${getDatePlan()}`)}`,
    `DTSTART;TZID=America/Chicago:${start}`,
    "END:VEVENT", "END:VCALENDAR"
  ];
  // Fold long lines without splitting UTF-8 characters.
  const encoder = new TextEncoder();
  const folded = lines.map(line => {
    let result = "", length = 0;
    for (const char of line) {
      const size = encoder.encode(char).length;
      if (length + size > 75) { result += "\r\n "; length = 1; }
      result += char;
      length += size;
    }
    return result;
  }).join("\r\n") + "\r\n";
  const url = URL.createObjectURL(new Blob([folded], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "our-date.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ===== EMAIL NOTIFICATIONS =====
let notificationRequest = 0;
let pendingNotification = "";
let lastNotifiedSelection = "";

async function notifyDateSelection() {
  if (!selectedDateType || !selectedCuisine) return;
  const selection = getDatePlan();
  if (!selection || pendingNotification === selection) return;
  const status = document.getElementById("email-status");
  const retry = document.getElementById("email-retry");
  const request = ++notificationRequest;
  retry.classList.add("hidden");
  if (lastNotifiedSelection === selection) {
    status.textContent = "Lựa chọn này đã được gửi cho anh rồi nha 💌";
    return;
  }
  const recipient = window.DATE_NOTIFICATION_RECIPIENT;
  if (!recipient) {
    status.textContent = "Chưa gửi được lựa chọn. Em nhắn anh biết nha 💕";
    return;
  }
  const fallback = document.getElementById("email-fallback");
  fallback.classList.add("hidden");
  fallback.href = `mailto:${encodeURIComponent(window.DATE_NOTIFICATION_EMAIL || recipient)}?subject=${encodeURIComponent("Lựa chọn buổi hẹn")}&body=${encodeURIComponent(selection)}`;
  if (window.location.protocol === "file:") {
    status.textContent = "Em mở email bên dưới rồi bấm Gửi nha 💌";
    fallback.classList.remove("hidden");
    return;
  }
  pendingNotification = selection;
  status.textContent = "Đang gửi lựa chọn cho anh… 💌";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const endpoint = window.DATE_NOTIFICATION_ENDPOINT || `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`;
    const isFormspree = new URL(endpoint).hostname === "formspree.io";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        _subject: "💌 She picked an activity and dinner cuisine!",
        _template: "table",
        name: document.querySelector(".highlight-name").textContent.trim(),
        selection,
        message: "She accepted your invitation and picked this activity and dinner cuisine. If she changes her choice, a new update will follow.",
        _url: window.location.href
      })
    });
    if (!response.ok) throw new Error(`Email provider returned HTTP ${response.status}`);
    const result = await response.json();
    const accepted = isFormspree ? result.ok === true : (result.success === true || result.success === "true");
    if (!accepted) throw new Error(result.message || "Notification was not accepted");
    if (request !== notificationRequest) return;
    lastNotifiedSelection = selection;
    status.textContent = "Đã gửi lựa chọn của em cho anh 💌";
  } catch (error) {
    if (request !== notificationRequest) return;
    console.error("Date notification failed:", error);
    status.textContent = "Chưa gửi được email tự động. Em mở email bên dưới rồi bấm Gửi nha 💌";
    retry.classList.remove("hidden");
    fallback.classList.remove("hidden");
  } finally {
    clearTimeout(timeout);
    if (pendingNotification === selection) pendingNotification = "";
  }
}
