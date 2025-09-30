export function quantitySelector(productId){
    const valueElement = document.querySelector(`.js-quantity-selector-${productId}`);
    if (!valueElement) {
        return 1; // default quantity if input not found
    }
    return Number(valueElement.value);
}
