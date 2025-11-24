// smooth scroll to section
function scrollToSection(id){
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({behavior:'smooth', block:'start'});
}

// change navbar style on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 80);
    highlightCurrentSection();
});

// detectDevice - función simple para demostración (evita errores si se llama antes)
function detectDevice(){
    // Aquí podrías adaptar comportamiento para móviles (ej. colapsar sidebar)
    // Por ahora solo registramos el ancho para depuración
    const w = window.innerWidth;
    document.body.dataset.viewport = w < 992 ? 'mobile' : 'desktop';
}

// loadGallery - rellena contenedor de galería
function loadGallery(){
    const container = document.getElementById('gallery-container');
    const loading = document.getElementById('galleryLoading');
    if (!container) return;
    const colors = ['FF6B6B','4ECDC4','45B7D1','FFA07A','98D8C8','F7DC6F'];
    setTimeout(()=>{
        // eliminar loading
        if (loading) loading.remove();
        container.innerHTML = colors.map((c,i)=>`
            <div class="col-md-4">
                <div class="feature-card gallery-item">
                    <img src="https://picsum.photos/seed/gal${i+1}/600/400" alt="Imagen ${i+1}">
                </div>
            </div>
        `).join('');
    }, 700);
}

// Contact form behaviour
document.addEventListener('DOMContentLoaded', () => {
    // seguridad: si no existe contactForm, no haga nada
    const form = document.getElementById('contactForm');
    if (form){
        form.addEventListener('submit', e=>{
            e.preventDefault();
            const btn = e.target.querySelector('button');
            if (btn) { btn.disabled = true; btn.innerHTML = 'Enviando...'; }
            setTimeout(()=>{ alert('Mensaje enviado ✅'); e.target.reset(); if (btn){ btn.disabled=false; btn.innerHTML = '<i class=\"bi bi-send\"></i> Enviar'; } }, 900);
        });
    }

    // smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', e=>{
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const id = href.slice(1);
            scrollToSection(id);
            // if navbar collapsed on mobile, close it
            const bsCollapse = document.querySelector('.navbar-collapse');
            if (bsCollapse && bsCollapse.classList.contains('show')) {
                // use Bootstrap collapse hide if available
                try { new bootstrap.Collapse(bsCollapse).hide(); } catch (err) { /* ignore */ }
            }
        });
    });

    // inicializaciones
    detectDevice();
    loadGallery();
    window.addEventListener('resize', detectDevice);
});

// highlight nav link depending on scroll position
function highlightCurrentSection(){
    const sections = Array.from(document.querySelectorAll('main section, main [id]')).filter(s=>s.id);
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    let currentId = null;
    const offset = 90; // toma en cuenta la altura de la navbar
    for (let sec of sections){
        const rect = sec.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
            currentId = sec.id;
            break;
        }
    }
    navLinks.forEach(link=>{
        const target = link.getAttribute('href') ? link.getAttribute('href').slice(1) : '';
        if (target === currentId) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// ejecutar highlight al cargar por si la página se abre con ancla
window.addEventListener('load', highlightCurrentSection);
