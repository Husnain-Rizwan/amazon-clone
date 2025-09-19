export const cart = [];

export function addToCart(productId){
  let matchingItem;
      
      cart.forEach((cartItem) => {
        if(productId === cartItem.productId)
          matchingItem = cartItem;
      })
      
      const valueElement = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(valueElement.value);

      if(matchingItem){
        matchingItem.quantity += quantity;
      }else {
        cart.push({
        productId,
        quantity
      });
      }
};