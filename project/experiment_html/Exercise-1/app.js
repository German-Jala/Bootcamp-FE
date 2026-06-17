const host = document.getElementById('my-component');
const template = document.getElementById('shadow-template');
const shadowRoot = host.attachShadow({ mode: 'closed' });
shadowRoot.appendChild(template.content);
