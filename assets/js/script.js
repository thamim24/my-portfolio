const body=document.body;
const header=document.getElementById("site-header");
const themeToggle=document.getElementById("theme-toggle");
const menuToggle=document.getElementById("menu-toggle");
const mobileNav=document.getElementById("mobile-nav");
const scrollTop=document.getElementById("scroll-top");
const cursorGlow=document.querySelector(".cursor-glow");


const motionStyle=document.createElement("style");

motionStyle.textContent=`
:root{--motion-ease:cubic-bezier(.22,1,.36,1)}

#particles-js{
    position:absolute;
    inset:0;
    z-index:0;
    pointer-events:auto;
    overflow:hidden
}

#particles-js .particles-js-canvas-el{
    position:absolute;
    inset:0;
    width:100%!important;
    height:100%!important
}

.home>:not(.hero-grid):not(.particles-layer):not(.hero-orbit){
    position:relative;
    z-index:2
}

.home .hero-grid,
.home .hero-orbit{
    z-index:1
}

.reveal{
    --reveal-delay:0ms;
    opacity:0;
    visibility:hidden;
    transform:translate3d(0,80px,0);
    transition:
        opacity 1s var(--motion-ease) var(--reveal-delay),
        transform 1s var(--motion-ease) var(--reveal-delay),
        visibility 0s linear 1s;
    will-change:opacity,transform
}

.reveal.reveal-left{
    transform:translate3d(-80px,0,0)
}

.reveal.reveal-right{
    transform:translate3d(80px,0,0)
}

.reveal.reveal-scale{
    transform:translate3d(0,24px,0) scale(.92)
}

.reveal.visible{
    opacity:1;
    visibility:visible;
    transform:translate3d(0,0,0) scale(1);
    transition:
        opacity 1s var(--motion-ease) var(--reveal-delay),
        transform 1s var(--motion-ease) var(--reveal-delay),
        visibility 0s linear 0s
}

.reveal-delay{
    --reveal-delay:180ms
}

.social-icons a{
    will-change:transform,opacity
}

.floating-card{
    will-change:transform;
    animation:floatingCard 4.5s ease-in-out infinite
}

.card-two{
    animation-delay:-2.2s
}

.scroll-indicator i{
    animation:scrollArrow 1.7s ease-in-out infinite
}

.status-dot{
    animation:statusPulse 1.8s ease-in-out infinite
}

.typing-cursor{
    animation:cursorBlink .85s steps(1,end) infinite
}

.profile-frame,
.about-photo-frame,
.project-image{
    transform-style:preserve-3d;
    will-change:transform
}

.profile-frame-inner,
.project-image img,
.about-photo-frame img{
    transform:translateZ(0);
    backface-visibility:hidden
}

@keyframes floatingCard{
    0%,100%{
        transform:translate3d(0,0,0)
    }

    50%{
        transform:translate3d(0,-10px,0)
    }
}

@keyframes scrollArrow{
    0%,100%{
        transform:translateY(0)
    }

    50%{
        transform:translateY(7px)
    }
}

@keyframes statusPulse{
    0%,100%{
        transform:scale(1);
        opacity:1
    }

    50%{
        transform:scale(.72);
        opacity:.55
    }
}

@keyframes cursorBlink{
    0%,45%{
        opacity:1
    }

    46%,100%{
        opacity:0
    }
}

@media(prefers-reduced-motion:reduce){
    .reveal{
        opacity:1!important;
        visibility:visible!important;
        transform:none!important;
        transition:none!important
    }

    .floating-card,
    .scroll-indicator i,
    .status-dot,
    .typing-cursor{
        animation:none!important
    }

    #particles-js{
        display:none
    }
}

@media(max-width:800px){
    #particles-js{
        opacity:.72
    }

    /* Never move content horizontally on a narrow viewport. */
    .reveal{
        transform:translate3d(0,32px,0)
    }

    .reveal.reveal-left,
    .reveal.reveal-right{
        transform:translate3d(0,32px,0)
    }

    .reveal.reveal-scale{
        transform:translate3d(0,20px,0) scale(.96)
    }

    .reveal.visible{
        transform:translate3d(0,0,0) scale(1)
    }
}
`;

