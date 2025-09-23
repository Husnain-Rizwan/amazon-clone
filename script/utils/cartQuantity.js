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
      
      return cartQuantity;
};
