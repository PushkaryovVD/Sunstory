// --- CONFIGURATION ---
const MUSIC_URL = "assets/music.mp3"; // Replace with your actual music file path

// Arrays of cute messages
const hiddenMessages = [
    "Ты делаешь мой день ярче.", "Спасибо, что появилась.", "Ты невероятно красивая.",
    "С тобой хочется улыбаться.", "Мое любимое Солнце.", "Обожаю твой смех.",
    "С тобой так тепло.", "Ты - мое вдохновение.", "Люблю наши разговоры.",
    "Ты просто чудо.", "Рядом с тобой время летит незаметно.", "Ты особенная.",
    "Каждый день с тобой - праздник.", "В твоих глазах можно утонуть.", "Ты мое всё."
];

const jarNotes = [
    "Помнишь нашу первую встречу?", "Твоя улыбка согревает меня.", "Ты - самое яркое Солнышко.",
    "Я обожаю твой голос.", "С тобой даже молчать приятно.", "Ты делаешь меня лучше.",
    "Мне нравится заботиться о тебе.", "Ты самая красивая в мире.", "Скучаю, даже когда мы только расстались.",
    "Ты мое вдохновение.", "Каждая минута с тобой бесценна.", "Я ценю каждую твою черту.",
    "Ты - мой лучший друг.", "С тобой все кажется возможным.", "Ты заставляешь мое сердце биться чаще.",
    "Твои объятия - лучшее место на земле.", "Ты приносишь в мою жизнь радость.", "Мне так повезло с тобой.",
    "Ты - моя любимая привычка.", "Твоя поддержка значит для меня всё.", "Никогда не переставай улыбаться.",
    "Ты - свет в моем окне.", "Люблю то, как мы понимаем друг друга.", "Ты делаешь мир вокруг красивее.",
    "Твой смех - моя любимая музыка.", "С тобой уютно в любую погоду.", "Ты - моя самая сладкая мысль.",
    "Спасибо, что ты есть у меня.", "Ты - мое маленькое чудо.", "Люблю тебя, мое Солнце."
];

// --- ELEMENTS ---
const cursor = document.getElementById('cursor');
const introScreen = document.getElementById('intro-screen');
const startBtn = document.getElementById('start-btn');
const mainContent = document.getElementById('main-content');
const audio = new Audio(MUSIC_URL);
audio.loop = true;

// --- CUSTOM CURSOR ---
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

// --- INTRO & MUSIC ---
startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('blurred');
        mainContent.style.height = 'auto';
        mainContent.style.overflow = 'visible';
    }, 1500);
    audio.play().catch(e => console.log("Audio autoplay prevented"));
    document.querySelector('.vinyl').classList.add('spin');
});

const playPauseBtn = document.getElementById('play-pause-btn');
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸';
        document.querySelector('.vinyl').classList.add('spin');
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
        document.querySelector('.vinyl').classList.remove('spin');
    }
});

document.getElementById('volume-slider').addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// --- INTERACTIVE SKY (Particles on click) ---
document.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' || e.target.closest('.glass-panel')) return;
    const particles = ['✨', '❤️', '⭐'];
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'absolute';
    particle.style.left = `${e.pageX}px`;
    particle.style.top = `${e.pageY}px`;
    particle.style.fontSize = '20px';
    particle.style.pointerEvents = 'none';
    particle.style.transition = 'all 1s ease-out';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.style.transform = `translate(${Math.random()*100-50}px, -100px) scale(0)`;
        particle.style.opacity = '0';
    }, 10);
    setTimeout(() => particle.remove(), 1000);
});

// --- SCROLL TIMELINE (Bunny -> Sun) ---
window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    let scrollPercent = (scrollPos / docHeight) * 100;
    if(scrollPercent > 90) scrollPercent = 90; // Don't overlap completely until very end
    document.getElementById('scroll-bunny').style.left = `${scrollPercent}%`;
});

// --- SECRET MESSAGES (Floating Hearts) ---
function spawnHiddenMessages() {
    const container = document.getElementById('hidden-messages-container');
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '🤍';
        heart.style.left = `${Math.random() * 95}vw`;
        heart.style.top = `${Math.random() * 400 + 100}vh`; // Spread throughout page height
        heart.style.animationDuration = `${Math.random() * 5 + 10}s`;
        
        heart.addEventListener('click', () => {
            showToast(hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)]);
            heart.style.display = 'none';
        });
        container.appendChild(heart);
    }
}
spawnHiddenMessages();

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// --- MEMORY JAR ---
document.getElementById('jar').addEventListener('click', () => {
    const noteDisplay = document.getElementById('note-display');
    const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
    noteDisplay.textContent = randomNote;
    noteDisplay.classList.remove('hidden');
});

// --- BUNNY GAME ---
let heartsCollected = 0;
document.getElementById('catch-heart-btn').addEventListener('click', () => {
    if (heartsCollected < 10) {
        heartsCollected++;
        document.getElementById('heart-count').textContent = heartsCollected;
        if (heartsCollected === 10) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            document.getElementById('game-success').classList.remove('hidden');
            document.getElementById('catch-heart-btn').classList.add('hidden');
        }
    }
});

// --- FINAL SECRET ---
document.getElementById('final-secret-btn').addEventListener('click', () => {
    const secretScreen = document.getElementById('last-secret-screen');
    secretScreen.classList.remove('hidden');
    audio.volume = 0.1; // Lower music
    
    const text = "Спасибо, что стала моим Солнцем. ❤️";
    const typeWriterEl = document.getElementById('typewriter-text');
    let i = 0;
    
    setTimeout(() => {
        const interval = setInterval(() => {
            if (i < text.length) {
                typeWriterEl.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    document.getElementById('hug-illustration').classList.remove('hidden');
                    document.getElementById('hug-illustration').style.animation = 'fadeIn 2s ease';
                }, 1000);
            }
        }, 150);
    }, 1000);
});

// --- EASTER EGGS ---
// 1. Press B to wave bunny
// 2. Press S to wink sun
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'b') {
        const bunny = document.getElementById('hero-bunny');
        bunny.style.animation = 'wave 0.5s ease';
        setTimeout(() => bunny.style.animation = '', 500);
    }
    if (e.key.toLowerCase() === 's') {
        const suns = document.querySelectorAll('span');
        suns.forEach(s => { if(s.textContent.includes('☀️')) s.textContent = '😉'; });
        setTimeout(() => {
            suns.forEach(s => { if(s.textContent.includes('😉')) s.textContent = '☀️'; });
        }, 1000);
    }
});

// 3. Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            confetti({ particleCount: 300, spread: 100, shapes: ['heart'], colors: ['#ffb6c1', '#ff6b81'] });
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// 4. Double Click flying hearts
document.addEventListener('dblclick', (e) => {
    for(let i=0; i<5; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.textContent = '💖';
            h.style.position = 'absolute';
            h.style.left = `${e.pageX + (Math.random()*40-20)}px`;
            h.style.top = `${e.pageY}px`;
            h.style.fontSize = '30px';
            h.style.pointerEvents = 'none';
            h.style.transition = 'all 1s ease-out';
            document.body.appendChild(h);
            setTimeout(() => { h.style.transform = 'translateY(-100px) scale(1.5)'; h.style.opacity = '0'; }, 10);
            setTimeout(() => h.remove(), 1000);
        }, i*100);
    }
});