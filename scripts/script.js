console.log('Welcome to Coding Society! 💻✨');

// ============ CHATBOT ============

const chatbotWidget = document.getElementById('chatbotWidget');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatInput = document.getElementById('chatInput');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotSuggestions = document.getElementById('chatbotSuggestions');

// Chatbot knowledge base
const chatbotResponses = {
    'about|coding society|what is': {
        response: '🤖 The Coding Society is a vibrant community where Linux enthusiasts and developers come together to share ideas, collaborate on exciting projects, and build meaningful connections. We believe in the power of open-source technology and peer learning!'
    },
    'founders|who': {
        response: '👥 Our amazing founders are:\n\n🎸 Santiago - Community Builder & Visionary\n⛪ Christian - Chief Mentor & Father Figure\n⚡ Zabdiel - Creative Chaos Manager\n🔮 Kayden - The Enigma\n😎 Pierre - Cool Architect & Trendsetter\n\nEach brings unique talents to make our community special!'
    },
    'join|how do i join|membership': {
        response: '🎉 Joining is super easy! All you need is:\n✓ To be human\n✓ Use Linux as your main OS\n✓ That\'s it!\n\nClick the Discord button below to join our amazing community and start connecting with fellow developers!'
    },
    'activities|content|what do you do': {
        response: '🎯 We offer diverse activities:\n👥 Class groups\n🐍 Python-church\n💻 IT-church\n🎨 UX-church\n💬 Chat\n🚶 Outings\n📺 Anime/movie/series\n🎮 Games\n\nSomething for everyone!'
    },
    'goals|aims|mission': {
        response: '🎯 Our primary goal is simple but ambitious: Becoming Billionaires! 💰 But more importantly, we\'re building a supportive community where developers can grow, learn, and succeed together!'
    },
    'santiago': {
        response: '🎸 Santiago is our Community Builder & Visionary! He\'s a chill tech enthusiast who loves connecting people and fostering international friendships. Fun fact: He\'s passionate about French culture! 🇫🇷'
    },
    'christian': {
        response: '⛪ Christian is our Chief Mentor & Father Figure with years of experience in software development. He guides the next generation with wisdom and has shaped the foundation of our society!'
    },
    'zabdiel': {
        response: '⚡ Zabdiel is our Creative Chaos Manager who brings innovation and unpredictability to the team. He\'s the spirited one who keeps things interesting and fun!'
    },
    'kayden': {
        response: '🔮 Kayden is The Enigma - mysterious and intriguing! Rumored to have extraordinary skills across multiple programming languages. Their contributions speak louder than words!'
    },
    'pierre': {
        response: '😎 Pierre is our Cool Architect & Trendsetter! Effortlessly brilliant, he brings fresh perspectives to everything. His calm demeanor and sharp mind make him invaluable to our team.'
    },
    'linux|operating system': {
        response: '🐧 Linux is at the heart of our community! We\'re passionate about open-source technology, freedom, and collaborative development. If you use Linux as your main OS, you\'re already one of us! 💪'
    },
    'python': {
        response: '🐍 We have a dedicated Python-church community for all things Python programming! Whether you\'re a beginner or expert, there\'s always something to learn and share. Join us!'
    },
    'music|player': {
        response: '🎵 Love our background music? You can toggle the music player using the 🎵 button in the navbar! We have 5 awesome tracks: Epic Adventure, Chill Vibes, Focus Mode, Lofi Study, and Tech Beats!'
    },
    'dark mode|theme': {
        response: '🌙 You can toggle between light and dark themes using the button in the navbar! Your preference is saved automatically. Choose whichever feels most comfortable for you!'
    },
    'hello|hi|hey|greetings': {
        response: '👋 Hey there! Welcome to the Coding Society! I\'m CodeBot, your AI guide. Feel free to ask me anything about our community, and I\'ll be happy to help!'
    },
    'thank|thanks|appreciate': {
        response: '😊 You\'re welcome! I\'m here to help. Feel free to ask any other questions about the Coding Society!'
    },
    'help|assist': {
        response: '🆘 I can help you with information about:\n• Our community and mission\n• The founders and their roles\n• How to join us\n• Our activities and content\n• Technical topics like Linux and Python\n\nJust ask!'
    }
};

