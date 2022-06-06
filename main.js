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
const navHeight = navbar.getBoundingClientRect().height;
const inputs = document.querySelectorAll(".input");

// Event Listeners
navToggle.addEventListener("click", togglingNav);
window.addEventListener("scroll", fixedNavOnScroll);
modalBtn.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
closeBtn.addEventListener("click", closeModal);
if (about) {
  about.addEventListener("click", switchTabs);
}

// navToggle
function togglingNav() {
  openNavbar.classList.add("fixed-nav");
  links.classList.toggle("show-links");
}

// fixed navbar
function fixedNavOnScroll() {
  const scrollHeight = window.scrollY;
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
//add scroll padding
document.documentElement.style.setProperty(
  "--scroll-padding",
  navHeight + 20 + "px"
);

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

//form validation
let errors = {
  name: [],
  email: [],
  phone: [],
};

inputs.forEach((element) => {
  element.addEventListener("change", (e) => {
    let currentInput = e.target;
    let inputValue = currentInput.value;
    let inputName = currentInput.getAttribute("name");

    if (inputValue.length > 4) {
      currentInput.classList.remove("invalid");
      errors[inputName] = [];

      switch (inputName) {
        case "name":
          let validation = inputValue.trim();
          validation = validation.split(" ");
          if (validation.length < 2) {
            errors[inputName].push("Please enter Full Name.");
            currentInput.classList.add("invalid");
          }
          break;
        case "email":
          if (!isValidEmail(inputValue)) {
            errors[inputName].push("Invalid email address.");
            currentInput.classList.add("invalid");
          }
          break;
        case "phone":
          if (!isValidPhone(inputValue)) {
            errors[inputName].push("Phone format is invalid.");
            currentInput.classList.add("invalid");
          }
      }
    } else {
      errors[inputName] = [`${inputName} must be at least 5 character.`];
      currentInput.classList.add("invalid");
    }
    populateErrors();
  });
});

const populateErrors = () => {
  for (let el of document.querySelectorAll(".input-container ul")) {
    el.remove();
  }

  for (let key of Object.keys(errors)) {
    let inputField = document.querySelector(`input[name="${key}"]`);
    let parentElement = inputField.parentElement;
    let errorElement = document.createElement("ul");
    parentElement.appendChild(errorElement);

    errors[key].forEach((error) => {
      let li = document.createElement("li");
      li.innerText = error;
      errorElement.appendChild(li);
    });
  }
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
};

//about page-switch tabs
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

//set date
date.innerHTML = new Date().getFullYear();
