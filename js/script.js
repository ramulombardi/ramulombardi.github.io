// script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Animaciones Fade/Slide con Intersection Observer ---
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Animación Hero Section: CTA Button Pulse ---
    const ctaButton = document.querySelector('.hero-section .cta-button');
    // La clase 'pulse' ya está en el HTML, CSS se encarga.
    // Opcional: Removerla después de un tiempo si solo queremos que pulse al cargar
    // setTimeout(() => {
    //     ctaButton.classList.remove('pulse');
    // }, 5000);


    // --- Formulario de contacto ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Limpiar mensajes anteriores
        formMessage.textContent = '';
        formMessage.className = 'form-message'; // Resetear clases

        // Validación básica
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;

        // Validar nombre
        if (nameInput.value.trim() === '') {
            nameInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            nameInput.style.borderColor = 'var(--color-form-border)';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            emailInput.style.borderColor = 'var(--color-form-border)';
        }

        // Validar mensaje
        if (messageInput.value.trim() === '') {
            messageInput.style.borderColor = 'var(--color-error)';
            isValid = false;
        } else {
            messageInput.style.borderColor = 'var(--color-form-border)';
        }

        if (!isValid) {
            formMessage.textContent = 'Por favor, corrige los campos marcados.';
            formMessage.classList.add('error');
            return;
        }

        // Simular envío de formulario (sin backend real)
        formMessage.textContent = 'Enviando mensaje...';
        formMessage.classList.add('success'); // Opcional, para indicar progreso

        setTimeout(() => {
            formMessage.textContent = '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.';
            formMessage.className = 'form-message success'; // Asegurarse de que sea la clase final
            contactForm.reset(); // Limpiar formulario
            // Resetear bordes después del envío exitoso
            nameInput.style.borderColor = 'var(--color-form-border)';
            emailInput.style.borderColor = 'var(--color-form-border)';
            messageInput.style.borderColor = 'var(--color-form-border)';
        }, 1500); // Retraso de 1.5 segundos para simular el envío
      });
    }

    // --- Modal Certificaciones ---
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = modal ? modal.querySelector('.close') : null;
    const thumbs = document.querySelectorAll('.cert-thumb');

    if (modal && modalImg && modalClose && thumbs.length > 0) {
      thumbs.forEach(img => {
        img.addEventListener('click', () => {
          modalImg.src = img.src.replace('.jpg', '.jpg');
          modal.classList.add('open');
        });
      });

      modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        modalImg.src = '';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          modalImg.src = '';
        }
      });
    }

});