function toggleChatbot() {
    chatbotWidget.classList.toggle('hidden');
    localStorage.setItem('chatbotVisible', !chatbotWidget.classList.contains('hidden'));
    if (!chatbotWidget.classList.contains('hidden')) {
        chatInput.focus();
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Get bot response
    const response = getBotResponse(message);
    
    // Simulate typing delay
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 300);
}

function sendSuggestion(suggestion) {
    chatInput.value = suggestion;
    chatInput.focus();
    // Send after a slight delay for visual feedback
    setTimeout(() => {
        sendMessage();
    }, 100);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const p = document.createElement('p');
    p.innerHTML = text;
    
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Hide suggestions after first user message
    if (sender === 'user' && chatbotSuggestions.style.display !== 'none') {
        chatbotSuggestions.style.display = 'none';
    }
}

function getBotResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // Check each pattern in the knowledge base
    for (const [keywords, data] of Object.entries(chatbotResponses)) {
        const patterns = keywords.split('|');
        if (patterns.some(pattern => input.includes(pattern))) {
            return data.response;
        }
    }
    
    // Default response for unmatched queries
    const defaultResponses = [
        '🤔 That\'s an interesting question! I might not have the answer right now, but you could ask me about our community, founders, activities, or how to join!',
        '💭 I\'m still learning! Why don\'t you ask me about the Coding Society, our founders, or our activities?',
        '🤖 Hmm, I\'m not sure about that. But I\'d love to tell you more about the Coding Society! What would you like to know?',
        '🎯 Great question! Ask me about our community, founders, or how to become part of this amazing group!'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function loadChatbotPreference() {
    const isVisible = localStorage.getItem('chatbotVisible');
    if (isVisible === 'false') {
        chatbotWidget.classList.add('hidden');
    }
}

// Event listeners for chatbot
chatbotToggle.addEventListener('click', toggleChatbot);

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// ============ MUSIC PLAYER ============

const audioPlayer = document.getElementById('audioPlayer');
const musicPlayer = document.getElementById('musicPlayer');
const musicToggle = document.querySelector('.music-toggle');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');

// Initialize volume
audioPlayer.volume = 0.5;

// Toggle music player visibility
function toggleMusicPlayer() {
    musicPlayer.classList.toggle('hidden');
    localStorage.setItem('musicPlayerVisible', !musicPlayer.classList.contains('hidden'));
}

document.querySelector('.music-toggle').addEventListener('click', toggleMusicPlayer);

// Load music player visibility preference
function loadMusicPlayerPreference() {
    const isVisible = localStorage.getItem('musicPlayerVisible');
    if (isVisible === 'false') {
        musicPlayer.classList.add('hidden');
    }
}

// Track selection
document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const trackUrl = this.dataset.track;
        const trackName = this.dataset.name;
        
        // Update active button
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Load and play track
        audioPlayer.src = trackUrl;
        audioPlayer.play();
        
        // Update music toggle animation
        musicToggle.classList.add('playing');
        
        // Save preference
        localStorage.setItem('lastTrack', trackUrl);
        localStorage.setItem('lastTrackName', trackName);
    });
});

// Volume control
volumeSlider.addEventListener('input', function() {
    audioPlayer.volume = this.value / 100;
    volumeValue.textContent = this.value + '%';
    localStorage.setItem('volume', this.value);
});

// Audio player events
audioPlayer.addEventListener('play', function() {
    musicToggle.classList.add('playing');
});

audioPlayer.addEventListener('pause', function() {
    musicToggle.classList.remove('playing');
});

audioPlayer.addEventListener('ended', function() {
    musicToggle.classList.remove('playing');
});

