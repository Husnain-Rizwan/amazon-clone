import { addToCart } from "../data/Cart.js";
import { cart, loadFromStorage } from "../data/Cart.js";
import { removeFromCart } from "../data/Cart.js";
import { updateCartQuantity } from "../script/utils/cartQuantity.js";
import { updatedeliveryOption } from '../data/Cart.js';


describe('Test Suite: Add To Cart', () => {

beforeEach(() => {
    spyOn(localStorage, 'setItem');
});

    it('add a new existing product in cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: '1'
            }]));
    });

    it('add a new Product in cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
    }]));
    });
});

describe('remove From Cart', () => {

	beforeEach(() => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }  
	]);
	});
	loadFromStorage();
	});

	
	it('remove a product with Id', () => {
		
		removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
		expect(cart.length).toEqual(1);
		expect(cart[0].quantity).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
		{
			productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
			quantity: 1,
			deliveryOptionId: '2'	
		}  
	]));
	});

	it('remove a product Outside of cart', () => {
		removeFromCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
		expect(cart.length).toEqual(2);
		expect(cart[0].quantity).toEqual(2);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
		{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
		},
		{
			productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
			quantity: 1,
			deliveryOptionId: '2'	
		}  
	]));
	});
});

describe('Test Suite: UpdateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() =>{
      return JSON.stringify([{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }]);
    });

    loadFromStorage();
  }); 

  it('basic update delivery Option test', () => {
    updatedeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(
      localStorage.setItem
    ).toHaveBeenCalledWith('cart', JSON.stringify([{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '3'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }]));
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('update delivery Option test if productId is not in cart', () => {
    updatedeliveryOption('hfkfiuahfiuifi', '3');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('update delivrey Option test if delivreyOptionId is wrong', () => {
    updatedeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '5');
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});