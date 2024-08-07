//! Get Default Font Size

const getDefaultFontSize = () => {
  const element = document.createElement("div");
  element.style.width = "1rem";
  element.style.display = "none";
  document.body.append(element);

  const widthMatch = window
    .getComputedStyle(element)
    .getPropertyValue("width")
    .match(/\d+/);

  element.remove();

  if (!widthMatch || widthMatch.length < 1) {
    return null;
  }

  const result = Number(widthMatch[0]);
  return !isNaN(result) ? result : null;
};

//! What to expect (Services) Section Accordion

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((accordionItem) => {
  const setMaxHeight = (item) => {
    const accordionItemTitleHeight =
      item.querySelector(".accordion-title").scrollHeight;

    item.style.maxHeight = `${
      (getDefaultFontSize() / 10) * accordionItemTitleHeight +
      (getDefaultFontSize() / 10) * 48
    }px`;
  };

  setMaxHeight(accordionItem);

  accordionItem.addEventListener("click", () => {
    if (!accordionItem.classList.contains("accordion-open")) {
      accordionItems.forEach((accordionItem) => {
        setMaxHeight(accordionItem);
        accordionItem.classList.remove("accordion-open");
      });
      accordionItem.style.maxHeight = ``;
      accordionItem.classList.add("accordion-open");
    } else {
      setMaxHeight(accordionItem);
      accordionItem.classList.remove("accordion-open");
    }
  });
});

//! Adjust CTA textarea height automatically

const textareaEl = document.querySelector("#message");
textareaEl.addEventListener("input", () => {
  textareaEl.style.height = textareaEl.scrollHeight + "px";
});

//! Sticky Navigation Bar

const headerEl = document.querySelector(".header");
const heroSectionEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      headerEl.classList.add("sticky");
      heroSectionEl.classList.add("margin-top--bg");
      heroSectionEl.classList.remove("magic");
    } else if (entry.isIntersecting) {
      headerEl.classList.remove("sticky");
      heroSectionEl.classList.remove("margin-top--bg");
    }
  },
  {
    threshold: 0,
    root: null,
    rootMargin: `-${getDefaultFontSize() * 8}px`,
  }
);

observer.observe(heroSectionEl);

//! "Mysterious" Button Functionality

const jsConfetti = new JSConfetti();
const mysteriousButtonEl = document.querySelector("#mysterious-button");

mysteriousButtonEl.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(() => {
    heroSectionEl.classList.add("magic");
    jsConfetti.addConfetti({
      confettiNumber: 600,
      confettiRadius: 6,
    });
  }, 1000);
});

//! Open/Close Mobile Navigation

const menuButtonEl = document.querySelector(".menu-btn");
const html = document.querySelector("html");

menuButtonEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
  html.classList.toggle("no-scroll");
});

//! Smooth Scroll when clicking on Links

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((linkEl) => {
  linkEl.addEventListener("click", (event) => {
    const href = linkEl.getAttribute("href");

    if (href === "#") {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      event.preventDefault();
      const section = document.querySelector(href);
      section.scrollIntoView({ behavior: "smooth" });
      html.classList.remove("no-scroll");
      headerEl.classList.remove("open");
    }
  });
});
