console.log("Products frontend javascript file");
$(function () {
  const categorySelect = document.querySelector(
    'select[name="productCategory"]'
  );
  const volumeContainer = document.getElementById("volume-container");
  const quantityContainer = document.getElementById("quantity-container");

  const toggleVolumeOrQuantity = () => {
    const selected = categorySelect.value;
    if (selected === "ACCESSORY" || selected === "GIFT_SET") {
      volumeContainer.style.display = "none";
      quantityContainer.style.display = "block";

      volumeContainer.querySelector(
        'select[name="productVolumeMl"]'
      ).disabled = true;
      quantityContainer.querySelector(
        'input[name="productQuantity"]'
      ).disabled = false;
    } else {
      volumeContainer.style.display = "block";
      quantityContainer.style.display = "none";

      volumeContainer.querySelector(
        'select[name="productVolumeMl"]'
      ).disabled = false;
      quantityContainer.querySelector(
        'input[name="productQuantity"]'
      ).disabled = true;
    }
  };

  toggleVolumeOrQuantity();
  categorySelect.addEventListener("change", toggleVolumeOrQuantity);
});

// Toggle shop container on process/cancel button click
$("#process-btn").on("click", () => {
  $(".shop-container").slideToggle(500);
  $("#process-btn").css("display", "none");
});

$("#cancel-btn").on("click", () => {
  $(".shop-container").slideToggle(100);
  $("#process-btn").css("display", "flex");
});

// Product status change handler
$(".new-product-status").on("change", async function (e) {
  const id = e.target.id;
  const productStatus = $(`#${id}.new-product-status`).val();

  try {
    const response = await axios.post(`/admin/product/${id}`, {
      productStatus: productStatus,
    });
    console.log(response.data);
    const result = response.data;
    if (result.data) {
      console.log("Product updated successfully!");
      $(".new-product-status").blur();
    } else {
      alert("Unable to update the product. Please try again");
    }
  } catch (err) {
    console.error("ERROR on productStatus", err);
    alert("Unable to update the product. Please try again");
  }
});
// Particle background canvas animation
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 2 + 1,
  dx: Math.random() * 1 - 0.5,
  dy: Math.random() * 1 - 0.5,
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#D4AF37"; // Veloura gold tone
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Product form validation
function validateForm() {
  const productName = $(".product-name").val();
  const productPrice = $(".product-price").val();
  const productTier = $(".product-tier").val();
  const productCategory = $(".product-category").val();
  const productDesc = $(".product-desc").val();
  const productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productTier === "" ||
    productCategory === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please fill in all the required fields");
    return false;
  }
  return true;
}

// Image preview handler for new product file input
function previewFileHandler(input, order) {
  const imgClassName = input.className;
  const file = $(`.${imgClassName}`).get(0).files[0];

  const validImageType = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
  if (!validImageType.includes(file?.type)) {
    alert(
      "Only JPEG, JPG, WEBP or PNG image files are allowed. Please try again"
    );
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      $(`#image-section-${order}`).attr("src", reader.result);
    };
    reader.readAsDataURL(file);
  }
}
