let isOpen = false;
let qrGenerated = false;

function toggleCard() {
    const outerCard = document.querySelector('.outer-card');
    isOpen = !isOpen;
    outerCard.classList.toggle('active');
    
    if(isOpen && !qrGenerated) {
        generateQR();
        launchConfetti();
    }
}

function launchConfetti() {
    const count = 300;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

function generateQR() {
    if(qrGenerated) return;
    
    const currentURL = window.location.href;
    document.getElementById('share-link').href = currentURL;
    
    new QRCode(document.getElementById('qrcode'), {
        text: currentURL,
        width: 150,
        height: 150,
        colorDark : "#ff6b6b",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    qrGenerated = true;
}