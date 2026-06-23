class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['bg-color'];
    }

    async connectedCallback() {
        const [htmlResponse, cssResponse, roleTemplateResponse] = await Promise.all([
            fetch('./web-components/card/card.html'),
            fetch('./web-components/card/card.css'),
            fetch('./web-components/card/role.html'),
        ]);

        const htmlText = await htmlResponse.text();
        const cssText = await cssResponse.text();
        const roleTemplateText = await roleTemplateResponse.text();

        this.shadowRoot.innerHTML = `
        <style>${cssText}</style>
            ${htmlText}
            ${roleTemplateText}
        `;

        this.shadowRoot.querySelector('#enterprise-name').textContent = this.getAttribute('enterpriseName');
        this.shadowRoot.querySelector('#employee-name').textContent = this.getAttribute('employeeName');
        this.shadowRoot.querySelector('#button-container').addEventListener('click', () => {
            this.onClickColor();
        });
        this.renderBG(this.getAttribute('bg-color'));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue == newValue) return;
        if (this.isConnected && name == 'bg-color') this.renderBG(newValue);
    }

    onClickColor() {
        const colors = [
            'bg-red',
            'bg-yellow',
            'bg-blue',
            'bg-green',
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.setAttribute('bg-color', randomColor);
    }

    renderBG(color) {
        const roleTemplate = this.shadowRoot.querySelector('#footer-bg');
        if (!roleTemplate) return;
        const clone = roleTemplate.content.cloneNode(true);
        clone.querySelector('#role-name').className = `footer ${this.getAttribute('bg-color')}`;
        clone.querySelector('#role-name').textContent = this.getAttribute('roleName');
        const container = this.shadowRoot.querySelector('#role-template-container');
        if (!container) return;
        container.innerHTML = '';
        container.appendChild(clone);
    }

}

customElements.define('my-card', Card);
