/* ---------------- DETECCIÓN DE DISPOSITIVO ---------------- */
function detectDevice() {
    const width = window.innerWidth; // ancho de la pantalla
    const userAgent = navigator.userAgent; // info del navegador
    let deviceType = '';
    let deviceIcon = '';

    // Detectar tipo de dispositivo según ancho
    if (width <= 576) {
        deviceType = 'Móvil';
        deviceIcon = 'bi-phone';
    } else if (width <= 768) {
        deviceType = 'Tablet';
        deviceIcon = 'bi-tablet';
    } else if (width <= 1200) {
        deviceType = 'Laptop';
        deviceIcon = 'bi-laptop';
    } else {
        deviceType = 'Desktop';
        deviceIcon = 'bi-display';
    }

    // Detectar sistema operativo según userAgent
    let os = '';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    else if (userAgent.includes('Linux')) os = 'Linux';

    // Mostrar info en el div #deviceInfo
    const deviceInfo = document.getElementById('deviceInfo');
    deviceInfo.innerHTML = `<i class="bi ${deviceIcon}"></i> ${deviceType} - ${os}`;

    // También mostrar una alerta
    alert(`Dispositivo detectado:\n- Tipo: ${deviceType}\n- Sistema: ${os}\n- Resolución: ${width}x${window.innerHeight}px`);
}

/* ---------------- SCROLL SUAVE ---------------- */
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth' // desplazamiento suave
    });
}

/* ---------------- NAVBAR EN SCROLL ---------------- */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled'); // activa el fondo
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ---------------- GALERÍA DINÁMICA ---------------- */
function loadGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const loading = galleryContainer.querySelector('.loading');
    
    loading.style.display = 'block'; // muestra "Cargando..."

    // Simula tiempo de carga
    setTimeout(() => {
        const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F'];
        let galleryHTML = '';
        
        // Genera 6 imágenes con colores diferentes
        for (let i = 1; i <= 6; i++) {
            const color = colors[i - 1];
            galleryHTML += `
                <div class="col-md-4">
                    <div class="gallery-item">
                        <img src="https://via.placeholder.com/400x250/${color}/FFFFFF?text=Imagen+${i}" alt="Imagen ${i}">
                        <div class="gallery-overlay">
                            <i class="bi bi-zoom-in text-white" style="font-size: 2rem;"></i>
                        </div>
                    </div>
                </div>
            `;
        }
        
        loading.style.display = 'none'; // oculta el loader
        galleryContainer.innerHTML = galleryHTML; // inserta las imágenes
    }, 1500);
}

/* ---------------- FORMULARIO DE CONTACTO ---------------- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // evita recargar la página
    
    // Cambia el botón a "Enviando..."
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    submitBtn.disabled = true;
    
    // Simula un envío con retraso
    setTimeout(() => {
        alert('¡Mensaje enviado correctamente! Gracias por contactarnos.');
        this.reset(); // limpia el formulario
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

/* ---------------- INICIALIZACIÓN ---------------- */
document.addEventListener('DOMContentLoaded', function() {
    detectDevice(); // detectar dispositivo al cargar
    loadGallery(); // cargar imágenes de la galería
    
    // Actualizar info del dispositivo al redimensionar
    window.addEventListener('resize', detectDevice);
    
    // Scroll suave en los enlaces del navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* ---------------- ANIMACIONES INTERACTIVAS ---------------- */
function addInteractiveElements() {
    // Efecto parallax en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación de las tarjetas al entrar en pantalla
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplica animación a todas las tarjetas
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Llama a la función tras 100ms
setTimeout(addInteractiveElements, 100);