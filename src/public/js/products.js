console.log("Products frontend javascript file");

$(function () {
    $(".product-category").on("change", () => {
      const selectedValue = $(".product-category").val();
      if (selectedValue === "COLORING") {
        $("#product-color").show();
        $("#product-style").hide();
      } else {
        $("#product-color").hide();
        $("#product-style").show();
      }
    });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

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
      } else alert("Unable to update the product. Please try again");
    } catch (err) {
      console.log("ERROR on productStatus", err);
      alert("Unable to update the product. Please try again");
    }
  });
});

function validateForm() {
  const productName = $(".product-name").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val(),
    productStatus = $(".product-status").val();

  if (
    productName === "" ||
    productPrice === "" ||
    productLeftCount === "" ||
    productCollection === "" ||
    productDesc === "" ||
    productStatus === ""
  ) {
    alert("Please fill in all the required fields");
    return false; // restricts sending data to the backend
  } else return true;
}
