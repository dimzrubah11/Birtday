// --- 1. COUNTDOWN WAKTU (10 Detik) ---
const targetDate = new Date().getTime() + (10 * 1000); 

const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

const btnOpen = document.getElementById("btnOpen");
const btnText = document.getElementById("btnText");

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysSpan.innerText = days < 10 ? "0" + days : days;
        hoursSpan.innerText = hours < 10 ? "0" + hours : hours;
        minutesSpan.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsSpan.innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
        daysSpan.innerText = "00";
        hoursSpan.innerText = "00";
        minutesSpan.innerText = "00";
        secondsSpan.innerText = "00";
        
        document.querySelector(".main-title").innerHTML = "Happy Birthday! 🎉";
        document.querySelector(".tagline").innerHTML = "<b>Hari spesialmu telah tiba! ✨💖</b>";

        btnOpen.disabled = false;
        btnOpen.classList.remove("disabled");
        btnText.innerText = "🔓 MASUKKAN KODE RAHASIA";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- 2. TRANSISI PINDAH KE HALAMAN PIN PASSCODE ---
function pindahKePin() {
    const pageCountdown = document.getElementById("pageCountdown");
    const pagePin = document.getElementById("pagePin");

    pageCountdown.style.opacity = "0";
    pageCountdown.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        pageCountdown.classList.add("hidden");
        pagePin.classList.remove("hidden");
        pagePin.style.opacity = "0";
        pagePin.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            pagePin.style.opacity = "1";
            pagePin.style.transform = "scale(1)";
        }, 50);
    }, 600);
}


// --- 3. LOGIKA PIN PASSCODE ---
const SECRET_PIN = "280809";
let currentPin = "";

function updatePinDots() {
    const dots = document.querySelectorAll("#pinDots .dot");
    dots.forEach((dot, idx) => {
        if (idx < currentPin.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

function pressNum(num) {
    if (currentPin.length < 6) {
        currentPin += num;
        updatePinDots();
        
        // Otomatis cek jika sudah 6 digit
        if (currentPin.length === 6) {
            setTimeout(submitPin, 200);
        }
    }
}

function deleteNum() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updatePinDots();
    }
}

function submitPin() {
    if (currentPin === SECRET_PIN) {
        firePinkConfetti();
        pindahKeKado();
    } else {
        const pinDots = document.getElementById("pinDots");
        pinDots.classList.add("shake");
        
        setTimeout(() => {
            pinDots.classList.remove("shake");
            currentPin = "";
            updatePinDots();
        }, 400);
    }
}


// --- 4. TRANSISI PINDAH KE HALAMAN KADO ---
function pindahKeKado() {
    const pagePin = document.getElementById("pagePin");
    const pageGift = document.getElementById("pageGift");

    pagePin.style.opacity = "0";
    pagePin.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        pagePin.classList.add("hidden");
        pageGift.classList.remove("hidden");
        pageGift.style.opacity = "0";
        pageGift.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            pageGift.style.opacity = "1";
            pageGift.style.transform = "scale(1)";
        }, 50);
    }, 600);
}


// --- 5. BUKA KADO & CONFETTI ---
function openGift() {
    const giftBox = document.getElementById("giftBox");
    const giftSection = document.getElementById("giftSection");
    const contentSection = document.getElementById("contentSection");

    giftBox.classList.add("opened");

    setTimeout(() => {
        firePinkConfetti();
    }, 300);

    setTimeout(() => {
        giftSection.classList.add("hidden");
        contentSection.classList.remove("hidden");
        
        setTimeout(() => {
            contentSection.classList.add("show");
        }, 50);
    }, 900);
}

function firePinkConfetti() {
    const count = 220;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff2a7d', '#ff758f', '#ffffff'] });
    fire(0.2, { spread: 60, colors: ['#ffb3c1', '#ff4d6d', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffffff', '#ff2a7d'] });
}


// --- 6. ANIMASI TEKS MENYUSUN KATA DEMI KATA ---
const pesanSurat = "Selamat ulang tahun yaa! Hari ini adalah hari yang paling spesial karena hari ini adalah hari lahir sosok yang sangat berarti. Terima kasih sudah selalu hadir, membawa kehangatan, dan menjadi alasan tersenyum di setiap harinya. Semoga di usia yang baru ini, setiap langkahmu dipenuhi kebahagiaan dan impianmu perlahan terwujud. ✨💖";

function startTypingEffect() {
    const typingContainer = document.getElementById("typingText");
    typingContainer.innerHTML = "";
    
    let index = 0;
    const speed = 40;

    function type() {
        if (index < pesanSurat.length) {
            typingContainer.innerHTML += pesanSurat.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}


// --- 7. PINDAH KE HALAMAN SURAT BESAR ---
function pindahKePesanFinal() {
    const contentSection = document.getElementById("contentSection");
    const finalSection = document.getElementById("finalSection");

    contentSection.classList.remove("show");

    setTimeout(() => {
        contentSection.classList.add("hidden");
        finalSection.classList.remove("hidden");

        setTimeout(() => {
            finalSection.classList.add("show");
            firePinkConfetti();
            startTypingEffect();
        }, 50);
    }, 600);
}


// --- 8. PINDAH KE HALAMAN MEMORI 10 FOTO ---
function pindahKeMemoriFoto() {
    const finalSection = document.getElementById("finalSection");
    const memorySection = document.getElementById("memorySection");

    finalSection.classList.remove("show");

    setTimeout(() => {
        finalSection.classList.add("hidden");
        memorySection.classList.remove("hidden");

        setTimeout(() => {
            memorySection.classList.add("show");
            firePinkConfetti();
        }, 50);
    }, 600);
}

function ulangDariAwal() {
    location.reload();
}


// --- 9. PARTIKEL BACKGROUND ---
const heartContainer = document.getElementById('heartContainer');
const items = ['💖', '🌸', '✨', '💕', '🌷', '⭐']; 

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('falling-heart');
    
    particle.innerText = items[Math.floor(Math.random() * items.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 14 + 10;
    particle.style.fontSize = size + 'px';
    
    const duration = Math.random() * 4 + 4;
    particle.style.animationDuration = duration + 's';

    heartContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

setInterval(createParticle, 280);