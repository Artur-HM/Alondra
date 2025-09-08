// Device Detection
function detectDevice() {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    let deviceType = '', deviceIcon = '';

    if(width<=576){deviceType='Móvil';deviceIcon='bi-phone';}
    else if(width<=768){deviceType='Tablet';deviceIcon='bi-tablet';}
    else if(width<=1200){deviceType='Laptop';deviceIcon='bi-laptop';}
    else{deviceType='Desktop';deviceIcon='bi-display';}

    let os='';
    if(userAgent.includes('Windows')) os='Windows';
    else if(userAgent.includes('Mac')) os='macOS';
    else if(userAgent.includes('Android')) os='Android';
    else if(userAgent.includes('iOS')) os='iOS';
    else if(userAgent.includes('Linux')) os='Linux';

    alert(`Dispositivo detectado:\n- Tipo: ${deviceType}\n- Sistema: ${os}\n- Resolución: ${width}x${window.innerHeight}px`);
}

// Smooth scrolling
function scrollToSection(sectionId){
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Navbar scroll effect
window.addEventListener('scroll', function(){
    const navbar = document.querySelector('.navbar');
    if(window.scrollY>100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Load gallery images
function loadGallery(){
    const galleryContainer = document.getElementById('gallery-container');
    const loading = galleryContainer.querySelector('.loading');
    loading.style.display = 'block';

    setTimeout(()=>{
        const colors = ['FF6B6B','4ECDC4','45B7D1','FFA07A','98D8C8','F7DC6F'];
        let galleryHTML='';
        for(let i=1;i<=6;i++){
            const color = colors[i-1];
            galleryHTML += `
            <div class="col-md-4">
                <div class="gallery-item">
                    <img src="https://via.placeholder.com/400x250/${color}/FFFFFF?text=Imagen+${i}" alt="Imagen ${i}">
                    <div class="gallery-overlay">
                        <i class="bi bi-zoom-in text-white" style="font-size:2rem;"></i>
                    </div>
                </div>
            </div>`;
        }
        loading.style.display = 'none';
        galleryContainer.innerHTML = galleryHTML;
    },1500);
}

// Contact form
document.getElementById('contactForm').addEventListener('submit',function(e){
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    submitBtn.disabled=true;
    setTimeout(()=>{
        alert('¡Mensaje enviado correctamente! Gracias por contactarnos.');
        this.reset();
        submitBtn.innerHTML=originalText;
        submitBtn.disabled=false;
    },2000);
});

// Initialize
document.addEventListener('DOMContentLoaded',function(){
    detectDevice();
    loadGallery();

    window.addEventListener('resize', detectDevice);

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click',function(e){
            e.preventDefault();
            const target=document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        });
    });

    setTimeout(addInteractiveElements,100);
});

// Interactive elements
function addInteractiveElements(){
    window.addEventListener('scroll',function(){
        const scrolled=window.pageYOffset;
        const hero=document.querySelector('.hero');
        if(hero) hero.style.transform=`translateY(${scrolled*0.5}px)`;
    });

    const observerOptions={threshold:0.1, rootMargin:'0px 0px -50px 0px'};
    const observer=new IntersectionObserver(function(entries){
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.style.opacity='1';
                entry.target.style.transform='translateY(0)';
            }
        });
    },observerOptions);

    document.querySelectorAll('.feature-card').forEach(card=>{
        card.style.opacity='0';
        card.style.transform='translateY(50px)';
        card.style.transition='opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}