document.head.appendChild(motionStyle);


/* =========================================================
   GITHUB ICON
========================================================= */

function updateGithubIcon(){

    const icons=document.querySelectorAll(".github-icon");

    const dark=body.classList.contains("dark-theme");

    icons.forEach(icon=>{

        const light=icon.dataset.light;
        const darkSrc=icon.dataset.dark;

        if(light&&darkSrc){
            icon.src=dark?darkSrc:light;
        }

    });
}


/* =========================================================
   PARTICLE PALETTE
========================================================= */

function updateParticlePalette(){

    if(!window.pJSDom||!window.pJSDom[0]){
        return;
    }

    const pJS=window.pJSDom[0].pJS;

    const dark=body.classList.contains("dark-theme");

    const color=dark?"#ffffff":"#000000";

    pJS.particles.color.value=color;

    pJS.particles.line_linked.color=color;

    pJS.particles.opacity.value=dark?.34:.5;

    pJS.particles.line_linked.opacity=dark?.22:.4;

    if(
        pJS.fn&&
        pJS.fn.particlesRefresh
    ){
        pJS.fn.particlesRefresh();
    }
}


/* =========================================================
   THEME
========================================================= */

function setTheme(theme){

    const dark=theme==="dark";

    body.classList.toggle(
        "dark-theme",
        dark
    );

    body.classList.toggle(
        "light-theme",
        !dark
    );

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

    if(themeToggle){

        themeToggle.setAttribute(
            "aria-pressed",
            String(dark)
        );

        themeToggle.setAttribute(
            "aria-label",
            dark
                ?"Switch to light mode"
                :"Switch to dark mode"
        );

    }

    const themeIcon=
        document.querySelector(".theme-icon");

    if(themeIcon){
        themeIcon.textContent=
            dark?"⏾":"☀";
    }

    updateGithubIcon();

    updateParticlePalette();
}


setTheme(
    localStorage.getItem(
        "portfolio-theme"
    )||"light"
);


