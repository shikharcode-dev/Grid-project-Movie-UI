// Header Mobile Menu Logic
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if(navMenu.classList.contains('active')) {
        menuBtn.classList.replace('ri-menu-line', 'ri-close-line');
    } else {
        menuBtn.classList.replace('ri-close-line', 'ri-menu-line');
    }
});

document.querySelectorAll('.header-nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.classList.replace('ri-close-line', 'ri-menu-line');
    });
});

// Reset scroll position on refresh
window.onbeforeunload = function () { window.scrollTo(0, 0); };
setTimeout(function(){ window.scrollTo(0, 0); }, 10);

// MARQUEE LOGIC: Auto-scroll + Drag/Swipe Support + Hover Fix
const marquees = document.querySelectorAll('.marquee-wrapper');

marquees.forEach(marquee => {
    const track = marquee.querySelector('.marquee-track');
    
    // Duplicate the track's inner HTML to create the seamless infinite loop
    track.innerHTML += track.innerHTML;

    let isDown = false;
    let startX;
    let scrollLeft;
    let isHovered = false;
    let speed = 2.2; // Increased speed for faster, smooth scrolling

    // Auto-Scrolling Function
    function autoScroll() {
        if (!isHovered && !isDown) {
            marquee.scrollLeft += speed; 
            
            // If we scroll past halfway, instantly snap back for the infinite loop
            if (marquee.scrollLeft >= track.scrollWidth / 2) {
                marquee.scrollLeft -= track.scrollWidth / 2;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);

    // Mouse Events (PC Dragging)
    marquee.addEventListener('mousedown', (e) => {
        isDown = true;
        marquee.classList.add('is-dragging'); // Disables hover effects while dragging
        marquee.style.cursor = 'grabbing';
        startX = e.pageX - marquee.offsetLeft;
        scrollLeft = marquee.scrollLeft;
    });
    
    marquee.addEventListener('mouseleave', () => {
        isDown = false;
        isHovered = false;
        marquee.classList.remove('is-dragging');
        marquee.style.cursor = 'grab';
    });
    
    marquee.addEventListener('mouseenter', () => {
        isHovered = true;
    });
    
    marquee.addEventListener('mouseup', () => {
        isDown = false;
        marquee.classList.remove('is-dragging');
        marquee.style.cursor = 'grab';
    });
    
    marquee.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - marquee.offsetLeft;
        const walk = (x - startX) * 2; // Drag sensitivity
        
        let newScrollLeft = scrollLeft - walk;
        
        // Backward loop check
        if (newScrollLeft <= 0) {
            newScrollLeft += track.scrollWidth / 2;
            scrollLeft += track.scrollWidth / 2; // Adjust anchor
        } 
        // Forward loop check
        else if (newScrollLeft >= track.scrollWidth / 2) {
            newScrollLeft -= track.scrollWidth / 2;
            scrollLeft -= track.scrollWidth / 2; // Adjust anchor
        }
        
        marquee.scrollLeft = newScrollLeft;
    });

    // Touch Events (Phones & Tablets)
    marquee.addEventListener('touchstart', (e) => {
        isDown = true;
        isHovered = true; // Pause auto-scroll when touching
        marquee.classList.add('is-dragging');
        startX = e.touches[0].pageX - marquee.offsetLeft;
        scrollLeft = marquee.scrollLeft;
    });
    
    marquee.addEventListener('touchend', () => {
        isDown = false;
        isHovered = false; // Resume auto-scroll
        marquee.classList.remove('is-dragging');
    });
    
    marquee.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - marquee.offsetLeft;
        const walk = (x - startX) * 2;
        
        let newScrollLeft = scrollLeft - walk;
        
        // Backward loop check
        if (newScrollLeft <= 0) {
            newScrollLeft += track.scrollWidth / 2;
            scrollLeft += track.scrollWidth / 2;
        } 
        // Forward loop check
        else if (newScrollLeft >= track.scrollWidth / 2) {
            newScrollLeft -= track.scrollWidth / 2;
            scrollLeft -= track.scrollWidth / 2;
        }

        marquee.scrollLeft = newScrollLeft;
    });
});