// ====================== DYNAMIC VARIABLES (change later easily) ======================
// You can edit these variables to customize names, date, location, image, music source
const CONFIG = {
  groomName: "Kareem",
  brideName: "Menna",
  weddingDate: "Friday, July 10th, 2026",
  weddingTime: "8:00 PM",
  venueName: "Romanica Hall · El-Mokatam, Cairo",
  venueMapLink:
    "https://www.google.com/maps/place/%D9%85%D8%AD%D9%88%D8%B1+%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1+%D8%B9%D8%A8%D8%AF+%D8%A7%D9%84%D9%85%D8%AC%D9%8A%D8%AF+%D9%85%D8%AD%D9%85%D9%88%D8%AF+%D8%A7%D9%84%D9%85%D9%82%D8%B7%D9%85%E2%80%AD/@30.019708,31.3262344,18.74z/data=!4m14!1m7!3m6!1s0x14583fb5f8144e91:0xb84fa556bd3eb832!2z2YXYrdmI2LEg2KfZhNmF2LPYqti02KfYsSDYudio2K8g2KfZhNmF2KzZitivINmF2K3ZhdmI2K8g2KfZhNmF2YLYt9mF!8m2!3d30.0197384!4d31.3258503!16s%2Fg%2F11v5tsj05f!3m5!1s0x14583fb5f8144e91:0xb84fa556bd3eb832!8m2!3d30.0197384!4d31.3258503!16s%2Fg%2F11v5tsj05f?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D",
  imageUrl: "assets/images/menna.jpeg", // replace with actual romantic image
  musicUrl: "assets/music/song.mp3", // soft piano / instrumental (change to your own)
  romanticMessage: "We are waiting for you to celebrate with us",
};

// DOM elements
const hookScreen = document.getElementById("hookScreen");
const mainCard = document.getElementById("mainCard");
const tapBtn = document.getElementById("tapToOpenBtn");
const locationBtn = document.getElementById("locationBtn");
const bgMusic = document.getElementById("bgMusic");
const musicToggleDiv = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicStatusSpan = document.getElementById("musicStatus");
const weddingImg = document.getElementById("weddingImage");

// Apply config variables to the page content dynamically (so user can change later)
function applyDynamicContent() {
  // update names in big-names section (Ali ❤️ Sara)
  const namesContainer = document.querySelector(".big-names");
  if (namesContainer) {
    namesContainer.innerHTML = `${CONFIG.groomName} <span class="heart-icon">❤️</span> ${CONFIG.brideName}`;
  }
  // update date block
  const dateValueDiv = document.querySelector(".date-value");
  if (dateValueDiv) {
    dateValueDiv.innerHTML = `<i class="fas fa-star-of-life"></i>  ${CONFIG.weddingDate}  <i class="fas fa-star-of-life"></i>`;
    const timeSpan = document.querySelector(".date-block div:last-child");
    if (timeSpan && timeSpan.style) {
      timeSpan.innerHTML = `at ${CONFIG.weddingTime} · sunset ceremony`;
    }
  }
  // update location text
  const locationSub = document.querySelector(
    ".location-section div:last-child",
  );
  if (locationSub) {
    locationSub.innerHTML = `🌹 ${CONFIG.venueName} 🌹`;
  }
  // update message
  const msgParagraph = document.querySelector(".message-card p");
  if (msgParagraph) {
    msgParagraph.innerHTML = `✨ “${CONFIG.romanticMessage}” ✨`;
  }
  // update image source
  if (weddingImg) {
    weddingImg.src = CONFIG.imageUrl;
    weddingImg.alt = `${CONFIG.groomName} & ${CONFIG.brideName} wedding`;
  }
  // update music source
  if (bgMusic) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.load();
  }
  // update location button link (view location)
  if (locationBtn) {
    locationBtn.onclick = (e) => {
      e.preventDefault();
      window.open(CONFIG.venueMapLink, "_blank");
      // zoom effect on tap
      locationBtn.style.transform = "scale(0.96)";
      setTimeout(() => {
        locationBtn.style.transform = "";
      }, 150);
    };
  }
}