if(themeToggle){

    themeToggle.addEventListener(
        "click",
        ()=>{
            setTheme(
                body.classList.contains(
                    "dark-theme"
                )
                    ?"light"
                    :"dark"
            );
        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if(menuToggle&&mobileNav){

    menuToggle.addEventListener(
        "click",
        ()=>{

            const open=
                mobileNav.classList.toggle(
                    "open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

            menuToggle.setAttribute(
                "aria-label",
                open
                    ?"Close navigation menu"
                    :"Open navigation menu"
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link=>{

            link.addEventListener(
                "click",
                ()=>{

                    mobileNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link=>{

        link.addEventListener(
            "click",
            event=>{

                const targetId=
                    link.getAttribute(
                        "href"
                    );

                if(
                    !targetId||
                    targetId==="#"
                ){
                    return;
                }

                const target=
                    document.querySelector(
                        targetId
                    );

                if(!target){
                    return;
                }

                event.preventDefault();

                const headerOffset=
                    header
                        ?header.offsetHeight
                        :70;

                const targetPosition=
                    target.getBoundingClientRect()
                        .top+
                    window.scrollY-
                    headerOffset;

                window.scrollTo({
                    top:targetPosition,
                    behavior:"smooth"
                });

            }
        );

    });


/* =========================================================
   HEADER / SCROLL SPY
========================================================= */

function updateScrollState(){

    const scrollY=
        window.scrollY;

    if(header){

        header.classList.toggle(
            "scrolled",
            scrollY>40
        );

    }

    if(scrollTop){

        scrollTop.classList.toggle(
            "active",
            scrollY>600
        );

    }

    const sections=
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks=
        document.querySelectorAll(
            ".desktop-nav a"
        );

    let current="home";

    sections.forEach(
        section=>{

            const top=
                section.offsetTop-180;

            const bottom=
                top+
                section.offsetHeight;

            if(
                scrollY>=top&&
                scrollY<bottom
            ){
                current=section.id;
            }

        }
    );

    navLinks.forEach(
        link=>{

            link.classList.toggle(
                "active",
                link.getAttribute(
                    "href"
                )===`#${current}`
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateScrollState,
    {
        passive:true
    }
);


window.addEventListener(
    "load",
    updateScrollState
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements=[
    ...document.querySelectorAll(
        ".reveal"
    )
];


function prepareRevealAnimations(){

    const sections=
        document.querySelectorAll(
            "main section"
        );


    sections.forEach(
        section=>{

            const elements=[
                ...section.querySelectorAll(
                    ".reveal"
                )
            ];


            elements.forEach(
                (element,index)=>{

                    if(
                        !element.dataset.motionDirection
                    ){

                        const explicitDelay=
                            element.classList.contains(
                                "reveal-delay"
                            );


                        const delay=
                            explicitDelay
                                ?180
                                :Math.min(
                                    index*90,
                                    540
                                );


                        element.style.setProperty(
                            "--reveal-delay",
                            `${delay}ms`
                        );


                        element.dataset.motionDirection=
                            "assigned";


                        /*
                         * SKILLS
                         *
                         * All skill cards use the
                         * normal fade + upward reveal.
                         *
                         * Six cards per row.
                         *
                         * Row 1:
                         * 01 02 03 04 05 06
                         *
                         * Row 2:
                         * 07 08 09 10 11 12
                         *
                         * Row 3:
                         * 13 14 15 16 17 18
                         *
                         * Delay resets at the
                         * beginning of every row.
                         */

                        if(
                            element.matches(
                                ".skill-card"
                            )
                        ){

                            element.classList.remove(
                                "reveal-left",
                                "reveal-right",
                                "reveal-scale"
                            );


                            const skillCardsInSection=[
                                ...section.querySelectorAll(
                                    ".skill-card"
                                )
                            ];


                            const skillIndex=
                                skillCardsInSection.indexOf(
                                    element
                                );


                            const positionInRow=
                                skillIndex%6;


                            element.style.setProperty(
                                "--reveal-delay",
                                `${positionInRow*100}ms`
                            );

                        }


                        /*
                         * Other sections keep
                         * their original scale
                         * animation.
                         */

                        else if(
                            element.matches(
                                ".education-item,.project,.experience-card,.stack-group"
                            )
                        ){

                            element.classList.add(
                                "reveal-scale"
                            );

                        }


                        else if(
                            index%3===1
                        ){

                            element.classList.add(
                                "reveal-left"
                            );

                        }


                        else if(
                            index%3===2
                        ){

                            element.classList.add(
                                "reveal-right"
                            );

                        }

                    }

                }
            );

        }
    );


    /* =====================================================
       HOME CONTENT
    ===================================================== */

    const homeContent=
        document.querySelector(
            ".home-content"
        );


    if(homeContent){

        homeContent.classList.remove(
            "reveal",
            "reveal-delay",
            "reveal-left",
            "reveal-right",
            "reveal-scale",
            "visible"
        );


        const homeItems=
            homeContent.querySelectorAll(
                ".eyebrow,h1,.home-intro,.typing-line,.home-actions,.socials"
            );


        homeItems.forEach(
            (element,index)=>{

                element.classList.add(
                    "reveal"
                );


                element.style.setProperty(
                    "--reveal-delay",
                    `${index*120}ms`
                );


                element.dataset.motionDirection=
                    "home";


                if(index===1){

                    element.classList.add(
                        "reveal-left"
                    );

                }


                if(index===2){

                    element.classList.add(
                        "reveal-right"
                    );

                }


                if(index===3){

                    element.classList.add(
                        "reveal-scale"
                    );

                }

            }
        );

    }


    /* =====================================================
       HOME IMAGE
    ===================================================== */

    document
        .querySelectorAll(
            ".home-image-wrap"
        )
        .forEach(
            element=>{

                element.classList.add(
                    "reveal"
                );


                element.style.setProperty(
                    "--reveal-delay",
                    "280ms"
                );

            }
        );


    /* =====================================================
       SOCIAL ICONS
    ===================================================== */

    document
        .querySelectorAll(
            ".social-icons a"
        )
        .forEach(
            (icon,index)=>{

                icon.classList.add(
                    "reveal"
                );


                icon.style.setProperty(
                    "--reveal-delay",
                    `${500+index*120}ms`
                );

            }
        );


    /* =====================================================
       EXPERIENCE CARDS
    ===================================================== */

    document
        .querySelectorAll(
            ".experience-card"
        )
        .forEach(
            card=>{

                card.classList.remove(
                    "reveal-left",
                    "reveal-right"
                );


                card.classList.add(
                    card.classList.contains(
                        "experience-right"
                    )
                        ?"reveal-right"
                        :"reveal-left"
                );

            }
        );

}


prepareRevealAnimations();


/* =========================================================
   REVEAL OBSERVER
========================================================= */

const revealObserver=
    new IntersectionObserver(
        entries=>{

            entries.forEach(
                entry=>{

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "visible"
                        );

                    }else{

                        entry.target.classList.remove(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold:.12,
            rootMargin:
                "0px 0px -40px 0px"
        }
    );


document
    .querySelectorAll(
        ".reveal"
    )
    .forEach(
        element=>{

            revealObserver.observe(
                element
            );

        }
    );


/* =========================================================
   TYPEWRITER
========================================================= */

const typingTarget=
    document.querySelector(
        ".typing-text"
    );


const phrases=[
    "full-stack development",
    "backend development",
    "frontend development",
    "web development",
    "AI-powered solutions",
    "database management"
];


let phraseIndex=0;
let characterIndex=0;
let deleting=false;


function typeWriter(){

    if(!typingTarget){
        return;
    }


    const phrase=
        phrases[phraseIndex];


    if(!deleting){

        characterIndex++;


        typingTarget.textContent=
            phrase.substring(
                0,
                characterIndex
            );


        if(
            characterIndex>=
            phrase.length
        ){

            deleting=true;


            setTimeout(
                typeWriter,
                1400
            );


            return;
        }


        setTimeout(
            typeWriter,
            52
        );


        return;
    }


    characterIndex--;


    typingTarget.textContent=
        phrase.substring(
            0,
            characterIndex
        );


    if(
        characterIndex<=0
    ){

        deleting=false;


        phraseIndex=
            (phraseIndex+1)%
            phrases.length;


        setTimeout(
            typeWriter,
            320
        );


        return;
    }


    setTimeout(
        typeWriter,
        28
    );

}


typeWriter();


/* =========================================================
   TILT
========================================================= */

const tiltElements=[
    ...document.querySelectorAll(
        "[data-tilt],.project-image.tilt,.about-photo-frame.tilt"
    )
];


const tiltState=
    new WeakMap();


let gyroPermissionBound=false;
let gyroEnabled=false;


function setTilt(
    element,
    rotateX,
    rotateY
){

    const state=
        tiltState.get(
            element
        );


    if(!state){
        return;
    }


    state.targetX=
        rotateX;


    state.targetY=
        rotateY;


    if(!state.raf){

        state.raf=
            requestAnimationFrame(
                ()=>{

                    const nextX=
                        state.currentX+
                        (
                            state.targetX-
                            state.currentX
                        )*.18;


                    const nextY=
                        state.currentY+
                        (
                            state.targetY-
                            state.currentY
                        )*.18;


                    state.currentX=
                        nextX;


                    state.currentY=
                        nextY;


                    element.style.transform=
                        `perspective(1000px) rotateX(${nextX}deg) rotateY(${nextY}deg) translateY(-6px)`;


                    state.raf=
                        null;


                    if(
                        Math.abs(
                            state.targetX-
                            state.currentX
                        )>.03||
                        Math.abs(
                            state.targetY-
                            state.currentY
                        )>.03
                    ){

                        setTilt(
                            element,
                            state.targetX,
                            state.targetY
                        );

                    }

                }
            );

    }

}


function resetTilt(
    element
){

    const state=
        tiltState.get(
            element
        );


    if(!state){
        return;
    }


    state.targetX=0;
    state.targetY=0;


    setTilt(
        element,
        0,
        0
    );


    setTimeout(
        ()=>{

            if(
                Math.abs(
                    state.currentX
                )<.1&&
                Math.abs(
                    state.currentY
                )<.1
            ){

                element.style.transform=
                    "";

            }

        },
        220
    );

}


function initTilt(){

    if(
        !window.matchMedia(
            "(pointer:fine)"
        ).matches
    ){
        return;
    }


    tiltElements.forEach(
        element=>{

            if(
                tiltState.has(
                    element
                )
            ){
                return;
            }


            tiltState.set(
                element,
                {
                    currentX:0,
                    currentY:0,
                    targetX:0,
                    targetY:0,
                    raf:null
                }
            );


            element.addEventListener(
                "pointermove",
                event=>{

                    const rect=
                        element.getBoundingClientRect();


                    const x=
                        (
                            event.clientX-
                            rect.left
                        )/
                        rect.width;


                    const y=
                        (
                            event.clientY-
                            rect.top
                        )/
                        rect.height;


                    const rotateY=
                        (x-.5)*14;


                    const rotateX=
                        (.5-y)*14;


                    setTilt(
                        element,
                        rotateX,
                        rotateY
                    );

                }
            );


            element.addEventListener(
                "pointerleave",
                ()=>{
                    resetTilt(
                        element
                    );
                }
            );

        }
    );

}


initTilt();


/* =========================================================
   GYROSCOPE
========================================================= */

async function requestGyroPermission(){

    if(
        typeof DeviceOrientationEvent===
        "undefined"
    ){
        return false;
    }


    if(
        typeof DeviceOrientationEvent
            .requestPermission!=="function"
    ){
        return true;
    }


    try{

        return await DeviceOrientationEvent
            .requestPermission()==="granted";

    }catch{

        return false;

    }

}


async function enableGyroscope(){

    if(
        gyroEnabled||
        gyroPermissionBound
    ){
        return;
    }


    gyroPermissionBound=true;


    const granted=
        await requestGyroPermission();


    if(!granted){
        return;
    }


    gyroEnabled=true;


    window.addEventListener(
        "deviceorientation",
        event=>{

            if(
                !event.beta&&
                !event.gamma
            ){
                return;
            }


            const rotateX=
                Math.max(
                    -12,
                    Math.min(
                        12,
                        event.beta/6
                    )
                );


            const rotateY=
                Math.max(
                    -12,
                    Math.min(
                        12,
                        event.gamma/6
                    )
                );


            tiltElements.forEach(
                element=>{

                    setTilt(
                        element,
                        rotateX,
                        rotateY
                    );

                }
            );

        },
        {
            passive:true
        }
    );

}


tiltElements.forEach(
    element=>{

        element.addEventListener(
            "pointerdown",
            enableGyroscope,
            {
                once:true,
                passive:true
            }
        );


        element.addEventListener(
            "touchstart",
            enableGyroscope,
            {
                once:true,
                passive:true
            }
        );

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

if(
    cursorGlow&&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
){

    let cursorFrame=null;


    window.addEventListener(
        "pointermove",
        event=>{

            if(cursorFrame){
                return;
            }


            cursorFrame=
                requestAnimationFrame(
                    ()=>{

                        cursorGlow.style.left=
                            `${event.clientX}px`;


                        cursorGlow.style.top=
                            `${event.clientY}px`;


                        body.classList.add(
                            "cursor-active"
                        );


                        cursorFrame=null;

                    }
                );

        },
        {
            passive:true
        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

function initParticles(){

    if(
        !document.getElementById(
            "particles-js"
        )
    ){
        return;
    }


    if(
        typeof window.particlesJS!=="function"
    ){
        return;
    }


    if(
        window.pJSDom&&
        window.pJSDom.length
    ){
        return;
    }


    const dark=
        body.classList.contains(
            "dark-theme"
        );


    const color=
        dark
            ?" #ffffff".trim()
            :"#000000";


    particlesJS(
        "particles-js",
        {
            particles:{

                number:{
                    value:80,
                    density:{
                        enable:true,
                        value_area:800
                    }
                },

                color:{
                    value:color
                },

                shape:{
                    type:"circle",
                    stroke:{
                        width:0,
                        color:color
                    },
                    polygon:{
                        nb_sides:5
                    }
                },

                opacity:{
                    value:dark?.34:.5,
                    random:false,
                    anim:{
                        enable:false,
                        speed:1,
                        opacity_min:.1,
                        sync:false
                    }
                },

                size:{
                    value:5,
                    random:true,
                    anim:{
                        enable:false,
                        speed:40,
                        size_min:.1,
                        sync:false
                    }
                },

                line_linked:{
                    enable:true,
                    distance:150,
                    color:color,
                    opacity:dark?.22:.4,
                    width:1
                },

                move:{
                    enable:true,
                    speed:6,
                    direction:"none",
                    random:false,
                    straight:false,
                    out_mode:"out",
                    attract:{
                        enable:false,
                        rotateX:600,
                        rotateY:1200
                    }
                }

            },

            interactivity:{

                detect_on:"canvas",

                events:{
                    onhover:{
                        enable:true,
                        mode:"repulse"
                    },

                    onclick:{
                        enable:true,
                        mode:"push"
                    },

                    resize:true
                },

                modes:{

                    grab:{
                        distance:400,
                        line_linked:{
                            opacity:1
                        }
                    },

                    bubble:{
                        distance:400,
                        size:40,
                        duration:2,
                        opacity:8,
                        speed:3
                    },

                    repulse:{
                        distance:200
                    },

                    push:{
                        particles_nb:4
                    },

                    remove:{
                        particles_nb:2
                    }

                }

            },

            retina_detect:true
        }
    );

}


initParticles();


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm=
    document.getElementById(
        "contact-form"
    );


if(
    contactForm&&
    typeof emailjs!=="undefined"
){

    emailjs.init(
        "xRRsJdIa3AuD5w3Z8"
    );


    contactForm.addEventListener(
        "submit",
        event=>{

            event.preventDefault();


            const submitButton=
                contactForm.querySelector(
                    ".submit-button"
                );


            if(!submitButton){
                return;
            }


            const buttonText=
                submitButton.querySelector(
                    "span"
                );


            const buttonIcon=
                submitButton.querySelector(
                    "i"
                );


            const originalText=
                buttonText
                    ?buttonText.textContent
                    :"Send Message";


            const originalIcon=
                buttonIcon
                    ?buttonIcon.className
                    :"fa-solid fa-paper-plane";


            submitButton.disabled=true;


            if(buttonText){
                buttonText.textContent=
                    "Sending...";
            }


            if(buttonIcon){
                buttonIcon.className=
                    "fa-solid fa-spinner fa-spin";
            }


            const formData={

                name:
                    contactForm.elements.name.value,

                email:
                    contactForm.elements.email.value,

                phone:
                    contactForm.elements.phone.value,

                message:
                    contactForm.elements.message.value

            };


            emailjs.send(
                "service_6av6e3x",
                "template_s6w1vfd",
                formData
            )

            .then(
                response=>{

                    console.log(
                        "SUCCESS!",
                        response.status,
                        response.text
                    );


                    contactForm.reset();


                    if(buttonText){
                        buttonText.textContent=
                            "Message Sent";
                    }


                    if(buttonIcon){
                        buttonIcon.className=
                            "fa-solid fa-check";
                    }


                    setTimeout(
                        ()=>{

                            submitButton.disabled=
                                false;


                            if(buttonText){
                                buttonText.textContent=
                                    originalText;
                            }


                            if(buttonIcon){
                                buttonIcon.className=
                                    originalIcon;
                            }

                        },
                        2500
                    );

                }
            )

            .catch(
                error=>{

                    console.error(
                        "FAILED...",
                        error
                    );


                    if(buttonText){
                        buttonText.textContent=
                            "Try Again";
                    }


                    if(buttonIcon){
                        buttonIcon.className=
                            "fa-solid fa-rotate-right";
                    }


                    submitButton.disabled=
                        false;


                    alert(
                        "Failed to send message. Please try again or contact me directly."
                    );

                }
            );

        }
    );

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const year=
    document.getElementById(
        "year"
    );


if(year){

    year.textContent=
        new Date().getFullYear();

}


/* =========================================================
   TAB / FAVICON
========================================================= */

document.addEventListener(
    "visibilitychange",
    ()=>{

        const favicon=
            document.getElementById(
                "favicon"
            );


        if(
            document.visibilityState===
            "visible"
        ){

            document.title=
                "Portfolio | Thamimul Ansari";


            if(favicon){

                favicon.href=
                    "./assets/images/hero.png";

            }

        }else{

            document.title=
                "Come Back To Portfolio";


            if(favicon){

                favicon.href=
                    "./assets/images/skills/github.png";

            }

        }

    }
);