// Load saved preferences on page load
function loadMusicPreferences() {
    const savedVolume = localStorage.getItem('volume');
    const lastTrackUrl = localStorage.getItem('lastTrack');
    const lastTrackName = localStorage.getItem('lastTrackName');
    
    if (savedVolume) {
        volumeSlider.value = savedVolume;
        audioPlayer.volume = savedVolume / 100;
        volumeValue.textContent = savedVolume + '%';
    }
    
    if (lastTrackUrl) {
        audioPlayer.src = lastTrackUrl;
        // Highlight the last played track
        document.querySelectorAll('.track-btn').forEach(btn => {
            if (btn.dataset.track === lastTrackUrl) {
                btn.classList.add('active');
            }
        });
    }
}

// ============ THEME TOGGLE ============

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
}
document.querySelectorAll('.content-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .content-item {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Add hover animation to Discord link
const discordLink = document.querySelector('.discord-link');
if (discordLink) {
    discordLink.addEventListener('mouseenter', function() {
        this.querySelector('.pulse').style.animation = 'none';
        setTimeout(() => {
            this.querySelector('.pulse').style.animation = 'pulse-text 0.8s ease-in-out infinite';
        }, 10);
    });
}

// Particle effect on mouse move (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX);
        const distance = Math.sqrt(Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2));
        
        if (distance < 300) {
            const moveX = Math.cos(angle) * (300 - distance) * 0.02;
            const moveY = Math.sin(angle) * (300 - distance) * 0.02;
            
            card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    });
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);

// Add some interactivity to list items
document.querySelectorAll('.list-item').forEach((item, index) => {
    item.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = `slideInRight 0.5s ease-out`;
        }, 10);
    });
});

// Enhanced Founder card interactions
document.querySelectorAll('.founder-card').forEach(card => {
    const bio = card.querySelector('.bio');
    const originalBio = bio.textContent;
    
    const funFacts = {
        'Santiago': '🇫🇷 Fun fact: Fluent in 3 languages and loves Paris in the spring!',
        'Christian': '⛪ Fun fact: Over 20 years of coding experience and still learning!',
        'Zabdiel': '⚡ Fun fact: Debugs code with the power of chaos and coffee!',
        'Kayden': '🔮 Fun fact: Rumored to code in binary during full moons...',
        'Pierre': '😎 Fun fact: Can review code while meditating on a skateboard!'
    };
    
    const name = card.querySelector('h3').textContent;
    
    card.addEventListener('mouseenter', function() {
        if (funFacts[name]) {
            bio.style.transition = 'opacity 0.3s ease';
            bio.style.opacity = '0';
            setTimeout(() => {
                bio.textContent = funFacts[name];
                bio.style.opacity = '1';
            }, 150);
        }
    });
    
    card.addEventListener('mouseleave', function() {
        bio.style.transition = 'opacity 0.3s ease';
        bio.style.opacity = '0';
        setTimeout(() => {
            bio.textContent = originalBio;
            bio.style.opacity = '1';
        }, 150);
    });
});

// ============ LANGUAGE SWITCHER ============

function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

function changeLanguage(language) {
    localStorage.setItem('language', language);
    updatePageLanguage(language);
    toggleLanguageMenu();
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const selector = document.querySelector('.language-selector');
    if (selector && !selector.contains(event.target)) {
        document.getElementById('languageMenu').classList.remove('show');
    }
});

// ============ FOUNDER NAME TEXT-TO-SPEECH ============

function speakFounderName(name, role) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(`${name}, ${role}`);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Speak
    speechSynthesis.speak(utterance);
}

// Add hover listeners to founder cards
document.addEventListener('DOMContentLoaded', function() {
    const founderCards = document.querySelectorAll('.founder-card');
    
    founderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const name = this.querySelector('h3')?.textContent || '';
            const role = this.querySelector('.role')?.textContent || '';
            
            if (name) {
                speakFounderName(name, role);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Cancel speech when mouse leaves
            speechSynthesis.cancel();
        });
    });
    
    loadTheme();
    loadMusicPlayerPreference();
    loadMusicPreferences();
    loadChatbotPreference();
    updatePageLanguage(getCurrentLanguage());
});
