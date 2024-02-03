export class Footer extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="hero-content non-grid">
                    <h2 class="hero-heading">
                        About the Store
                    </h2>
                    <p class="store-description">
                        Our store is run by two hardworking Technion students - Orad and Dana.<br><br>
                        With the help of their dog, Kali 🐶, the store has become of the the Technion's greatests and attracts many students and visitors alike.
                    </p>
                    <img class="kali-img" src="/Resources/images/other/kali.png" alt="The best puppy">
                </div>
            </footer>
        `;
    }
}

/*
Usage:
customElements.define('footer-component', Footer);
*/