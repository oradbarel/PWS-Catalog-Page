// Imports:

import {url_prod_param} from "/resources/js/auxiliary.js";


// Functions:

/**
 * 
 * @returns {string}
 */
function getProdId() {
    const url = new URL(window.location.href);
    const param = url.searchParams.get(url_prod_param);
    console.log(param);
    return param;
}

// Main:

getProdId();