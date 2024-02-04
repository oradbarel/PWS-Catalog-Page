// Imports:

import { getProdId, urlProdParam, nis } from "/resources/js/auxiliary.js";
import { productsData } from "/resources/js/data.js";
import { Header } from "/resources/js/components/header.js"
import { Footer } from "/resources/js/components/footer.js"


// Functions:


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


function isNameValid(name) {
    const regEx = /^[a-zA-Z]*$/;
    if (name.match(regEx)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Returns true iff `cardNumber` consists of exactly 16 digits.
 * @param {string} cardNumber 
 * @returns {boolean}
 */
function isCardNumberValid(cardNumber) {
    const regEx = /^\d{16}$/;
    if (cardNumber.match(regEx)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Returns the current month in mm format.
 * If today's month is less than 10 - prefix it with a '0' to make it 2 digits.
 * @returns {number}
 */
function getCurrDateMonth() {
    let today = new Date(); 
    let month = today.getMonth() + 1; 
    if (month < 10) { 
        month = '0' + month;
    }
    return month;
}

/**
 * Returns the current year in yy format.
 * @returns {number}
 */
function getCurrDateYear() {
    let today = new Date(); 
    var year = today.getFullYear() % 100; 
    return year;
}

/**
 * Returns true iff the month & year input are valid.
 * @returns {boolean}
 */
function isExpiryDateValid() {
    const expiryMonth = document.getElementById("month").value;
    const expiryYear = document.getElementById("year").value;
    const currYear = getCurrDateYear();
    const currMonth = getCurrDateMonth();
    const regExNum = /^\d{2}$/;
    const regExMonth = /^(0?[1-9]|1[012])$/;
    if (regExNum.test(expiryMonth) && regExNum.test(expiryYear)) {
        if ((regExMonth.test(expiryMonth)) && (expiryYear > currYear || (expiryYear == currYear && expiryMonth >= currMonth))) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

function isCvvValid(cvv) {
    const regEx = /^\d{3}$/;
    if (cvv.match(regEx)) {
        return true;
    }
    else {
        return false;
    }
}

function validateFormFields() {
    const expiryMonth = document.getElementById("month").value;
    const expiryYear = document.getElementById("year").value;
    const cardNumber = document.getElementById("card").value;
    const cardHolderName = document.getElementById("card-holder").value;
    const cvv = document.getElementById("cvv").value;
    if ([cvv, expiryYear, expiryMonth, cardNumber, cardHolderName].some((value) => !value)) {
        alert("Please fill all of the requierd form fields.");
        return false;
    }
    if (!isNameValid(cardHolderName)) {
        alert("Please enter a valid name." + "\n" + "A valid name consists of only English characters.");
        return false;
    }
    if (!isCardNumberValid(cardNumber)) {
        alert("Please enter a valid credit card number." + "\n" + "A valid card number consists of exactly 16 digits.");
        return false;
    }
    if (!isExpiryDateValid()) {
        alert("Please enter a valid expiry date." + "\n" + "A valid date consists of exactly 4 digits in mm/yy format and must represent a future date.");
        return false;
    }
    if (!isCvvValid(cvv)) {
        alert("Please enter a valid cvv." + "\n" + "A valid cvv consists of exactly 3 digits.");
        return false;
    }
    else {
        return true;
    }
}

/**
 * Gets the ThankYouPage link for the specific product.
 * @param {number} prodId Product ID.
 * @returns {string}
 */
function getThankYouLink(prodId) {
    return `/resources/html/ThankYouPage.html?${urlProdParam}=${prodId}`
}


function handleSubmit(event) {
    if (!validateFormFields()) {
        event.preventDefault();
        return;
    }
    window.location.href = getThankYouLink(getProdId());
    ;
}

function formSubmit() {
    const form = document.getElementById("form");
    form.addEventListener("submit", handleSubmit);
}

function changeToValidClass(element) {
    if (element.classList.contains('requierd-non-valid')){
        element.classList.remove('requierd-non-valid');
        element.classList.add('requierd-valid');
    }     
}

function changeToNonValidClass(element) {
    if (element.classList.contains('requierd-valid')){
        element.classList.remove('requierd-valid');
        element.classList.add('requierd-non-valid');
    }
}

function formatInputField(validationFunc) {
    if (validationFunc(this.value)) {
        changeToValidClass(this);
    }
    else {
        changeToNonValidClass(this);
    }
}

function formatDateFields() {
    let dateParts = [document.getElementById("month"), document.getElementById("year")];
    if (isExpiryDateValid()) {
        dateParts.forEach(part => {
            changeToValidClass(part);
        });
    }
    else {
        dateParts.forEach(part => {
            changeToNonValidClass(part);
        });
    }
}

// function formatCC(cardNumber){
//     if (cardNumber.value.length > 0) {
//         if (cardNumber.value.length == 4 || cardNumber.value.length == 9 || cardNumber.value.length == 14) {
//             cardNumber.value += " ";
//         } 
//     }
// }

// function formatExpiryDate(date){
//     if (date.value.length > 0) {
//         if (date.value.length == 2) {
//             date.value += "  / ";
//         } 
//     }
// }

function formatAllInputFields() {
    let name = document.getElementById("card-holder");
    name.addEventListener('keyup', formatInputField.bind(name, isNameValid));
    let cardNumber = document.getElementById("card");
    cardNumber.addEventListener('keyup', formatInputField.bind(cardNumber, isCardNumberValid));
    let cvv = document.getElementById("cvv");
    cvv.addEventListener('keyup', formatInputField.bind(cvv, isCvvValid));
    document.getElementById("month").addEventListener('keyup', formatDateFields);
    document.getElementById("year").addEventListener('keyup', formatDateFields);
    

}

// Main:

customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
insertPaymentDetails();
formatAllInputFields();
formSubmit();
