/* ======================================
   上海百鱼电子科技有限公司 · 主交互
   ====================================== */

(function () {
    'use strict';

    // ---------- 1. 动态年份 ----------
    function setYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    // ---------- 2. 导航栏滚动样式 ----------
    function initHeaderScroll() {
        const header = document.getElementById('siteHeader');
        if (!header) return;
        const update = () => {
            if (window.scrollY > 24) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    // ---------- 3. 数字滚动动画 ----------
    function animateNumber(el, target, duration) {
        duration = duration || 1800;
        const start = 0;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(start + (target - start) * eased);
            const span = el.querySelector('span');
            if (span) {
                span.textContent = value;
            } else {
                el.firstChild.textContent = value;
            }
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function initCounters() {
        const items = document.querySelectorAll('[data-count]');
        if (!items.length || !('IntersectionObserver' in window)) {
            items.forEach(el => {
                const span = el.querySelector('span');
                if (span) span.textContent = el.getAttribute('data-count');
            });
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
                    animateNumber(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.4 });
        items.forEach(el => observer.observe(el));
    }

    // ---------- 4. 滚动渐显 ----------
    function initReveal() {
        const items = document.querySelectorAll(
            '.service-card, .project-card, .partner-item, .qf-card, .contact-card, .stat-item, .about-points li, .section-head'
        );
        items.forEach(el => el.classList.add('reveal'));

        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('in'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        items.forEach(el => observer.observe(el));
    }

    // ---------- 5. Hamburger 菜单 ----------
    function initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const menu = document.getElementById('navMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            menu.classList.toggle('open');
        });

        // 点击菜单项后自动收起
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('open');
                menu.classList.remove('open');
            });
        });
    }

    // ---------- 6. 语言切换按钮 ----------
    function initLangSwitch() {
        const btn = document.getElementById('langSwitch');
        if (!btn) return;
        btn.addEventListener('click', () => {
            if (typeof window.toggleLanguage === 'function') {
                window.toggleLanguage();
            }
        });
    }

    // ---------- 7. 锚点平滑滚动（含 sticky header 偏移） ----------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id === '#' || id.length < 2) return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            });
        });
    }

    // ---------- Boot ----------
    function boot() {
        setYear();
        initHeaderScroll();
        initCounters();
        initReveal();
        initMobileMenu();
        initLangSwitch();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
