// Scroll suave
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}

// Navbar efecto scroll
window.addEventListener('scroll',()=>document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY>100));

// Galería
function loadGallery(){
    const container=document.getElementById('gallery-container');
    const colors=['FF6B6B','4ECDC4','45B7D1','FFA07A','98D8C8','F7DC6F'];
    setTimeout(()=>{
        container.innerHTML=colors.map((c,i)=>`
            <div class="col-md-4">
                <div class="feature-card gallery-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJBLt5Rk_qwbZ6uq_Fp9ODVjbW7MTz1ia-og&s" alt="Imagen ${i+1}">
                </div>
            </div>`).join('');
    },1000);
}

// Formulario contacto
document.getElementById('contactForm').addEventListener('submit',e=>{
    e.preventDefault();
    const btn=e.target.querySelector('button');
    btn.disabled=true; btn.innerHTML='Enviando...';
    setTimeout(()=>{alert('Mensaje enviado'); e.target.reset(); btn.disabled=false; btn.innerHTML='<i class="bi bi-send"></i> Enviar';},1000);
});

// Inicialización
document.addEventListener('DOMContentLoaded',()=>{
    detectDevice(); loadGallery();
    window.addEventListener('resize',detectDevice);
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
        e.preventDefault(); scrollToSection(a.getAttribute('href').slice(1));
    }));
});
