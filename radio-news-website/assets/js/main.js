// Main Site Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // News category filtering
    const categoryButtons = document.querySelectorAll('.category-button');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (categoryButtons.length && newsCards.length) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.textContent.trim();
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
                this.classList.add('bg-blue-600', 'text-white');
                
                // Filter news cards
                newsCards.forEach(card => {
                    const cardCategory = card.querySelector('.news-category').textContent.trim();
                    if (category === 'All' || cardCategory === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            newsCards.forEach(card => {
                const title = card.querySelector('.news-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }

    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize radio player
    if (typeof initRadioPlayer === 'function') {
        initRadioPlayer();
    }
});

// Dark mode toggle (optional)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}