const intro = document.querySelector("#intro");
const canvas = document.querySelector("#videoWall");
const ctx = canvas.getContext("2d");
const packageButtons = document.querySelectorAll(".select-package");
const selectedPackage = document.querySelector("#selectedPackage");
const bookingForm = document.querySelector("#bookingForm");
const formNote = document.querySelector("#formNote");
const workRail = document.querySelector("#workRail");
const workPrev = document.querySelector("[data-work-prev]");
const workNext = document.querySelector("[data-work-next]");

let width = 0;
let height = 0;
let frame = 0;
const sparks = Array.from({ length: 48 }, (_, index) => ({
  offset: index / 48,
  drift: Math.random() * Math.PI * 2,
  size: 1 + Math.random() * 2.8,
}));

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawVideoWall() {
  frame += 0.018;
  ctx.clearRect(0, 0, width, height);

  const columns = width < 720 ? 3 : 5;
  const rows = width < 720 ? 4 : 3;
  const gap = 12;
  const tileW = width / columns;
  const tileH = height / rows;

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const px = x * tileW + gap;
      const py = y * tileH + gap;
      const w = tileW - gap * 2;
      const h = tileH - gap * 2;
      const hue = (x * 42 + y * 31 + frame * 120) % 360;
      const sweep = Math.sin(frame * 2 + x + y) * 0.5 + 0.5;

      const gradient = ctx.createLinearGradient(px, py, px + w, py + h);
      gradient.addColorStop(0, `hsl(${hue}, 90%, 68%)`);
      gradient.addColorStop(0.52, `hsl(${(hue + 66) % 360}, 80%, 58%)`);
      gradient.addColorStop(1, "#070707");

      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.fillStyle = gradient;
      ctx.fillRect(px, py, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.fillRect(px + w * sweep - 8, py, 16, h);
      ctx.strokeStyle = "rgba(255,255,255,0.24)";
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, w, h);
      ctx.restore();
    }
  }

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgba(0,0,0,0.42)";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  drawSparkPath();

  if (intro && getComputedStyle(intro).visibility !== "hidden") {
    requestAnimationFrame(drawVideoWall);
  }
}

function drawSparkPath() {
  const progress = (frame * 0.22) % 1;
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const startX = width * 0.18;
  const startY = height * 0.58;

  ctx.save();
  ctx.globalCompositeOperation = "screen";

  const beam = ctx.createLinearGradient(startX, startY, centerX, centerY);
  beam.addColorStop(0, "rgba(255, 111, 143, 0)");
  beam.addColorStop(0.48, "rgba(200, 255, 61, 0.28)");
  beam.addColorStop(1, "rgba(143, 232, 255, 0.75)");
  ctx.strokeStyle = beam;
  ctx.lineWidth = Math.max(1, width * 0.0025);
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(width * 0.28, height * 0.36, width * 0.42, height * 0.64, centerX, centerY);
  ctx.stroke();

  sparks.forEach((spark) => {
    const t = (spark.offset + progress) % 1;
    const x =
      (1 - t) ** 3 * startX +
      3 * (1 - t) ** 2 * t * width * 0.28 +
      3 * (1 - t) * t ** 2 * width * 0.42 +
      t ** 3 * centerX;
    const y =
      (1 - t) ** 3 * startY +
      3 * (1 - t) ** 2 * t * height * 0.36 +
      3 * (1 - t) * t ** 2 * height * 0.64 +
      t ** 3 * centerY;
    const flicker = 0.35 + Math.sin(frame * 22 + spark.drift) * 0.25 + t * 0.45;

    ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    ctx.beginPath();
    ctx.arc(x, y, spark.size * (0.45 + t), 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(143, 232, 255, ${flicker * 0.55})`;
    ctx.beginPath();
    ctx.arc(x + Math.sin(spark.drift + frame * 4) * 12, y + Math.cos(spark.drift) * 8, spark.size * 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function duplicateMarquee() {
  const marquee = document.querySelector(".marquee div");
  marquee.innerHTML = `${marquee.innerHTML}${marquee.innerHTML}`;
}

function scrollWorkRail(direction) {
  if (!workRail) return;
  const firstCard = workRail.querySelector(".case-card");
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 16 : 420;
  workRail.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
}

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".package-card");
    const packageName = card.dataset.package;
    const price = card.dataset.price;
    selectedPackage.value = `${packageName} - ${price}`;
    document.querySelector("#book").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const packageChoice = data.get("package");
  formNote.textContent = `Request prepared for ${packageChoice}. Connect this form to Stripe, Calendly, email, or your CRM when you are ready to accept live bookings.`;
  bookingForm.reset();
  selectedPackage.value = packageChoice;
});

workPrev?.addEventListener("click", () => scrollWorkRail(-1));
workNext?.addEventListener("click", () => scrollWorkRail(1));

if (intro) {
  window.setTimeout(() => {
    intro.classList.add("is-complete");
  }, 10800);
}

function loadLazyVideo(video) {
  if (video.dataset.lazyLoaded === "true") return;
  const sources = video.querySelectorAll("source[data-src]");
  sources.forEach((source) => {
    source.src = source.dataset.src;
  });
  video.load();
  video.dataset.lazyLoaded = "true";
}

function initLazyVideos() {
  const lazyVideos = document.querySelectorAll("video.lazy-video");
  if (lazyVideos.length === 0) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadLazyVideo(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "300px 0px 300px 0px",
        threshold: 0.01,
      }
    );

    lazyVideos.forEach((video) => observer.observe(video));
  } else {
    lazyVideos.forEach(loadLazyVideo);
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
initLazyVideos();
duplicateMarquee();
drawVideoWall();