// Music handling (start softly after opening)
let musicPlaying = false;
let musicStarted = false;

function enableMusic() {
  if (!musicStarted) {
    bgMusic.volume = 0.45;
    bgMusic
      .play()
      .then(() => {
        musicPlaying = true;
        musicStarted = true;
        updateMusicUI(true);
      })
      .catch((err) => {
        console.log("autoplay blocked, user interaction needed");
        musicPlaying = false;
        updateMusicUI(false);
      });
  } else {
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      updateMusicUI(false);
    } else {
      bgMusic
        .play()
        .then(() => {
          musicPlaying = true;
          updateMusicUI(true);
        })
        .catch(() => {});
    }
  }
}

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicIcon.className = "fas fa-volume-up";
    musicStatusSpan.innerText = "♥ Melody";
  } else {
    musicIcon.className = "fas fa-music";
    musicStatusSpan.innerText = "♫ muted";
  }
}

// Helper function for scale animation on elements
function addScaleAnimation(element, scale = 0.94) {
  if (!element) return;
  element.style.transform = `scale(${scale})`;
  setTimeout(() => {
    element.style.transform = "";
  }, 150);
}

// open invitation: hide hook, show main card, start music
function openInvitation() {
  hookScreen.classList.add("hidden");
  mainCard.classList.add("visible");
  enableMusic();

  // Animate names section
  const namesDiv = document.querySelector(".names-section");
  if (namesDiv) {
    namesDiv.style.animation = "none";
    namesDiv.offsetHeight; // force reflow
    namesDiv.style.animation = "fadeSlideUp 0.9s ease forwards";
  }

  // Slight zoom on image
  const imgEl = document.querySelector(".wedding-img");
  if (imgEl) {
    imgEl.style.transform = "scale(1.02)";
    setTimeout(() => {
      imgEl.style.transform = "";
    }, 400);
  }
}

// Tap to open button event
tapBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  addScaleAnimation(tapBtn);
  openInvitation();
});

// Click on hook background (outside button) opens invitation
hookScreen.addEventListener("click", (e) => {
  if (
    e.target === hookScreen ||
    e.target.closest(".hook-content") ===
      hookScreen?.querySelector(".hook-content")
  ) {
    if (!e.target.closest("#tapToOpenBtn")) {
      addScaleAnimation(tapBtn);
      openInvitation();
    }
  }
});

// Music toggle click (bottom right)
musicToggleDiv.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!musicStarted && mainCard.classList.contains("visible")) {
    bgMusic.volume = 0.45;
    bgMusic
      .play()
      .then(() => {
        musicPlaying = true;
        musicStarted = true;
        updateMusicUI(true);
      })
      .catch(() => {
        alert("Please tap again to enable background music 🎵");
      });
  } else {
    if (musicPlaying) {
      bgMusic.pause();
      musicPlaying = false;
      updateMusicUI(false);
    } else {
      bgMusic
        .play()
        .then(() => {
          musicPlaying = true;
          updateMusicUI(true);
        })
        .catch(() => {});
    }
  }
});

// Extra interactive: zoom on image click
if (weddingImg) {
  weddingImg.addEventListener("click", () => {
    weddingImg.style.transform = "scale(1.03)";
    setTimeout(() => {
      weddingImg.style.transform = "";
    }, 280);
  });
}

// Apply all dynamic data from CONFIG
applyDynamicContent();

// Ensure main card starts hidden
window.addEventListener("load", () => {
  mainCard.classList.remove("visible");
  if (bgMusic) bgMusic.volume = 0.4;
});

// ====================== COUNTDOWN TIMER (without leading zeros) ======================
function updateCountdown() {
  // Wedding: July 10, 2026 at 8:00 PM (20:00)
  const weddingDate = new Date("July 10, 2026 20:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.querySelector(".timer-label").innerHTML =
      '<i class="fas fa-heart"></i> Today is the Day!';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  // Display numbers without leading zeros
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
}

// Initialize timer and update every second
setInterval(updateCountdown, 1000);
updateCountdown();
