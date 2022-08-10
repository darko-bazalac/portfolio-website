// SELECTORS
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const navbar = document.querySelector("#nav");
const topLlink = document.querySelector(".top-link");
const modalBtn = [...document.querySelectorAll(".open-modal-btn")];
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");
const questions = document.querySelectorAll(".question");
const date = document.getElementById("date");
const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");
const navHeight = navbar.getBoundingClientRect().height;
const inputs = document.querySelectorAll(".input");
const inputFiels = document.querySelectorAll("input");
const sunMoonContainer = document.querySelector(".sun-moon-container");
const sunMoon = document.querySelectorAll(".theme-swap");
const body = document.querySelector("body");

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
);
//add scroll padding
document.documentElement.style.setProperty(
  "--scroll-padding",
  navHeight + 20 + "px",
);

// ****** EVENT LISTENERS **********

navToggle.addEventListener("click", togglingNav);
window.addEventListener("scroll", fixedNavOnScroll);
modalBtn.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
closeBtn.addEventListener("click", closeModal);
about.addEventListener("click", switchTabs);
sunMoon.forEach((item) => {
  item.addEventListener("click", darkModeToggle);
});
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    darkModeToggle();
  }
});

// ****** FUNCTIONS **********

// NAV TOGGLE
function togglingNav() {
  navbar.classList.toggle("fixed-nav");
  links.classList.toggle("show-links");
}

// FIXED NAV
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

// MODAL
function openModal() {
  window.removeEventListener("scroll", fixedNavOnScroll);
  topLlink.classList.remove("show-link");
  navbar.classList.remove("fixed-nav");
  modal.classList.add("open-modal");
  links.classList.remove("show-links");
}
function closeModal() {
  modal.classList.remove("open-modal");
  window.addEventListener("scroll", fixedNavOnScroll);
}
//close on clicking outside
window.onclick = function (e) {
  if (e.target == modal) {
    modal.classList.remove("open-modal");
    window.addEventListener("scroll", fixedNavOnScroll);
  }
};
//close on esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("open-modal");
    window.addEventListener("scroll", fixedNavOnScroll);
  }
});

// SHOW Q&A
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

//CONTACT FORM
//Styling
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

//Form validation
let errors = {
  name: [],
  email: [],
  phone: [],
};

inputFiels.forEach((element) => {
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

//ABOUT-SWITCH TABS
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

//SET DATE
date.innerHTML = new Date().getFullYear();

//COPY EMAIL ON CLICK/TOUCH
const copy = document.querySelector(".copy-to-clipboard");
const copyMobile = document.querySelector(".copy-email");

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(copy.textContent);
  copy.style.color = "var(--color-1)";
});

copyMobile.addEventListener("touchstart", () => {
  navigator.clipboard.writeText(copy.textContent);
  copyMobile.style.color = "black";
});

// THEME SWAP
function darkModeToggle() {
  if (body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  const currentRotation = parseInt(
    getComputedStyle(sunMoonContainer).getPropertyValue("--rotation"),
  );
  sunMoonContainer.style.setProperty("--rotation", currentRotation + 180);
}

// PROJECTS
const projects = [
  {
    id: 1,
    title: "pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./imgs/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "lunch",
    category: "lunch",
    price: 13.99,
    img: "./imgs/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "milkshake",
    category: "shakes",
    price: 6.99,
    img: "./imgs/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "breakfast",
    category: "breakfast",
    price: 20.99,
    img: "./imgs/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg burger",
    category: "lunch",
    price: 22.99,
    img: "./imgs/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./imgs/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon burger",
    category: "breakfast",
    price: 8.99,
    img: "./imgs/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./imgs/item-8.jpeg",
    desc: `loreon it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut `,
  },
  {
    id: 9,
    title: "quarantine shake",
    category: "shakes",
    price: 16.99,
    img: "./imgs/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "stake dinner",
    category: "dinner",
    price: 36.99,
    img: "./imgs/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];
//

const sectionCenter = document.querySelector(".project-section-center");
const container = document.querySelector(".project-btn-container");

//load items
window.addEventListener("DOMContentLoaded", function () {
  displayProjectItems(projects);
  displayProjectButtons();
});

function displayProjectItems(projectItems) {
  let displayProject = projectItems.map(function (item) {
    return `<article class="project-item">
          <img src=${item.img} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <div class="social-icons">
                <a><i class="fa-solid fa-desktop" style="font-size: 1.4rem;"></i></a>
                <a><i class="fa-brands fa-github"></i></a>
              </div>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });
  displayProject = displayProject.join("");

  sectionCenter.innerHTML = displayProject;
}

function displayProjectButtons() {
  const categories = projects.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"],
  );
  const categoryBtns = categories
    .map(function (category) {
      return `<button type="button" class="filter-btn" data-id=${category}>${category} </button>`;
    })
    .join("");
  container.innerHTML = categoryBtns;
  const filterBtn = document.querySelectorAll(".filter-btn");

  //filter items
  filterBtn.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const projectCategory = projects.filter(function (projectItem) {
        if (projectItem.category === category) {
          return projectItem;
        }
      });
      if (category === "all") {
        displayProjectItems(projects);
      } else {
        displayProjectItems(projectCategory);
      }
    });
  });
}
