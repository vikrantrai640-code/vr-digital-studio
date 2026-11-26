/* VR Digital Studio — interactions + Firebase enquiry submission */
"use strict";
const CONTACT_EMAIL = "vikrantrai640@gmail.com";
const firebaseConfig = {
  apiKey: "AIzaSyAK-opjqjoJTP-K2JdEI056EZB0LdR-fOc",
  authDomain: "vr-digital-b1a8b.firebaseapp.com",
  projectId: "vr-digital-b1a8b",
  storageBucket: "vr-digital-b1a8b.firebasestorage.app",
  messagingSenderId: "758897488982",
  appId: "1:758897488982:web:7930a058f2462dc2b277f7"
};
// Firebase config values are public client identifiers. Firestore access is protected by rules.
let enquiryDb = null;

try {
  if (typeof firebase !== "undefined" && firebase.apps) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    enquiryDb = firebase.firestore();
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}


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
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !open);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
    document.addEventListener("click", e => { if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu(); });
  }
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window && navLinks.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      });
    }), { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
  const revealItems = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  document.querySelectorAll("[data-email-link]").forEach(link => { link.textContent = CONTACT_EMAIL; link.href = `mailto:${CONTACT_EMAIL}`; });
  const packageSelect = document.querySelector("#package");
  document.querySelectorAll("[data-package]").forEach(button => button.addEventListener("click", () => {
    if (!packageSelect) return;
    const name = button.dataset.package;
    const option = [...packageSelect.options].find(item => item.text.toLowerCase().includes(name.toLowerCase()));
    if (option) packageSelect.value = option.value;
  }));
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (form && status) {
    [...form.querySelectorAll("input, textarea")].forEach(field => field.addEventListener("input", () => field.removeAttribute("aria-invalid")));
    form.addEventListener("submit", async e => {
      e.preventDefault(); status.className = "form-status";
      const name = form.elements.fullName.value.trim();
      const business = form.elements.businessName.value.trim();
      const email = form.elements.email.value.trim().toLowerCase();
      const packageName = form.elements.package.value || "Not specified";
      const description = form.elements.projectDescription.value.trim();
      const checks = [
        { element: form.elements.fullName, valid: name.length >= 2 && name.length <= 100 },
        { element: form.elements.email, valid: form.elements.email.validity.valid && email.length > 0 && email.length <= 254 },
        { element: form.elements.projectDescription, valid: description.length >= 10 && description.length <= 2000 }
      ];
      const invalid = checks.filter(x => !x.valid);
      if (invalid.length) {
        invalid.forEach(x => x.element.setAttribute("aria-invalid", "true"));
        invalid[0].element.focus(); status.textContent = "Please check your name, email address and project description."; status.classList.add("error"); return;
      }
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      status.textContent = "Sending enquiry…";
      try {
        await enquiryDb.collection("enquiries").add({
          name, businessName: business, email, package: packageName, description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        status.textContent = "Thank you! Your enquiry was sent successfully. We'll reply by email.";
        status.classList.add("success"); form.reset();
      } catch (err) {
        console.error("Enquiry submission error:", err);
        status.textContent = "Sorry, we couldn't send this enquiry right now. Please email us directly.";
        status.classList.add("error");
      } finally { if (submitButton) submitButton.disabled = false; }
    });
  }
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
});
