// =====================================================
// QR RESTAURANT LANDING PAGE - JavaScript
// EmailJS Integration & Interactions
// =====================================================

// =====================================================
// EMAILJS CONFIGURATION
// =====================================================

// 🔴 IMPORTANT: Replace these with your EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',      // e.g., 'service_abc123'
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // e.g., 'template_xyz789'
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'       // Already initialized in HTML
};

// =====================================================
// DEMO URL CONFIGURATION
// =====================================================

// Change this to your demo menu URL
const DEMO_URL = 'menu.html?table=1';  // Demo table number

// =====================================================
// DOM ELEMENTS
// =====================================================

const modal = document.getElementById('contactModal');
const contactForm = document.getElementById('contactForm');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');

// Buttons that open contact form
const getStartedBtn = document.getElementById('getStartedBtn');
const ctaGetStartedBtn = document.getElementById('ctaGetStartedBtn');
const footerContact = document.getElementById('footerContact');

// Buttons that open demo
const watchDemoBtn = document.getElementById('watchDemoBtn');
const footerDemo = document.getElementById('footerDemo');

// Form elements
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');
const formStatus = document.getElementById('formStatus');

// =====================================================
// EVENT LISTENERS
// =====================================================

// Open contact modal
getStartedBtn.addEventListener('click', openModal);
ctaGetStartedBtn.addEventListener('click', openModal);
footerContact.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Close modal
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Watch demo buttons
watchDemoBtn.addEventListener('click', openDemo);
footerDemo.addEventListener('click', (e) => {
    e.preventDefault();
    openDemo();
});

// Form submission
contactForm.addEventListener('submit', handleFormSubmit);

// =====================================================
// MODAL FUNCTIONS
// =====================================================

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
    formStatus.style.display = 'none';
    formStatus.className = 'form-status';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// =====================================================
// DEMO FUNCTION
// =====================================================

function openDemo() {
    console.log('🎬 Opening demo...');
    window.open(DEMO_URL, '_blank');
}

// =====================================================
// FORM SUBMISSION WITH EMAILJS
// =====================================================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    console.log('📧 Submitting form...');
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form data:', formData);
    
    // Validate
    if (!formData.fullName || !formData.email || !formData.message) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
                from_name: formData.fullName,
                from_email: formData.email,
                message: formData.message,
                to_name: 'QR Restaurant Team'  // Your name/company
            }
        );
        
        console.log('✅ Email sent successfully:', response);
        
        // Show success message
        showStatus('Thank you! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            setTimeout(closeModal, 1000);
        }, 2000);
        
    } catch (error) {
        console.error('❌ Email send failed:', error);
        showStatus('Failed to send message. Please try again or email us directly.', 'error');
    } finally {
        setLoadingState(false);
    }
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function setLoadingState(isLoading) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoader.style.display = 'block';
    } else {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoader.style.display = 'none';
    }
}

function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

// =====================================================
// SMOOTH SCROLLING
// =====================================================

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

// =====================================================
// SCROLL ANIMATIONS
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.step, .benefit-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log('%c🍽️ QR Restaurant Landing Page', 'font-size: 20px; font-weight: bold; color: #0D9488;');
console.log('%cTo configure EmailJS:', 'font-size: 14px; color: #64748B;');
console.log('%c1. Create account at https://www.emailjs.com/', 'font-size: 12px;');
console.log('%c2. Add your Gmail service', 'font-size: 12px;');
console.log('%c3. Create email template', 'font-size: 12px;');
console.log('%c4. Replace credentials in app.js', 'font-size: 12px;');
console.log('%c5. Replace PUBLIC_KEY in index.html', 'font-size: 12px;');

// =====================================================
// END
// =====================================================