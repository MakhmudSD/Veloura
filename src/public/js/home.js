console.log("JAVASCRIPT FILE HERE");

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".perfume-video");
  video.style.opacity = 0;
  video.oncanplay = () => {
    video.style.transition = "opacity 2s ease";
    video.style.opacity = 1;
  };
});
