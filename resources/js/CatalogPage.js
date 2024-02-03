// Imports:

import { urlProdParam, productsImgDir, nis } from "/resources/js/auxiliary.js";
import { productsData } from "/resources/js/data.js";
import { Header } from "/resources/js/components/header.js"
import { Footer } from "/resources/js/components/footer.js"

// Functions:

/**
 * Shuffles an array to be in a random order.
 * @param {array} arr Array to shuffle.
 * @returns {array}
 */
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/**
 * Given original price and final price, gets the discount percents, with 2 digits precision.
 * @param {number} before Price before discount.
 * @param {number} after Price after discount.
 * @returns {number}
 */
function getDiscountPercent(before, after) {
    return ((before - after) / before * 100).toFixed(2);
}

/**
 * Gets the image relative path.
 * @param {String} imgFileName Name of image, along with format.
 * @returns {string}
 */
function getImgPath(imgFileName) {
    return `${productsImgDir}/${imgFileName}`;
}

/**
 * Gets the checkout link for the specific product.
 * @param {number} prodId Product ID.
 * @returns {string}
 */
function getCheckoutLink(prodId) {
    return `/resources/html/CheckoutPage.html?${urlProdParam}=${prodId}`
}


function createItemDivTag(id, title, description, price, discountedPrice, imgPath, checkOutLink) {
    const percents = getDiscountPercent(price, discountedPrice);
    const divTag =
        `<div class="item item-${id}">
        <a href=${checkOutLink}><img src="${imgPath}" alt="${title}"></a>
        <h2 class="product-title">${title}</h2>
        <h3 class="product-description">${description}</h3>
        <p class="prices">
        <span class="discounted-price">Now ${discountedPrice}${nis}</span><br><span class="original-price">${price}${nis}</span> (${percents}% discount)
        </p> 
        </div>`;
    return divTag;
}

/**
 * Insert image div elements, each contains all the data.
 */
function insertItems() {
    const products = shuffleArray(productsData["products"]);
    for (let i = 0; i < products.length; i++) {
        // Get product attributes:
        const prod = products[i];
        const [id, title, description, price, discountedPrice] =
            [prod["id"], prod["title"], prod["description"], prod["price"], prod["discounted_price"]];
        const imgPath = getImgPath(prod["image_file_name"]);
        const link = getCheckoutLink(id);

        // Create div tag:
        const tag = createItemDivTag(i + 1, title, description, price, discountedPrice, imgPath, link);
        document.getElementById("products-container").innerHTML += tag;
    }
}

// Main:

customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
insertItems();

