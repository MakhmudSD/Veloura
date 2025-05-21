console.log("Signup frontend javascript file");

// Animate the form on page load
window.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: ".signup-frame",
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutExpo",
  });

  createSphereDots();
});

// Shake animation for invalid form
function shakeForm() {
  anime({
    targets: ".signup-frame",
    translateX: [
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: -5, duration: 100 },
      { value: 5, duration: 100 },
      { value: 0, duration: 100 },
    ],
    easing: "easeInOutQuad",
  });
}

// File input image preview & validation
$(function () {
  const fileTarget = $(".file-box input[type='file']");
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile?.type;
      const validImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (!validImageTypes.includes(fileType)) {
        alert("Only JPEG, JPG, PNG, and WEBP image formats are allowed");
        $(this).val("");
        $(".upload-img-frame")
          .removeClass("success")
          .attr("src", "/img/default.webp");
      } else {
        const imageURL = URL.createObjectURL(uploadFile);
        $(".upload-img-frame").attr("src", imageURL).addClass("success");
        filename = uploadFile.name;
        $(this).siblings(".upload-name").val(filename);
      }
    }
  });
});

function validateSignupForm() {
  const memberNick = $(".member-nick").val().trim();
  const memberPhone = $(".member-phone").val().trim();
  const memberPassword = $(".member-password").val().trim();
  const confirmPassword = $(".confirm-password").val().trim();

  const memberImage = $(".member-image").get(0).files[0];

  if (!memberNick || !memberPhone || !memberPassword || !confirmPassword) {
    alert("Please fill in all required fields before submitting");
    shakeForm();
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Oops! Your passwords don't match. Please try again");
    shakeForm();
    return false;
  }

  if (!memberImage) {
    alert("No image selected. Please choose a file to upload");
    shakeForm();
    return false;
  }

  // Button scale animation on submit
  anime({
    targets: ".signup-btn",
    scale: [1, 1.05, 1],
    duration: 300,
    easing: "easeInOutQuad",
  });

  return true;
}

// dots animation
function createSphereDots() {
  const sphere = document.getElementById("sphere-animation");
  const dots = [];

  for (let i = 0; i < 40; i++) {
    const dot = document.createElement("div");
    dot.classList.add("sphere-dot");
    sphere.appendChild(dot);
    dots.push(dot);
  }

  anime({
    targets: dots,
    translateX: () =>
      anime.random(-window.innerWidth / 2, window.innerWidth / 2),
    translateY: () =>
      anime.random(-window.innerHeight / 2, window.innerHeight / 2),
    translateZ: () => anime.random(-100, 100),
    opacity: [0.3, 1],
    easing: "easeInOutSine",
    duration: 4000,
    direction: "alternate",
    loop: true,
    delay: anime.stagger(50),
  });
}

window.addEventListener("DOMContentLoaded", () => {
  createSphereDots();
});
