document.querySelector(".gear-icon").onclick = function () {
  document.querySelector(".settings-area").classList.toggle("open");
  this.querySelector("i").classList.toggle("fa-spin");
};

let bulletsContainer = document.querySelector(".nav-bullets");
let websiteSections = document.querySelectorAll(".sections section");

websiteSections.forEach((section) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet-box";
  bullet.setAttribute("data-section", `.${section.className}`);
  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerHTML = section.title;
  bullet.appendChild(tooltip);
  bulletsContainer.appendChild(bullet);
});

let sectionBullets = Array.from(bulletsContainer.children);

sectionBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
document.querySelectorAll(".links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

let colorOptions = document.querySelectorAll(".color-option li");
let savedColor = localStorage.getItem("color_option");
if (savedColor) {
  document.documentElement.style.setProperty("--main-color", savedColor);
  colorOptions.forEach((li) => {
    if (li.dataset.color === savedColor) {
      handleActive(colorOptions, li);
    }
  });
}

colorOptions.forEach((li) => {
  li.addEventListener("click", () => {
    handleActive(colorOptions, li);
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    localStorage.setItem("color_option", li.dataset.color);
  });
});

let backgroundStatus = true;
let backgroundInterval;
let backgroundOtions = document.querySelectorAll(".background-option span");
let savedImgsOption = localStorage.getItem("background_option");

if (savedImgsOption) {
  if (savedImgsOption === "yes") {
    backgroundStatus = true;
  } else {
    backgroundStatus = false;
  }
  backgroundOtions.forEach((span) => {
    if (span.dataset.images === savedImgsOption) {
      handleActive(backgroundOtions, span);
    }
  });
}

backgroundOtions.forEach((span) => {
  span.onclick = function () {
    handleActive(backgroundOtions, this);
    if (this.dataset.images === "yes") {
      backgroundStatus = true;
      randomizeBackground();
    } else {
      backgroundStatus = false;
      clearInterval(backgroundInterval);
    }
    localStorage.setItem("background_option", this.dataset.images);
  };
});
let images = [
  "imgs/01.jpg",
  "imgs/02.jpg",
  "imgs/03.jpg",
  "imgs/04.jpg",
  "imgs/05.jpg",
];
let landingPage = document.querySelector(".landing-page");

function randomizeBackground() {
  if (backgroundStatus) {
    backgroundInterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * images.length);
      landingPage.style.backgroundImage = `url(${images[randomIndex]})`;
    }, 5000);
  }
}

randomizeBackground();

let bulletsSpan = document.querySelectorAll(".bullet-option span");
let bulletsOption = localStorage.getItem("bullets_option");

if (bulletsOption) {
  bulletsContainer.style.display = bulletsOption;
  bulletsSpan.forEach((span) => {
    if (span.dataset.display === bulletsOption) {
      handleActive(bulletsSpan, span);
    }
  });
}

bulletsSpan.forEach((span) => {
  span.onclick = function () {
    handleActive(bulletsSpan, this);
    bulletsContainer.style.display = this.dataset.display;
    localStorage.setItem("bullets_option", this.dataset.display);
  };
});

document.querySelector(".reset-option").addEventListener("click", () => {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
});

function handleActive(elements, ele) {
  elements.forEach((element) => element.classList.remove("active"));
  ele.classList.add("active");
}

let toggleMenu = document.querySelector(".toggle-menu");
let linksContainer = document.querySelector(".links");

linksContainer.addEventListener("click", (e) => {
  e.stopPropagation();
});

toggleMenu.onclick = function () {
  this.classList.toggle("show-toggle");
  linksContainer.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== linksContainer) {
    if (linksContainer.classList.contains("open")) {
      toggleMenu.classList.toggle("show-toggle");
      linksContainer.classList.toggle("open");
    }
  }
});

let skillsSection = document.querySelector(".our-skills");
let skillsProgress = document.querySelectorAll(".skill-progress span");

window.onscroll = function () {
  let skillHeight = skillsSection.scrollHeight;
  let skillTop = skillsSection.offsetTop;
  let windowHeight = this.innerHeight;
  let windowTop = this.scrollY;
  if (windowTop >= skillHeight + skillTop - windowHeight) {
    skillsProgress.forEach(
      (span) => (span.style.width = span.dataset.progress)
    );
  }
};

let galleryImgs = document.querySelectorAll(".gallery img");

galleryImgs.forEach((img) => {
  img.onclick = function () {
    let popup = document.createElement("div");
    popup.className = "img-popup";
    document.body.appendChild(popup);

    let imageBox = document.createElement("div");
    imageBox.className = "box";
    if (img.alt !== "") {
      let imageTitle = document.createElement("h3");
      let titleTxt = document.createTextNode(img.alt);
      imageTitle.appendChild(titleTxt);
      imageBox.appendChild(imageTitle);
    }
    let image = document.createElement("img");
    image.src = img.src;
    imageBox.appendChild(image);
    let icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark delete-popup";
    imageBox.appendChild(icon);
    popup.appendChild(imageBox);
  };
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-popup")) {
    e.target.parentElement.parentElement.remove();
  }
});
