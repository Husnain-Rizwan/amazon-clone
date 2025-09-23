import { cart } from "../../data/Cart.js";

export function updateCartQuantity(){
  let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;  
      });

    const cartQuantityEl = document.querySelector('.js-cart-quantity');
      if(cartQuantityEl){
        cartQuantityEl.innerHTML = cartQuantity;
      }

    const headerElement = document.querySelector('.js-checkout-header');
    if(headerElement){
      headerElement.innerHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${cartQuantity} items</a>)`;   
      }

      return cartQuantity;
};
