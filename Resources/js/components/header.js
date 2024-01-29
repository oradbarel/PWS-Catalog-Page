export class Header extends HTMLElement {
    
    constructor() {
        super();
    }

    connectedCallback() {
        let title = document.getElementById('page-script').getAttribute('title');
        title = title.replace(" ", "<br>");
        this.innerHTML = `
            <header>
                <div class="hero-content">
                    <h1 class="hero-heading">
                        ${title}
                    </h1>
                </div> 
            </header>
            `;
    }
}

/*
Usage:
customElements.define('header-component', Header);
*/