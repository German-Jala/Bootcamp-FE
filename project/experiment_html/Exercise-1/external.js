const myhost = document.getElementById('my-component');
const detectedRoot = myhost.shadowRoot;

if (detectedRoot) {
    const tituloInterno = detectedRoot.querySelector('.title');
    tituloInterno.innerText = "¡I put this title from external.js!";
    tituloInterno.style.color = "orange";
} else {
    console.error("Nothing");
}
