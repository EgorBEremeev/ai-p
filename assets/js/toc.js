(function () {
    'use strict';

    function slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function buildToc(headings, navEl) {
        navEl.innerHTML = '';
        headings.forEach(function (h) {
            var div = document.createElement('div');
            div.className = h.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            div.appendChild(a);
            navEl.appendChild(div);
        });
    }

    function init() {
        var article = document.querySelector('article');
        if (!article) return;

        var headings = Array.prototype.slice.call(article.querySelectorAll('h2, h3'));
        if (headings.length === 0) return;

        headings.forEach(function (h) {
            if (!h.id) {
                h.id = slugify(h.textContent);
            }
        });

        var tocNav = document.getElementById('toc-nav');
        var mobileTocNav = document.getElementById('mobile-toc-nav');

        if (tocNav) buildToc(headings, tocNav);
        if (mobileTocNav) buildToc(headings, mobileTocNav);

        // Scroll spy via IntersectionObserver
        var allTocLinks = [];
        [tocNav, mobileTocNav].forEach(function (nav) {
            if (nav) {
                allTocLinks = allTocLinks.concat(Array.prototype.slice.call(nav.querySelectorAll('a')));
            }
        });

        function clearActive() {
            [tocNav, mobileTocNav].forEach(function (nav) {
                if (!nav) return;
                nav.querySelectorAll('.toc-h2, .toc-h3').forEach(function (el) {
                    el.classList.remove('active', 'parent-active');
                });
            });
        }

        function setActive(headingId) {
            [tocNav, mobileTocNav].forEach(function (nav) {
                if (!nav) return;
                var items = Array.prototype.slice.call(nav.querySelectorAll('.toc-h2, .toc-h3'));
                var activeItem = null;
                items.forEach(function (item) {
                    var a = item.querySelector('a');
                    if (a && a.getAttribute('href') === '#' + headingId) {
                        item.classList.add('active');
                        activeItem = item;
                    }
                });
                // If active item is H3, find the preceding H2 and mark it parent-active
                if (activeItem && activeItem.classList.contains('toc-h3')) {
                    var prev = activeItem.previousElementSibling;
                    while (prev) {
                        if (prev.classList.contains('toc-h2')) {
                            prev.classList.add('parent-active');
                            break;
                        }
                        prev = prev.previousElementSibling;
                    }
                }
            });
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    clearActive();
                    setActive(entry.target.id);
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        });

        headings.forEach(function (h) {
            observer.observe(h);
        });

        // Click handlers: smooth scroll, collapse mobile TOC on click
        [tocNav, mobileTocNav].forEach(function (nav) {
            if (!nav) return;
            nav.addEventListener('click', function (e) {
                var a = e.target.closest('a');
                if (!a) return;
                e.preventDefault();
                var targetId = a.getAttribute('href').slice(1);
                var targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
                // Collapse mobile TOC
                var mobileTocNavEl = document.getElementById('mobile-toc-nav');
                var mobileToggle = document.getElementById('mobile-toc-toggle');
                if (mobileTocNavEl && mobileTocNavEl.classList.contains('open')) {
                    mobileTocNavEl.classList.remove('open');
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        var arrow = mobileToggle.querySelector('.mobile-toc-arrow');
                        if (arrow) arrow.textContent = '▶';
                    }
                }
            });
        });

        // Mobile toggle
        var mobileToggle = document.getElementById('mobile-toc-toggle');
        var mobileTocNavEl = document.getElementById('mobile-toc-nav');
        if (mobileToggle && mobileTocNavEl) {
            mobileToggle.addEventListener('click', function () {
                var expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', String(!expanded));
                mobileTocNavEl.classList.toggle('open');
                var arrow = mobileToggle.querySelector('.mobile-toc-arrow');
                if (arrow) arrow.textContent = expanded ? '▶' : '▼';
            });
        }

        // Wrap tables in scrollable containers (for mobile horizontal scroll)
        var contentArea = document.querySelector('.content-area');
        if (contentArea) {
            var tables = Array.prototype.slice.call(contentArea.querySelectorAll('table'));
            tables.forEach(function (table) {
                var wrapper = document.createElement('div');
                wrapper.className = 'table-scroll';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
                // Mark wide tables (>6 columns) as matrix tables for sticky first column
                var headerCells = table.querySelectorAll('thead th');
                if (!headerCells.length) {
                    headerCells = table.querySelectorAll('tr:first-child th, tr:first-child td');
                }
                if (headerCells.length > 6) {
                    table.classList.add('matrix-table');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
