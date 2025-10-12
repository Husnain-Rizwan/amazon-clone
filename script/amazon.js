import {products} from "../data/products.js";
import {cart, addToCart} from "../data/Cart.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "./utils/cartQuantity.js";
import { quantitySelector } from "./utils/quantitySelector.js";
import { loadProductsFetch} from '../data/products.js'

// loadProducts(renderProductsGrid);
loadProductsFetch().then(() => {
  renderProductsGrid();
});

function renderProductsGrid(){
let productsHTML = '';

const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

filteredProducts.forEach((product) => {

productsHTML += `
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
            src="${product.getstarUrl()}">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
          ${product.getmoney()} 
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
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

        ${product.extendsInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}";>
        Add to Cart
        </button>
    </div>
`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

updateCartQuantity();

function addedMessageAppearance(addedMessageTimeoutId, productId){
  if(addedMessageTimeoutId){
        clearTimeout(addedMessageTimeoutId);
      }

      const divElement = document.querySelector(`.js-added-to-cart-${productId}`) ;
      divElement.classList.add('addedCart');

      const timeoutId = setTimeout(() => {
        divElement.classList.remove('addedCart');
      }, 2000);

      addedMessageTimeoutId = timeoutId;
};

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    let addedMessageTimeoutId;
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      
      quantitySelector(productId)
      addToCart(productId);
      updateCartQuantity(); 
      addedMessageAppearance(addedMessageTimeoutId, productId);
    });
});

document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });

}