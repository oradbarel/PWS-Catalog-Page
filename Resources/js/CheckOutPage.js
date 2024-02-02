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

function validateCardNumber(cardNumber) {
    const regEx = /^\d{16}$/;
    if(cardNumber.match(regEx))
      {
       return true;
      }
    else
      {
      alert("Please enter a valid credit card number.");
      return false;
      }
}

function getCurrDateMonth() {
    let today = new Date(); // gets the current date
    let month = today.getMonth() + 1; // extracts the month portion
    if(month < 10) { // if today's month is less than 10
        month = '0' + month // prefix it with a '0' to make it 2 digits
    }
    return month;
}

function getCurrDateYear() {
    let today = new Date(); // gets the current date
    var year = today.getFullYear() % 100; // extracts the year portion and changes it from yyyy to yy format
    return year;
 }

function validateExpiryDate(expiryDate, currMonth, currYear) {
    let expiryMonth = expiryDate.substring(0, 2); // get the mm portion of the expiryDate (first two characters)
    let expiryYear = expiryDate.substring(2); // get the yy portion of the expiryDate (from index 3 to end)
    const regExNum = /^\d{4}$/;
    const regExMonth = /^(0?[1-9]|1[012])$/;
    if(regExNum.test(expiryDate)){
        if ((regExMonth.test(expiryMonth)) && (expiryYear > currYear || (expiryYear == currYear && expiryMonth >= currMonth))) {
            // all good because the yy from expiryDate is greater than the current yy
            // or if the yy from expiryDate is the same as the current yy but the mm
            // from expiryDate is greater than the current mm
            return true;
        }
        else {
            alert("Please enter a valid expiry date.");
            return false;
        }
    }
    else {
        alert("Please enter a valid expiry date.");
        return false;
    }
}

function validateCvv(cvv){
    const regEx = /^\d{3}$/;
    if(cvv.value.match(regEx))
    {
     return true;
    }
  else
    {
    alert("Please enter a valid cvv.");
    return false;
    }
}

function validateFormFields() {
    let expiryDate = document.getElementById("date");
    const cardNumber = document.getElementById("card");
    const cardHolderName = document.getElementById("card-holder");
    const cvv = document.getElementById("cvv");
    if (((!cvv.value || !expiryDate.value.replace(/ /g,'')) || !cardNumber.value.replace(/ /g,'')) || !cardHolderName.value) {
        alert("Please fill all of the form fields.");
         return false;
    }
    if (!validateCardNumber(cardNumber.value.replace(/ /g,''))){
        return false;
    }
    if (!validateExpiryDate(expiryDate.value.replace(/ /g,''), getCurrDateMonth(), getCurrDateYear())){
        return false;
    }
    if(!validateCvv(cvv)){
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
   if(!validateFormFields()) {
      event.preventDefault();
      return;
    }
    window.location.href = getThankYouLink(Number(getProdId));
    ;
}

function formSubmit() {
    const form = document.getElementById("form");
    form.addEventListener("submit",handleSubmit);
}

function formatCC(cardNumber){
    if (cardNumber.value.length > 0) {
        if (cardNumber.value.length == 4 || cardNumber.value.length == 9 || cardNumber.value.length == 14) {
            cardNumber.value += " ";
        } 
    }
}

function formatExpiryDate(date){
    if (date.value.length > 0) {
        if (date.value.length == 2) {
            date.value += " ";
        } 
    }
}

function addFieldsFormat() {
    let cardNumber = document.getElementById("card");
    cardNumber.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
    }
    else {
        formatCC(cardNumber);
    }
}); 

    let date = document.getElementById("date");
    date.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key === "Backspace" || key === "Delete") {
    }
    else {
        formatExpiryDate(date);
    }
    });
}

// Main:

customElements.define('header-component', Header);
customElements.define('footer-component', Footer);
insertPaymentDetails();
addFieldsFormat();
formSubmit();
