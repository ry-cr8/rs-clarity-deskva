const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.innerHTML =
      '<span class="theme-toggle-icon" aria-hidden="true">' +
      (isDark
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>') +
      "</span>";
  }
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
applyTheme(savedTheme || preferredTheme);

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMobileNav() {
  if (navLinks) navLinks.classList.remove("open");
  if (navToggle) {
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
}

if (navToggle) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".navlinks a, .nav-dropdown-menu a").forEach(function (a) {
  a.addEventListener("click", function () {
    closeMobileNav();
    closeNavDropdown();
  });
});

const navDropdown = document.getElementById("navDropdown");
const navDropdownToggle = document.getElementById("navDropdownToggle");

function closeNavDropdown() {
  navDropdown.classList.remove("open");
  navDropdownToggle.setAttribute("aria-expanded", "false");
}

navDropdownToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  const isOpen = navDropdown.classList.toggle("open");
  navDropdownToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", function (e) {
  if (!navDropdown.contains(e.target)) {
    closeNavDropdown();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMobileNav();
    closeNavDropdown();
  }
});

themeToggle.addEventListener("click", function () {
  const nextTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
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

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
let statusTimeout = null;

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (statusTimeout) {
      clearTimeout(statusTimeout);
    }

    // 1. Honeypot check (Spam bot trap)
    const botcheck = contactForm.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      if (formStatus) {
        formStatus.className = "form-status success";
        formStatus.textContent = "Thank you! Your message has been sent successfully.";
      }
      contactForm.reset();
      return;
    }

    // 2. Client-side Rate Limiting (30-second cooldown per session)
    const COOLDOWN_MS = 30000;
    const lastSubmit = localStorage.getItem("lastFormSubmitTime");
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit, 10) < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - parseInt(lastSubmit, 10))) / 1000);
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.textContent = `Please wait ${secondsLeft} second${secondsLeft > 1 ? "s" : ""} before sending another message.`;
      }
      return;
    }

    // 3. Input Sanitization & Validation
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      if (formStatus) {
        formStatus.className = "form-status error";
        formStatus.textContent = "Please enter a valid email address.";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.className = "form-status loading";
      formStatus.textContent = "Sending your message...";
    }

    const formData = new FormData(contactForm);
    formData.set("name", nameVal);
    formData.set("email", emailVal);
    formData.set("message", messageVal);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
          // Record submit timestamp for rate-limiting
          localStorage.setItem("lastFormSubmitTime", Date.now().toString());

          if (formStatus) {
            formStatus.className = "form-status success";
            formStatus.textContent =
              "Thank you! Your message has been sent successfully. Rosemarie will get back to you soon.";

            statusTimeout = setTimeout(function () {
              formStatus.classList.add("fade-out");
              setTimeout(function () {
                formStatus.className = "form-status";
                formStatus.textContent = "";
              }, 500);
            }, 4500);
          }
          contactForm.reset();
        } else {
          if (formStatus) {
            formStatus.className = "form-status error";
            formStatus.textContent =
              json.message || "Something went wrong. Please try again.";

            statusTimeout = setTimeout(function () {
              formStatus.classList.add("fade-out");
              setTimeout(function () {
                formStatus.className = "form-status";
                formStatus.textContent = "";
              }, 500);
            }, 6000);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        if (formStatus) {
          formStatus.className = "form-status error";
          formStatus.textContent =
            "Something went wrong. Please check your network connection and try again.";
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      });
  });
}



