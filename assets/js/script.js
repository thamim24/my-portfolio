const motionSelectors = [
    '.home .content h2',
    '.home .content p',
    '.home .content .btn',
    '.home .image',
    '.home .linkedin',
    '.home .github',
    '.home .twitter',
    '.home .telegram',
    '.home .instagram',
    '.home .dev',
    '.about .content h3',
    '.about .content .tag',
    '.about .content p',
    '.about .content .box-container',
    '.about .content .resumebtn',
    '.skills .container',
    '.skills .container .bar',
    '.education .box',
    '.work .box',
    '.experience .timeline',
    '.experience .timeline .container',
    '.contact .container',
    '.contact .container .form-group'
];

let srtop;

let tiltGyroPermissionBound = false;

async function requestDeviceOrientationPermission() {
    if (typeof window === 'undefined') return false;
    if (typeof DeviceOrientationEvent === 'undefined') return false;

    // Most browsers (Android/desktop) don't require explicit permission.
    if (typeof DeviceOrientationEvent.requestPermission !== 'function') {
        return true;
    }

    try {
        const result = await DeviceOrientationEvent.requestPermission();
        return result === 'granted';
    } catch (error) {
        return false;
    }
}

function bindTiltGyroPermissionTrigger() {
    if (tiltGyroPermissionBound) return;
    tiltGyroPermissionBound = true;

    const handler = async () => {
        // Only bother if effects are enabled and tilt exists.
        if (document.body.classList.contains('effects-off')) return;
        if (!document.querySelector('.tilt')) return;

        const granted = await requestDeviceOrientationPermission();
        if (granted) {
            // Re-init so VanillaTilt can start receiving orientation events.
            destroyTilt();
            initTilt();
        }
    };

    // iOS requires a user gesture; use existing UI interactions.
    document.querySelectorAll('.tilt').forEach((el) => {
        el.addEventListener('pointerdown', handler, { once: true, passive: true });
        el.addEventListener('touchstart', handler, { once: true, passive: true });
    });

    const effectsToggle = document.getElementById('effects-toggle');
    if (effectsToggle) {
        effectsToggle.addEventListener('pointerdown', handler, { once: true, passive: true });
        effectsToggle.addEventListener('touchstart', handler, { once: true, passive: true });
    }
}

function setTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('light-theme', !isDark);
    localStorage.setItem('portfolio-theme', theme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateParticlePalette(isDark);
}

function updateParticlePalette(isDark) {
    if (!window.pJSDom || !window.pJSDom[0]) return;

    const pJS = window.pJSDom[0].pJS;
    const color = isDark ? '#ffffff' : '#000000';
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.particles.opacity.value = isDark ? 0.34 : 0.5;
    pJS.particles.line_linked.opacity = isDark ? 0.22 : 0.4;

    if (pJS.fn && pJS.fn.particlesRefresh) {
        pJS.fn.particlesRefresh();
    }

    if (document.body.classList.contains('effects-off')) {
        setParticlesMotion(false);
    }
}

function setParticlesMotion(enabled) {
    if (!window.pJSDom || !window.pJSDom[0]) return;

    const pJS = window.pJSDom[0].pJS;
    pJS.particles.move.enable = enabled;

    if (pJS.fn && pJS.fn.vendors) {
        if (enabled && pJS.fn.vendors.start) {
            pJS.fn.vendors.start();
        }
        if (!enabled && pJS.fn.vendors.pause) {
            pJS.fn.vendors.pause();
        }
    }
}

function initTilt() {
    if (!window.VanillaTilt) return;
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        gyroscope: true,
        gyroscopeMinAngleX: -45,
        gyroscopeMaxAngleX: 45,
        gyroscopeMinAngleY: -45,
        gyroscopeMaxAngleY: 45,
    });
}

function destroyTilt() {
    document.querySelectorAll(".tilt").forEach((element) => {
        if (element.vanillaTilt) {
            element.vanillaTilt.destroy();
        }
    });
}

function initScrollReveal() {
    if (!window.ScrollReveal || srtop) return;

    srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h2', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });
    srtop.reveal('.home .telegram', { interval: 600 });
    srtop.reveal('.home .instagram', { interval: 600 });
    srtop.reveal('.home .dev', { interval: 600 });
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.work .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}

function disableScrollReveal() {
    if (srtop && srtop.clean) {
        motionSelectors.forEach((selector) => srtop.clean(selector));
    }
    srtop = null;
    restoreRevealedContent();
}

function restoreRevealedContent() {
    motionSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.style.removeProperty('visibility');
            element.style.removeProperty('opacity');
            element.style.removeProperty('transform');
            element.style.removeProperty('transition');
            element.removeAttribute('data-sr-id');
        });
    });
}

function setEffects(enabled) {
    document.body.classList.toggle('effects-off', !enabled);
    localStorage.setItem('portfolio-effects', enabled ? 'on' : 'off');

    const toggle = document.getElementById('effects-toggle');
    if (toggle) {
        toggle.setAttribute('aria-pressed', String(enabled));
        const state = toggle.querySelector('.effects-toggle__state');
        if (state) state.textContent = enabled ? 'On' : 'Off';
    }

    setParticlesMotion(enabled);

    if (enabled) {
        restoreRevealedContent();
        initTilt();
        bindTiltGyroPermissionTrigger();
        initScrollReveal();
    } else {
        destroyTilt();
        disableScrollReveal();
    }
}

$(document).ready(function () {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    const savedEffects = localStorage.getItem('portfolio-effects') !== 'off';

    setTheme(savedTheme);
    setEffects(savedEffects);

    $('#theme-toggle').on('click', function () {
        setTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
    });

    $('#effects-toggle').on('click', function () {
        setEffects($(this).attr('aria-pressed') !== 'true');
    });

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        
        // Initialize EmailJS with your public key
        emailjs.init("xRRsJdIa3AuD5w3Z8"); // Replace with your real public key

        // Get form data
        const formData = {
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            phone: $('input[name="phone"]').val(),
            message: $('textarea[name="message"]').val()
        };

        // Send email using EmailJS
        emailjs.send('service_6av6e3x', 'template_s6w1vfd', formData)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Message sent successfully! I'll get back to you soon.");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Failed to send message. Please try again or contact me directly.");
            });
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Thamimul Ansari M";
            $("#favicon").attr("href", "./assets/images/hero.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "./assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["full-stack development", "backend development", "frontend development", "web development", "AI-powered solutions", "database management"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 600,
});
// <!-- typed js effect ends -->

// Skills are now hardcoded in HTML, so we don't need the fetchData function for skills
// But keeping the tilt effect for project boxes that exist in HTML when effects are enabled

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

