(function () {
    'use strict';

    // --- Navbar scroll ---
    var nav = document.getElementById('nav');
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile menu ---
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    });

    // --- Install tabs ---
    var installTabs = document.querySelectorAll('.install-tab');
    var installPanels = document.querySelectorAll('.install-panel');
    installTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = tab.getAttribute('data-target');
            installTabs.forEach(function (t) { t.classList.remove('active'); });
            installPanels.forEach(function (p) { p.classList.remove('active'); });
            tab.classList.add('active');
            document.getElementById('install-' + target).classList.add('active');
        });
    });

    // --- Copy to clipboard ---
    var copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var activePanel = document.querySelector('.install-panel.active');
            var text = activePanel ? activePanel.textContent.trim() : '';
            navigator.clipboard.writeText(text).then(function () {
                copyBtn.classList.add('copied');
                copyBtn.querySelector('span').textContent = 'Copied!';
                setTimeout(function () {
                    copyBtn.classList.remove('copied');
                    copyBtn.querySelector('span').textContent = 'Copy';
                }, 2000);
            });
        });
    }

    // --- Copyright year ---
    var yearEl = document.getElementById('copyright_year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Scroll fade-in ---
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });

})();
