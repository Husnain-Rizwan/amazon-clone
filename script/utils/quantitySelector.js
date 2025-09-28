export function quantitySelector(productId){
    const valueElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(valueElement.value);

    return quantity;
}