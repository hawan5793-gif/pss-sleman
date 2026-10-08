const loader = document.getElementById('loader');
const progress = document.getElementById('progress');
const topbar = document.getElementById('topbar');
const topbarProgress = document.getElementById('topbarProgress');
const mainNav = document.getElementById('mainNav');
const navIndicator = document.getElementById('navIndicator');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const soundBtn = document.getElementById('soundBtn');
const heroImageCard = document.getElementById('heroImageCard');
const poster = document.getElementById('poster');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const topBtn = document.getElementById('topBtn');


// =====================================================
// LOADING SCREEN
// =====================================================

window.addEventListener('load', () => {
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hide');
        }
    }, 650);
});


// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});


// =====================================================
// SCROLL PROGRESS + NAVBAR
// =====================================================

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const documentElement = document.documentElement;

    const totalScroll =
        documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        totalScroll > 0
            ? (scrollTop / totalScroll) * 100
            : 0;

    if (progress) {
        progress.style.width = `${scrollPercentage}%`;
    }

    if (topbarProgress) {
        topbarProgress.style.width = `${scrollPercentage}%`;
    }

    if (topbar) {
        topbar.classList.toggle(
            'scrolled',
            scrollTop > 30
        );
    }
}

window.addEventListener(
    'scroll',
    updateScrollUI,
    {
        passive: true
    }
);

updateScrollUI();


// =====================================================
// MOBILE MENU
// =====================================================

if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');

        menuBtn.setAttribute(
            'aria-expanded',
            String(isOpen)
        );
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');

            menuBtn.setAttribute(
                'aria-expanded',
                'false'
            );
        });
    });
}


// =====================================================
// PARALLAX EFFECT
// =====================================================

window.addEventListener('pointermove', (event) => {

    // Matikan efek di layar kecil
    if (window.innerWidth < 850) {
        return;
    }

    // Matikan jika motion mode off
    if (
        document.body.classList.contains(
            'motion-off'
        )
    ) {
        return;
    }

    const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 2;


    // Hero image
    if (heroImageCard) {
        heroImageCard.style.transform = `
            rotate(${2.8 + x * 1.5}deg)
            translate(${x * 8}px, ${12 + y * 5}px)
        `;
    }


    // Poster
    if (poster) {
        poster.style.transform = `
            rotate(${4 - x * 1.2}deg)
            translate(${x * 5}px, ${y * -5}px)
        `;
    }
});


// =====================================================
// MOTION MODE / REDUCED MOTION
// =====================================================

if (soundBtn) {
    soundBtn.addEventListener('click', () => {

        const motionOff =
            document.body.classList.toggle(
                'motion-off'
            );

        document.body.classList.toggle(
            'motion-on',
            !motionOff
        );

        soundBtn.setAttribute(
            'aria-pressed',
            String(!motionOff)
        );


        // Ubah teks tombol
        const textNode =
            soundBtn.lastChild;

        if (textNode) {
            textNode.textContent =
                motionOff
                    ? ' Reduced motion'
                    : ' Motion mode';
        }


        // Reset posisi ketika motion dimatikan
        if (motionOff) {

            if (heroImageCard) {
                heroImageCard.style.transform =
                    'rotate(2.8deg) translateY(12px)';
            }

            if (poster) {
                poster.style.transform =
                    'rotate(4deg)';
            }

        }
    });
}


// =====================================================
// COUNTER TAHUN PSS
// =====================================================

const counter =
    document.querySelector('[data-count]');

let counterStarted = false;

if (counter) {

    const counterObserver =
        new IntersectionObserver(
            (entries) => {

                if (
                    !entries[0].isIntersecting ||
                    counterStarted
                ) {
                    return;
                }

                counterStarted = true;

                const target =
                    Number(
                        counter.dataset.count
                    );

                let value = 0;

                const step =
                    Math.max(
                        1,
                        Math.ceil(target / 38)
                    );


                const animateCounter = () => {

                    value =
                        Math.min(
                            target,
                            value + step
                        );

                    counter.textContent = value;


                    if (value < target) {
                        requestAnimationFrame(
                            animateCounter
                        );
                    }
                };


                requestAnimationFrame(
                    animateCounter
                );
            },
            {
                threshold: 0.5
            }
        );

    counterObserver.observe(counter);
}


// =====================================================
// COPY QUOTE
// =====================================================

if (copyBtn) {

    copyBtn.addEventListener(
        'click',
        async () => {

            const quote =
                'PSS Sleman bukan hanya sekadar klub sepak bola, tapi sudah menjadi entitas yang multidimensional, dari yang rasional sampai yang sifatnya emosional.';

            try {

                await navigator.clipboard.writeText(
                    quote
                );


                if (toast) {

                    toast.textContent =
                        'Kutipan berhasil disalin!';

                    toast.classList.add(
                        'show'
                    );


                    setTimeout(() => {
                        toast.classList.remove(
                            'show'
                        );
                    }, 1800);
                }

            } catch (error) {

                if (toast) {

                    toast.textContent =
                        'Salin manual: kutipan tersedia di artikel.';

                    toast.classList.add(
                        'show'
                    );


                    setTimeout(() => {
                        toast.classList.remove(
                            'show'
                        );
                    }, 2200);
                }
            }
        }
    );
}


