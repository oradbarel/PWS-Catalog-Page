// Imports:

import { urlProdParam, productsImgDir } from "/resources/js/auxiliary.js";
import { productsData } from "/resources/js/data.js";

// Functions:

/**
 * 
 * @param {array} arr Array to shuffle.
 * @returns {array}
 */
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * 
 * @param {number} before Price before discount.
 * @param {number} after Price after discount.
 * @returns {number}
 */
function getDiscountPercent(before, after) {
    return ((before - after) / before * 100).toFixed(2);
}

/**
 * 
 * @param {String} imgFileName Name of image, along with format.
 * @returns {string}
 */
function getImgPath(imgFileName) {
    return `${productsImgDir}/${imgFileName}`;
}

/**
 * 
 * @param {number} prodId Product ID.
 * @returns {string}
 */
function getCheckoutLink(prodId) {
    return `/resources/html/CheckoutPage.html?${urlProdParam}=${prodId}`
}

/**
 * Insert image div elements, each contains all the data.
 */
const insertItems = () => {
    const products = shuffleArray(productsData["products"]);
    for (let i = 0; i < products.length; i++) {
        // Get product attributes:
        const prod = products[i];
        const [id, title, description, price, discountedPrice] =
            [prod["id"], prod["title"], prod["description"], prod["price"], prod["discounted_price"]];
        const imgPath = getImgPath(prod["image_file_name"]);
        const link = getCheckoutLink(id);
        const percents = getDiscountPercent(price, discountedPrice);
        const nis = "&#8362";
        
        // Create div tag:
        const divTag =
            `<div class="item item-${i + 1}">
            <a href=${link}><img src="${imgPath}" alt="${title}"></a>
            <h2 class="product-title">${title}</h2>
            <h3 class="product-description">${description}</h3>
            <p class="prices">
            <span class="discounted-price">Now ${discountedPrice}${nis}</span><br><span class="original-price">${price}${nis}</span> (${percents}% discount)
            </p> 
            </div>`;

        // Add the tag:
        document.getElementById("products-container").innerHTML += divTag;
    }
}

// Main:

insertItems();

