const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const openNavbar = document.getElementById("open-nav");
const navbar = document.querySelector(".nav");
const topLlink = document.querySelector(".top-link");
const modalBtn = [...document.querySelectorAll(".open-modal-btn")];
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const questions = document.querySelectorAll(".question");
const date = document.getElementById("date");
const btns = document.querySelectorAll(".tab-btn");
const btnSkills = document.querySelector(".skills-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");
const aboutSkills = document.querySelector(".about-skills");

// Event Listeners
navToggle.addEventListener("click", togglingNav);
window.addEventListener("scroll", fixedNavOnScroll);
modalBtn.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
closeBtn.addEventListener("click", closeModal);
about.addEventListener("click", switchTabs);

// navToggle
function togglingNav() {
  openNavbar.classList.add("fixed-nav");
  links.classList.toggle("show-links");
}

// fixed navbar
function fixedNavOnScroll() {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight - 10) {
    navbar.classList.add("fixed-nav");
  } else {
    links.classList.remove("show-links");
    navbar.classList.remove("fixed-nav");
  }
  //show top link
  if (scrollHeight > 500) {
    topLlink.classList.add("show-link");
  } else {
    topLlink.classList.remove("show-link");
  }
}

// open-close modal
function openModal() {
  window.removeEventListener("scroll", fixedNavOnScroll);
  topLlink.classList.remove("show-link");
  openNavbar.classList.remove("fixed-nav");
  modal.classList.add("open-modal");
  links.classList.remove("show-links");
}
function closeModal() {
  modal.classList.remove("open-modal");
  window.addEventListener("scroll", fixedNavOnScroll);
}

// show q&a
questions.forEach(function (question) {
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", () => {
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });
    question.classList.toggle("show-text");
  });
});

//contact form
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

//set date
date.innerHTML = new Date().getFullYear();

//about switch tabs
function switchTabs(e) {
  const id = e.target.dataset.id;
  if (id) {
    btns.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
}