// =====================================================
// BUTTON KEMBALI KE ATAS
// =====================================================

if (topBtn) {

    topBtn.addEventListener(
        'click',
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }
    );
}


// =====================================================
// GLIDING MAGNETIC INDICATOR & ACTIVE NAVIGATION
// =====================================================

const sections = document.querySelectorAll('section[id]');
const desktopNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[href^="#"]');
let isHoveringNav = false;

function moveIndicatorTo(linkEl) {
    if (!navIndicator || !mainNav || !linkEl) return;
    const navRect = mainNav.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    navIndicator.style.width = `${width}px`;
    navIndicator.style.transform = `translateX(${left}px)`;
    navIndicator.style.opacity = '1';
}

function hideIndicator() {
    if (navIndicator) {
        navIndicator.style.opacity = '0';
    }
}

// Hover interactions for desktop magnetic pill indicator
desktopNavLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        isHoveringNav = true;
        moveIndicatorTo(link);
    });
});

if (mainNav) {
    mainNav.addEventListener('mouseleave', () => {
        isHoveringNav = false;
        const currentActive = mainNav.querySelector('.nav-link.active');
        if (currentActive) {
            moveIndicatorTo(currentActive);
        } else {
            hideIndicator();
        }
    });
}

function updateActiveNav() {
    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    let activeDesktopLink = null;

    desktopNavLinks.forEach((link) => {
        const target = link.getAttribute('href');
        const isActive = Boolean(currentSection && target === `#${currentSection}`);
        link.classList.toggle('active', isActive);
        if (isActive) {
            activeDesktopLink = link;
        }
    });

    mobileNavLinks.forEach((link) => {
        const target = link.getAttribute('href');
        const isActive = Boolean(currentSection && target === `#${currentSection}`);
        link.classList.toggle('active', isActive);
    });

    if (!isHoveringNav) {
        if (activeDesktopLink) {
            moveIndicatorTo(activeDesktopLink);
        } else {
            hideIndicator();
        }
    }
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && !isHoveringNav) {
        moveIndicatorTo(activeLink);
    }
}, { passive: true });

setTimeout(updateActiveNav, 150);


// =====================================================
// SMOOTH SCROLL
// =====================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            'click',
            (event) => {

                const targetId =
                    anchor.getAttribute(
                        'href'
                    );

                if (
                    !targetId ||
                    targetId === '#'
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }


                event.preventDefault();


                const offset = 95;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

            }
        );

    });


// =====================================================
// TILT EFFECT CARD
// =====================================================

document
    .querySelectorAll('[data-tilt]')
    .forEach((card) => {

        card.addEventListener(
            'mousemove',
            (event) => {

                if (
                    document.body.classList.contains(
                        'motion-off'
                    )
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -4;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    4;


                card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;
            }
        );


        card.addEventListener(
            'mouseleave',
            () => {

                card.style.transform =
                    'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
            }
        );

    });


// =====================================================
// IMAGE LAZY LOAD
// =====================================================

const lazyImages =
    document.querySelectorAll(
        'img[data-src]'
    );


const imageObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                const image =
                    entry.target;

                image.src =
                    image.dataset.src;


                image.removeAttribute(
                    'data-src'
                );


                observer.unobserve(
                    image
                );
            });
        }
    );


lazyImages.forEach((image) => {
    imageObserver.observe(image);
});


// =====================================================
// FOOTER YEAR
// =====================================================

const yearElement =
    document.querySelector(
        '[data-year]'
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =====================================================
// ESC UNTUK MENUTUP MOBILE MENU
// =====================================================

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape' &&
            mobileNav &&
            mobileNav.classList.contains('open')
        ) {

            mobileNav.classList.remove(
                'open'
            );

            if (menuBtn) {
                menuBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );
            }
        }
    }
);


// =====================================================
// CLOSE MENU KETIKA KLIK DI LUAR
// =====================================================

document.addEventListener(
    'click',
    (event) => {

        if (
            !mobileNav ||
            !menuBtn
        ) {
            return;
        }


        const clickedInsideMenu =
            mobileNav.contains(
                event.target
            );

        const clickedButton =
            menuBtn.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileNav.classList.remove(
                'open'
            );

            menuBtn.setAttribute(
                'aria-expanded',
                'false'
            );
        }
    }
);


// =====================================================
// PREFERS REDUCED MOTION
// =====================================================

const prefersReducedMotion =
    window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );


function applySystemMotionPreference() {

    if (
        prefersReducedMotion.matches
    ) {

        document.body.classList.add(
            'motion-off'
        );

        document.body.classList.remove(
            'motion-on'
        );

    } else {

        document.body.classList.remove(
            'motion-off'
        );

        document.body.classList.add(
            'motion-on'
        );
    }
}


applySystemMotionPreference();


prefersReducedMotion.addEventListener(
    'change',
    applySystemMotionPreference
);