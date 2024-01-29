// Imports:

import { urlProdParam, nis } from "/resources/js/auxiliary.js";
import { productsData } from "/resources/js/data.js";
import { Header } from "/resources/js/components/header.js"
import { Footer } from "/resources/js/components/footer.js"


// Functions:

/**
 * Returns the product ID which the user clicked on the previous page.
 * @returns {string}
 */
function getProdId() {
    const url = new URL(window.location.href);
    return url.searchParams.get(urlProdParam);
}

function insertProdTitle(title) {
    document.getElementById("product-details-div").innerHTML +=
        `<h4>
            ${title}
        </h4>`;
}

function insertTotalToPay(price) {
    document.getElementById("product-details-div").innerHTML +=
        `<h4>
            Order total: ${price}${nis}
        </h4>`;
}

function insertPaymentDetails() {
    const products = productsData["products"];
    const prodDict = products.filter(prod => prod.id == getProdId())[0];
    // TODO: check if undifined...
    insertProdTitle(prodDict.title);
    insertTotalToPay(prodDict.price);
}

// Main:

customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
insertPaymentDetails()