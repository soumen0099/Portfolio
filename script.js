document.addEventListener('DOMContentLoaded', () => {
  // Particle.js Configuration (Neon Wave Effect)
  const particleCount = window.innerWidth > 768 ? 60 : window.innerWidth > 480 ? 40 : 20;
  particlesJS('particles-js', {
    particles: {
      number: { value: particleCount, density: { enable: true, value_area: 800 } },
      color: { value: ['#00adb5', '#f1c4ef', '#ffffff'] },
      shape: { type: 'circle', stroke: { width: 0 } },
      opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#00adb5',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'repulse' },
        resize: true
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.7 } },
        repulse: { distance: 200, duration: 0.4 }
      }
    },
    retina_detect: true
  });

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      if (navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Reveal Sections on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const { top } = el.getBoundingClientRect();
      if (top < triggerBottom) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Animated Counters
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    let count = 0;
    const updateCounter = () => {
      if (count < target) {
        count += Math.ceil(target / 50);
        stat.textContent = count > target ? target : count;
        requestAnimationFrame(updateCounter);
      }
    };
    const { top } = stat.getBoundingClientRect();
    if (top < window.innerHeight) {
      requestAnimationFrame(updateCounter);
    }
  });

  // Contact Form
  const contactForm = document.querySelector('#contact-form');
  contactForm.classList.remove('hidden');

  const inputs = document.querySelectorAll('.contact-form .form-input');
  inputs.forEach((input, index) => {
    input.style.animationDelay = `${0.5 + index * 0.2}s`;
  });

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const submitBtn = document.querySelector('.submit-btn');

    const nameError = nameInput.nextElementSibling.nextElementSibling;
    const emailError = emailInput.nextElementSibling.nextElementSibling;
    const messageError = messageInput.nextElementSibling.nextElementSibling;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameError.classList.remove('active');
    emailError.classList.remove('active');
    messageError.classList.remove('active');

    let isValid = true;

    if (nameInput.value.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters';
      nameError.classList.add('active');
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email';
      emailError.classList.add('active');
      isValid = false;
    }

    if (messageInput.value.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      messageError.classList.add('active');
      isValid = false;
    }

    if (isValid) {
      submitBtn.classList.add('success');
      try {
        // Simulate form submission (actual submission blocked in sandbox)
        const formData = new FormData(contactForm);
        const response = await fetch('https://formspree.io/f/xovvdgla', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactForm.reset();
          setTimeout(() => {
            submitBtn.classList.remove('success');
            alert('Form submitted successfully!');
          }, 2000);
        } else {
          submitBtn.classList.remove('success');
          alert('Form submission failed. Please try again.');
        }
      } catch (error) {
        submitBtn.classList.remove('success');
        alert('An error occurred. Please try again.');
      }
    }
  });

  // Parallax Effect for Contact Section
  const contactSection = document.querySelector('#contact');
  document.addEventListener('mousemove', e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / centerX * 5;
    const moveY = (clientY - centerY) / centerY * 5;
    contactSection.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
  });
});

const backToTopBtn = document.querySelector('.back-to-top');

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.style.display = 'none';
