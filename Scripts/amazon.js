import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(() => {
  let productHtml = "";

  products.forEach((product) => {
    const html = `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
          src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
          src=${product.getStarUrl()}>
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select id="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        ${product.renderSizeChartLink()}
        ${product.renderInstructionLink()}
        ${product.renderWarrantyLink()}
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;
    productHtml += html;
  });
  // display product and cart quantity to html
  document.querySelector(".products-grid").innerHTML = productHtml;
  UpdateCartQuantity();

  function UpdateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".cart-quantity").innerText = cartQuantity || "";
  }

  // add to cart buttons EventListener
  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      UpdateCartQuantity();
    });
  });
});