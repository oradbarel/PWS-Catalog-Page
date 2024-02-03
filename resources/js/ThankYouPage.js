import { getProdId, urlProdParam, nis } from "/resources/js/auxiliary.js";
import { productsData } from "/resources/js/data.js";
import { Header } from "/resources/js/components/header.js"
import { Footer } from "/resources/js/components/footer.js"




function insertProdTitle(title) {
    document.getElementById("product-details-div").innerHTML +=
        `<h4>
            ${title}
        </h4> 
        <br>`;
}

function insertProdDescription(desc) {
    document.getElementById("product-details-div").innerHTML +=
        `<h4 class="smaller-text">
            ${desc}
        </h4>`;
}

function insertProdImg(imgPath) {
    document.getElementById("product-details-div").innerHTML +=
        `<img src="/Resources/images/products/${imgPath}"
        >
        `;
}

function insertPurchaseDetails() {
    const products = productsData["products"];
    const prodDict = products.filter(prod => prod.id == getProdId())[0];
    // TODO: check if undifined...
    insertProdTitle(prodDict.title);
    insertProdDescription(prodDict.description);
    insertProdImg(prodDict.image_file_name);
}



customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
insertPurchaseDetails();