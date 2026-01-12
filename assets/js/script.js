(() => {
    "use strict";

    /* =========================
       Helper Functions
    ========================= */

    const $ = (el, all = false) =>
        all ? [...document.querySelectorAll(el)] : document.querySelector(el);

    const on = (type, el, handler, all = false) => {
        const elements = $(el, all);
        if (!elements) return;
        all
            ? elements.forEach((e) => e.addEventListener(type, handler))
            : elements.addEventListener(type, handler);
    };

    const scrollToEl = (el) => {
        const target = $(el);
        if (!target) return;
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    };

    /* =========================
       Navbar Active on Scroll
    ========================= */

    const navbarLinks = $("#navbar .scrollto", true);

    const setActiveNav = () => {
        const position = window.scrollY + 200;

        navbarLinks.forEach((link) => {
            if (!link.hash) return;
            const section = $(link.hash);
            if (!section) return;

            link.classList.toggle(
                "active",
                position >= section.offsetTop &&
                    position <= section.offsetTop + section.offsetHeight
            );
        });
    };

    window.addEventListener("load", setActiveNav);
    document.addEventListener("scroll", setActiveNav, { passive: true });

    /* =========================
       Preloader
    ========================= */

    window.addEventListener("load", () => {
        $("#preloader")?.remove();
    });

    /* =========================
       Mobile Nav Toggle
    ========================= */

    on("click", ".mobile-nav-toggle", function () {
        document.body.classList.toggle("mobile-nav-active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /* =========================
       ScrollTo Links
    ========================= */

    on(
        "click",
        ".scrollto",
        function (e) {
            if (!$(this.hash)) return;

            e.preventDefault();

            if (document.body.classList.contains("mobile-nav-active")) {
                document.body.classList.remove("mobile-nav-active");
                const toggle = $(".mobile-nav-toggle");
                toggle.classList.toggle("bi-list");
                toggle.classList.toggle("bi-x");
            }

            scrollToEl(this.hash);
        },
        true
    );

    window.addEventListener("load", () => {
        if (window.location.hash) scrollToEl(window.location.hash);
    });

    /* =========================
       Mobile Dropdown
    ========================= */

    $(".navbar .dropdown > a", true).forEach((link) => {
        link.addEventListener("click", function (e) {
            if (!document.body.classList.contains("mobile-nav-active")) return;

            e.preventDefault();
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("dropdown-active");

            const icon = this.querySelector(".dropdown-indicator");
            icon?.classList.toggle("bi-chevron-up");
            icon?.classList.toggle("bi-chevron-down");
        });
    });

    /* =========================
       Header Background Scroll
    ========================= */

    const header = $(".header");
    const toggleHeaderBg = () => {
        header.classList.toggle("scrolled", window.scrollY > header.offsetHeight);
    };

    document.addEventListener("scroll", toggleHeaderBg, { passive: true });

    /* =========================
       AOS Init
    ========================= */

    window.addEventListener("load", () => {
        AOS.init({
            duration: 300,
            easing: "ease-in-out",
            once: true,
        });
    });

    /* =========================
       ParticlesJS
    ========================= */

    particlesJS("particles-js", {
        particles: {
            number: { value: 50 },
            color: { value: "#60dfb0" },
            shape: { type: "circle" },
            opacity: { value: 0.4 },
            size: { value: 4, random: false },
            line_linked: {
                enable: true,
                distance: 120,
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
            },
        },
        interactivity: {
            events: {
                onmousemove: { enable: false },
                onclick: { enable: false },
                resize: true,
            },
        },
        retina_detect: false,
    });

    GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        zoomable: true,
    });
})();
