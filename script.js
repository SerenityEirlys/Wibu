document.addEventListener('DOMContentLoaded', () => {
    // Create animated particles
    createParticles();
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Sticky Header with reveal animation
    const header = document.querySelector('.premium-header');
    const heroSection = document.querySelector('.premium-hero');
    
    if (header && heroSection) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.style.top = '-80px'; // Hide header when scrolling down
            } else {
                header.style.top = '0'; // Show header when scrolling up
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add some delay for better UX
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });
    
    // Skill bar animation with counter
    const skillSection = document.querySelector('.skills');
    
    if (skillSection) {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        const animateSkillBars = () => {
            skillLevels.forEach(level => {
                const width = level.style.width;
                level.style.width = '0';
                
                // Add percentage counter to skill names
                const skillItem = level.closest('.skill-item');
                const skillName = skillItem.querySelector('.skill-name');
                const percentage = parseInt(width);
                
                // Set data attribute for skill level
                skillName.setAttribute('data-level', percentage + '%');
                
                // Animate the skill bar
                setTimeout(() => {
                    level.style.width = width;
                    
                    // Count up animation for percentage
                    let count = 0;
                    const counter = setInterval(() => {
                        count++;
                        skillName.setAttribute('data-level', count + '%');
                        if (count >= percentage) {
                            clearInterval(counter);
                        }
                    }, 15);
                }, 300);
            });
        };
        
        // Animate on scroll to skills section
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillSection);
    }
    
    // Add active class to nav items on scroll with highlight effect
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length) {
        window.addEventListener('scroll', () => {
            let scrollY = window.pageYOffset;
            
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 200;
                const sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinksItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                            
                            // Add highlight animation
                            link.classList.add('highlight-pulse');
                            setTimeout(() => {
                                link.classList.remove('highlight-pulse');
                            }, 1000);
                        }
                    });
                }
            });
        });
    }
    
    // Animate elements on scroll with staggered effect
    const animateElements = document.querySelectorAll('.achievement-category, .premium-achievement, .premium-card, .experience-item');
    
    if (animateElements.length) {
        const staggerDelay = 150;
        
        const animateOnScroll = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for each element
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * staggerDelay);
                    
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
        
        animateElements.forEach(element => {
            element.classList.add('fade-element');
            animateOnScroll.observe(element);
        });
    }
    
    // Create parallax scrolling effect
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Parallax for hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Parallax for particles
        const particles = document.querySelector('.glowing-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
    
    // Generate glowing particles
    function createParticles() {
        const particlesContainer = document.querySelector('.glowing-particles');
        if (!particlesContainer) return;
        
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 4 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.3;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set styles
            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(0, 255, 179, ${opacity});
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0, 255, 179, 0.7);
                animation: float ${duration}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add keyframes animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(10px) translateX(-15px);
                }
                75% {
                    transform: translateY(20px) translateX(5px);
                }
            }
            
            .highlight-pulse {
                animation: pulse 1s ease-in-out;
            }
            
            @keyframes pulse {
                0% {
                    text-shadow: none;
                }
                50% {
                    text-shadow: 0 0 15px rgba(0, 255, 179, 1);
                }
                100% {
                    text-shadow: none;
                }
            }
            
            .notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                padding: 15px 25px;
                border-radius: 5px;
                background-color: rgba(0, 255, 179, 0.9);
                color: #0a1929;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                z-index: 10000;
                font-family: 'Rajdhani', sans-serif;
                font-weight: 600;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            }
            
            .notification.error {
                background-color: rgba(255, 46, 99, 0.9);
                color: white;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Achievement categories hover effects
    const achievementCategories = document.querySelectorAll('.achievement-category');
    
    achievementCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            // Add glow effect
            category.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 179, 0.3)';
        });
        
        category.addEventListener('mouseleave', () => {
            // Remove glow effect
            category.style.boxShadow = '';
        });
    });
}); 