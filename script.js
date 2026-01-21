// 1. Initialize Map
const map = L.map('map', {
    worldCopyJump: true // Fixes markers disappearing across the date line
}).setView([-1.286389, 36.817223], 13); 

// 2. Add Tiles with noWrap to prevent duplication
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO',
    noWrap: true, // Crucial: Fixes the 'two maps' horizontal repeat bug
    bounds: [[-90, -180], [90, 180]]
}).addTo(map);

// 3. Verified Help Centers
const helpCenters = [
    { name: "GVRC Nairobi", lat: -1.2941, lng: 36.8045, city: "Nairobi", type: "Hospital", phone: "0719 638006" },
    { name: "Coast General Hospital", lat: -4.0435, lng: 39.6682, city: "Mombasa", type: "Government Referral", phone: "1195" },
    { name: "Tumaini Girls Rescue", lat: 0.0463, lng: 37.6559, city: "Meru", type: "Shelter", phone: "0724 370653" }
];

// 4. Geolocation Function
document.getElementById('locate-btn').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14); // Updates existing map view
        
        L.circle([latitude, longitude], { radius: 300, color: '#00D1FF' }).addTo(map)
            .bindPopup("Your Location").openPopup();

        helpCenters.forEach(center => {
            L.marker([center.lat, center.lng]).addTo(map)
                .bindPopup(`<b>${center.name}</b><br><a href="tel:${center.phone}">📞 Call Now</a>`);
        });
    }, () => alert("Location access denied."));
});

// 5. Safe Exit
const quickExit = () => window.location.href = "https://www.google.com";
document.getElementById('safe-exit').addEventListener('click', quickExit);
document.addEventListener('keydown', (e) => { if (e.key === "Escape") quickExit(); });

// 6. Form Submission
document.getElementById('incident-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Report Received Securely.");
    this.reset();
});

// Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact Form Submission
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Message sent! We will get back to you shortly.");
    this.reset();
});