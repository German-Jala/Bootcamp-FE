class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        const [htmlResponse, cssResponse] = await Promise.all([
            fetch('./web-components/card/card.html'),
            fetch('./web-components/card/card.css')
        ]);

        const htmlText = await htmlResponse.text();
        const cssText = await cssResponse.text();

        this.shadowRoot.innerHTML = `
        <style>${cssText}</style>
            ${htmlText}
        `;

        this.shadowRoot.querySelector('#enterprise-name').textContent = this.getAttribute('enterpriseName');
        this.shadowRoot.querySelector('#employee-name').textContent = this.getAttribute('employeeName');
        this.shadowRoot.querySelector('#role-name').textContent = this.getAttribute('roleName');

    }
}

customElements.define('my-card', Card);
