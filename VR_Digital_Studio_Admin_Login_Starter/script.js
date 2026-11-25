/* VR Digital Studio — small, dependency-free interactions */
"use strict";

/*
 * SETUP: Replace this value with the studio's real inbox before publishing.
 * Example: const CONTACT_EMAIL = "hello@yourdomain.com";
 */
const CONTACT_EMAIL = "vikrantrai640@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Highlight the current in-page section in the desktop navigation.
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Reveal content as it enters the viewport. Content stays visible if unsupported.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Keep the displayed contact details consistent with the single config value.
  document.querySelectorAll("[data-email-link]").forEach(link => {
    link.textContent = CONTACT_EMAIL;
    link.href = `mailto:${CONTACT_EMAIL}`;
  });

  // Package buttons preselect the matching enquiry option.
  const packageSelect = document.querySelector("#package");
  document.querySelectorAll("[data-package]").forEach(button => {
    button.addEventListener("click", () => {
      if (!packageSelect) return;
      const packageName = button.dataset.package;
      const option = [...packageSelect.options].find(item =>
        item.text.toLowerCase().includes(packageName.toLowerCase())
      );
      if (option) packageSelect.value = option.value;
    });
  });

  // Contact form opens a pre-filled draft in the visitor's default email app.
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    const fields = [...form.querySelectorAll("input, textarea")];
    fields.forEach(field => {
      field.addEventListener("input", () => {
        field.removeAttribute("aria-invalid");
      });
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      status.className = "form-status";

      const name = form.elements.fullName.value.trim();
      const business = form.elements.businessName.value.trim();
      const email = form.elements.email.value.trim();
      const selectedPackage = form.elements.package.value || "Not specified";
      const description = form.elements.projectDescription.value.trim();

      const requiredFields = [
        { element: form.elements.fullName, valid: name.length >= 2 },
        { element: form.elements.email, valid: form.elements.email.validity.valid && email.length > 0 },
        { element: form.elements.projectDescription, valid: description.length >= 10 }
      ];
      const invalid = requiredFields.filter(field => !field.valid);
      if (invalid.length) {
        invalid.forEach(field => field.element.setAttribute("aria-invalid", "true"));
        invalid[0].element.focus();
        status.textContent = "Please check your name, email address and project description.";
        status.classList.add("error");
        return;
      }

      if (!CONTACT_EMAIL || CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
        status.textContent = "The enquiry form is ready, but the studio email is still a placeholder. Add your real email in script.js before publishing.";
        status.classList.add("error");
        return;
      }

      const subject = `Website enquiry from ${name}`;
      const body = [
        "Hello VR Digital Studio,",
        "",
        "I'd like to discuss a website project.",
        "",
        `Name: ${name}`,
        `Business: ${business || "Not provided"}`,
        `Reply email: ${email}`,
        `Service / package: ${selectedPackage}`,
        "",
        "Project details:",
        description,
        "",
        "Thank you."
      ].join("\n");

      const mailto = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email application with the enquiry details. Review the draft and press Send there.";
      status.classList.add("success");
      window.location.href = mailto;
    });
  }

  // Dynamic footer year.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();


});
