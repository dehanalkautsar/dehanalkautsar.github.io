document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("main section"));
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const contactForm = document.getElementById("contactForm");
  const root = document.documentElement;

  /* ===== Nav: click to scroll ===== */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      navbar.classList.remove("open");
    });
  });

  /* ===== Active nav on scroll ===== */
  function onScroll() {
    const scrollPos = window.scrollY;
    const offset = 120;
    let currentId = "intro";

    for (const section of sections) {
      if (scrollPos + offset >= section.offsetTop) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("data-target");
      link.classList.toggle("active", targetId === currentId);
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ===== PUBLICATIONS SECTION ===== */
  // auto expand/hide
    function setupPublicationToggle() {
        const pubList = document.getElementById('pub-list');
        const pubToggleBtn = document.getElementById('pubToggleBtn');

        if (!pubList || !pubToggleBtn) {
            console.warn('pub-list or pubToggleBtn not found in the DOM.');
            return;
        }

        const setPubExpandedState = (expanded) => {
            pubList.classList.toggle('is-expanded', expanded);
            pubToggleBtn.classList.toggle('expanded', expanded);  // NEW LINE
            pubToggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            pubToggleBtn.textContent = expanded
                ? 'Show highlighted only ↑'
                : 'Show all publications ↓';
        };

        // Start collapsed
        setPubExpandedState(false);

        pubToggleBtn.addEventListener('click', () => {
            const pubCurrentlyExpanded = pubList.classList.contains('is-expanded');
            setPubExpandedState(!pubCurrentlyExpanded);
        });
    }
    setupPublicationToggle();

  /* ===== NEWS SECTION ===== */
  // auto expand/hide
    function setupNewsToggle() {
        const newsList = document.getElementById('news-list');
        const newsToggleBtn = document.getElementById('newsToggleBtn');

        if (!newsList || !newsToggleBtn) {
            console.warn('news-list or newsToggleBtn not found in the DOM.');
            return;
        }

        const setNewsExpandedState = (expanded) => {
            newsList.classList.toggle('is-expanded', expanded);
            newsToggleBtn.classList.toggle('expanded', expanded);  // NEW LINE
            newsToggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            newsToggleBtn.textContent = expanded
                ? 'Show highlighted only ↑'
                : 'Show all news ↓';
        };

        // Start collapsed
        setNewsExpandedState(false);

        newsToggleBtn.addEventListener('click', () => {
            const newsCurrentlyExpanded = newsList.classList.contains('is-expanded');
            setNewsExpandedState(!newsCurrentlyExpanded);
        });
    }
    setupNewsToggle();

  /* ===== Mobile nav toggle ===== */
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });

  /* ===== Theme handling ===== */
  const THEME_KEY = "preferred-theme";

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    themeIcon.textContent = theme === "dark" ? "🦄" : "🐻";
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme);
  } else {
    setTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });


  /* ===== Footer year ===== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Activate smooth transitions only after page loads
window.addEventListener("load", () => {
  document.documentElement.classList.add("theme-transition");
});