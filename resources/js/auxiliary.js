// Constants:

export const urlProdParam = 'prod';
export const productsImgDir = '/resources/images/products';
/**
 * New Israeli Shekel sign
 */
export const nis = "&#8362";


// Functions:

/**
 * Returns the product ID which the user clicked on the previous page.
 * @returns {string}
 */
export function getProdId() {
    const url = new URL(window.location.href);
    return url.searchParams.get(urlProdParam);
}