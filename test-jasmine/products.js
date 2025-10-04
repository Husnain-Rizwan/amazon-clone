import {Product} from '../data/products.js';

describe('Test Suite: Test of Classes of Products', () =>{
    let product;

    beforeEach(() => {
        product = new Product({
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
    });
    });

    it('has Correct Properties', () => {
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product.rating).toEqual({
        stars: 4.5,
        count: 87
        });
        expect(product.priceCents).toEqual(1090);  
    });

    it('get right starUrl', () => {
        expect(product.getstarUrl()).toEqual('images/ratings/rating-45.png');
    });

});