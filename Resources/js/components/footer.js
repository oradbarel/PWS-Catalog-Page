export class Footer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <h2>
                    About the Store
                </h2>
            </footer>
            `;
    }
}

/*
Usage:
customElements.define('footer-component', Footer);
*/