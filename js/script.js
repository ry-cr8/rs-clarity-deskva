document.getElementById("navToggle").addEventListener("click", function () {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll(".navlinks a").forEach(function (a) {
  a.addEventListener("click", function () {
    document.getElementById("navLinks").classList.remove("open");
  });
});

(function () {
  const tiles = document.querySelectorAll(".tool-tile");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tiles.forEach(function (tile, i) {
            setTimeout(function () {
              tile.classList.add("pop");
            }, i * 90);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );
  if (tiles.length) {
    observer.observe(document.querySelector(".tools-grid"));
  }
})();

function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox(e) {
  if (
    e.target.id === "lightbox" ||
    e.target.classList.contains("lightbox-close")
  ) {
    document.getElementById("lightbox").classList.remove("open");
  }
}

const serviceSamples = {
  admin: {
    title: "Administrative Support",
    desc: "Day-to-day admin work drawn from the same organized approach shown across email, calendar, and file management below.",
    images: [],
  },
  email: {
    title: "Email Management",
    desc: "From inbox cleanup to a branded signature, ready to install and use.",
    images: [
      "img-email-before",
      "img-email-after",
      "img-email-compose",
      "img-email-signature",
    ],
  },
  calendar: {
    title: "Calendar Management",
    desc: "Bookings, Zoom invitations, and full training schedules kept organized and conflict-free.",
    images: ["img-cal-calendly", "img-cal-schedule", "img-cal-training"],
  },
  social: {
    title: "Social Media Management",
    desc: "A sample of social media graphics designed for content and engagement.",
    images: [
      "img-gfx-1",
      "img-gfx-2",
      "img-gfx-3",
      "img-gfx-4",
      "img-gfx-5",
      "img-gfx-6",
      "img-gfx-7",
    ],
  },
  data: {
    title: "Data Organization",
    desc: "Files and folders structured so information is easy to find.",
    images: ["img-file-after"],
  },
  leads: {
    title: "Lead Generation",
    desc: "Sample work for this service is coming soon — get in touch to discuss your lead generation needs directly.",
    images: [],
  },
};

function openServiceModal(key) {
  const data = serviceSamples[key];
  if (!data) return;
  document.getElementById("serviceModalTitle").textContent = data.title;
  document.getElementById("serviceModalDesc").textContent = data.desc;
  const grid = document.getElementById("serviceModalGrid");
  grid.innerHTML = "";
  if (data.images.length === 0) {
    grid.innerHTML =
      '<div class="smb-empty">Sample work coming soon for this service.</div>';
  } else {
    data.images.forEach(function (id) {
      const srcEl = document.getElementById(id);
      if (!srcEl) return;
      const thumb = document.createElement("div");
      thumb.className = "service-modal-thumb";
      const img = document.createElement("img");
      img.src = srcEl.src;
      img.alt = srcEl.alt;
      img.onclick = function () {
        openLightbox(srcEl.src);
      };
      thumb.appendChild(img);
      grid.appendChild(thumb);
    });
  }
  document.getElementById("serviceModal").classList.add("open");
}
function closeServiceModal(e) {
  if (
    e.target.id === "serviceModal" ||
    e.target.classList.contains("service-modal-close")
  ) {
    document.getElementById("serviceModal").classList.remove("open");
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("lightbox").classList.remove("open");
    document.getElementById("serviceModal").classList.remove("open");
  }
});

document.querySelectorAll(".svc-card[data-service]").forEach(function (card) {
  card.addEventListener("click", function () {
    openServiceModal(card.dataset.service);
  });
});

var lightbox = document.getElementById("lightbox");
var lightboxClose = document.getElementById("lightboxClose");
var serviceModal = document.getElementById("serviceModal");
var serviceModalClose = document.getElementById("serviceModalClose");

if (lightbox) {
  lightbox.addEventListener("click", closeLightbox);
}
if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}
if (serviceModal) {
  serviceModal.addEventListener("click", closeServiceModal);
}
if (serviceModalClose) {
  serviceModalClose.addEventListener("click", closeServiceModal);
}
