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

// /**
//  * 
//  * @param {string} ch 
//  * @returns {string}
//  */
// function isSpecialKey(ch) {
//     return ["Backspace", "Delete", "Enter", "Tab"].includes(ch);
// }

// /**
//  * 
//  * @param {string} ch 
//  * @returns {boolean}
//  */
// function isDigit(ch) {
//     return ch >= '0' && ch <= '9';
// }

// /**
//  * 
//  * @param {KeyboardEvent} event 
//  */
// function handleNonNumeric(event) {
//     if (!isDigit(event.key) && !isSpecialKey(event.key) && !event.ctrlKey) {
//         event.preventDefault();
//     }
// }

function isNameValid(name) {
    const regEx = /^[A-Za-z][A-Za-z0-9]*$/;
    if (name.match(regEx)) {
        return true;
    }
    else {
        return false;
    }
}



function isCardNumberValid(cardNumber) {
    const regEx = /^\d{16}$/;
    if (cardNumber.match(regEx)) {
        return true;
    }
    else {
        return false;
    }
}

function getCurrDateMonth() {
    let today = new Date(); // gets the current date
    let month = today.getMonth() + 1; // extracts the month portion
    if (month < 10) { // if today's month is less than 10
        month = '0' + month // prefix it with a '0' to make it 2 digits
    }
    return month;
}

function getCurrDateYear() {
    let today = new Date(); // gets the current date
    var year = today.getFullYear() % 100; // extracts the year portion and changes it from yyyy to yy format
    return year;
}

function isExpiryDateValid() {
    const expiryMonth = document.getElementById("month").value;
    const expiryYear = document.getElementById("year").value;
    const currYear = getCurrDateYear();
    const currMonth = getCurrDateMonth();
    const regExNum = /^\d{2}$/;
    const regExMonth = /^(0?[1-9]|1[012])$/;
    if (regExNum.test(expiryMonth) && regExNum.test(expiryYear)) {
        if ((regExMonth.test(expiryMonth)) && (expiryYear > currYear || (expiryYear == currYear && expiryMonth >= currMonth))) {
            // all good because the yy from expiryDate is greater than the current yy
            // or if the yy from expiryDate is the same as the current yy but the mm
            // from expiryDate is greater than the current mm
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
    let expiryMonth = document.getElementById("month");
    let expiryYear = document.getElementById("year");
    const cardNumber = document.getElementById("card");
    const cardHolderName = document.getElementById("card-holder");
    const cvv = document.getElementById("cvv");
    if (!cvv.value || !expiryYear.value || !expiryMonth.value || !cardNumber.value || !cardHolderName.value) {
        alert("Please fill all of the form fields.");
        return false;
    }
    if (!isNameValid(cardHolderName.value)) {
        alert("Please enter a valid name.");
        return false;
    }
    if (!isCardNumberValid(cardNumber.value)) {
        alert("Please enter a valid credit card number.");
        return false;
    }
    if (!isExpiryDateValid(expiryMonth.value)) {
        alert("Please enter a valid expiry date.");
        return false;
    }
    if (!isCvvValid(cvv.value)) {
        alert("Please enter a valid cvv.");
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
console.log(getThankYouLink(getProdId()));
formatAllInputFields();
formSubmit();
