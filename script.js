const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    navMenu.classList.toggle('flex');
    if(navMenu.classList.contains('flex')) {
        menuBtn.classList.replace('ri-menu-line', 'ri-close-line');
    } else {
        menuBtn.classList.replace('ri-close-line', 'ri-menu-line');
    }
});

document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
    link.addEventListener('click', () => {
        if(window.innerWidth < 768) {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex');
            menuBtn.classList.replace('ri-close-line', 'ri-menu-line');
        }
    });
});

// Reset scroll position on refresh
window.onbeforeunload = function () { window.scrollTo(0, 0); };
setTimeout(function(){ window.scrollTo(0, 0); }, 10);



const giantText = document.querySelector('.giant-outline-text');
let currentSpotlightSize = 0;
let targetSpotlightSize = 0;

function animateSpotlight() {
    currentSpotlightSize += (targetSpotlightSize - currentSpotlightSize) * 0.08; 
    if (giantText) {
        giantText.style.setProperty('--spotlight-size', `${currentSpotlightSize}px`);
    }
    requestAnimationFrame(animateSpotlight);
}

if (giantText) {
    animateSpotlight(); 

    giantText.addEventListener('mousemove', (e) => {
        const rect = giantText.getBoundingClientRect();
        giantText.style.setProperty('--x', `${e.clientX - rect.left}px`);
        giantText.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });

    giantText.addEventListener('mouseenter', (e) => {
        const rect = giantText.getBoundingClientRect();
        giantText.style.setProperty('--x', `${e.clientX - rect.left}px`);
        giantText.style.setProperty('--y', `${e.clientY - rect.top}px`);
        targetSpotlightSize = 200; 
    });

    giantText.addEventListener('mouseleave', () => {
        targetSpotlightSize = 0; 
    });
}



const marquees = document.querySelectorAll('.marquee-wrapper');

marquees.forEach(marquee => {
    const track = marquee.querySelector('.marquee-track');
    track.innerHTML += track.innerHTML; // Duplicate for seamless loop

    let isDown = false;
    let startX;
    let scrollLeft;
    let isHovered = false;
    let speed = 2.2; 

    function autoScroll() {
        if (!isHovered && !isDown) {
            marquee.scrollLeft += speed; 
            if (marquee.scrollLeft >= track.scrollWidth / 2) {
                marquee.scrollLeft -= track.scrollWidth / 2;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);

    // Mouse Drag Events
    marquee.addEventListener('mousedown', (e) => {
        isDown = true;
        marquee.classList.add('is-dragging');
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
    
    marquee.addEventListener('mouseenter', () => { isHovered = true; });
    
    marquee.addEventListener('mouseup', () => {
        isDown = false;
        marquee.classList.remove('is-dragging');
        marquee.style.cursor = 'grab';
    });
    
    marquee.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - marquee.offsetLeft;
        const walk = (x - startX) * 2;
        
        let newScrollLeft = scrollLeft - walk;
        if (newScrollLeft <= 0) {
            newScrollLeft += track.scrollWidth / 2;
            scrollLeft += track.scrollWidth / 2; 
        } 
        else if (newScrollLeft >= track.scrollWidth / 2) {
            newScrollLeft -= track.scrollWidth / 2;
            scrollLeft -= track.scrollWidth / 2; 
        }
        marquee.scrollLeft = newScrollLeft;
    });

    // Touch Events
    marquee.addEventListener('touchstart', (e) => {
        isDown = true;
        isHovered = true; 
        marquee.classList.add('is-dragging');
        startX = e.touches[0].pageX - marquee.offsetLeft;
        scrollLeft = marquee.scrollLeft;
    });
    
    marquee.addEventListener('touchend', () => {
        isDown = false;
        isHovered = false; 
        marquee.classList.remove('is-dragging');
    });
    
    marquee.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - marquee.offsetLeft;
        const walk = (x - startX) * 2;
        
        let newScrollLeft = scrollLeft - walk;
        if (newScrollLeft <= 0) {
            newScrollLeft += track.scrollWidth / 2;
            scrollLeft += track.scrollWidth / 2;
        } 
        else if (newScrollLeft >= track.scrollWidth / 2) {
            newScrollLeft -= track.scrollWidth / 2;
            scrollLeft -= track.scrollWidth / 2;
        }
        marquee.scrollLeft = newScrollLeft;
    });
});