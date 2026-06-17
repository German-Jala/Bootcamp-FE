const attachShadowOriginal = Element.prototype.attachShadow;

Element.prototype.attachShadow = function (options) {
    console.log("⚠️ [Interceptor] ¡Función interceptada con éxito!");
    options.mode = 'open';
    return attachShadowOriginal.call(this, options);
};

setTimeout(() => {
    console.log("--- Attack with External 2 ---");
    const thehost = document.getElementById('my-component');
    const detectedRoot = thehost.shadowRoot;
    if (detectedRoot) {
        console.log("🔓 ¡Acceso Concedido gracias al truco del prototipo!");
        const tituloInterno = detectedRoot.querySelector('.title');
        tituloInterno.innerText = "¡I put this title from external.js!";
        tituloInterno.style.color = "orange";
    } else {
        console.error("❌ Sigue saliendo Nothing. Algo falló en la intercepción.");
    }
}, 100); // 100 milisegundos son suficientes para esperar a app.js