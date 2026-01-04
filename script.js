document.addEventListener('DOMContentLoaded', () => {
    
    /* --- Mobile Navigation --- */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    /* --- Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    /* --- Lightbox Logic (Gallery Page) --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (lightbox) {
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    /* --- Booking Logic (URL Params) --- */
    const urlParams = new URLSearchParams(window.location.search);
    const roomType = urlParams.get('room');
    const bookingContext = document.getElementById('booking-context');
    const selectedRoom = document.getElementById('selected-room');

    if (roomType && bookingContext && selectedRoom) {
        bookingContext.style.display = 'block';
        selectedRoom.textContent = roomType;
        
        // Update WhatsApp text to include room inquiry
        const waBtn = document.querySelector('.btn-whatsapp');
        if (waBtn) {
            const baseLink = waBtn.href;
            const text = `Hi, I am interested in booking the ${roomType}.`;
            waBtn.href = `${baseLink}?text=${encodeURIComponent(text)}`;
        }
    }

    /* --- Review Submission Simulation --- */
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = reviewForm.querySelector('input[type="text"]').value;
            const reviewText = reviewForm.querySelector('textarea').value;
            const rating = reviewForm.querySelector('select').value;
            
            // Validate
            if(name && reviewText) {
                alert('Thank you for your review! It has been submitted.');
                
                // Simulate immediate update if we are on the reviews page
                const reviewsWrapper = document.querySelector('.reviews-wrapper');
                if (reviewsWrapper) {
                    const stars = '★'.repeat(rating);
                    
                    const newReviewHTML = `
                        <div class="review-card animate-up">
                            <div class="stars" style="color: #FFD700; letter-spacing: 2px;">${stars}</div>
                            <p>"${reviewText}"</p>
                            <div class="reviewer">
                                <span>${name} <small>Just Now</small></span>
                            </div>
                        </div>
                    `;
                    
                    // Insert at top
                    reviewsWrapper.insertAdjacentHTML('afterbegin', newReviewHTML);
                    
                    // Clear form
                    reviewForm.reset();
                }
            }
        });
    }

    /* --- Animation on Scroll --- */
    const animateElements = document.querySelectorAll('.animate-up');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

});
