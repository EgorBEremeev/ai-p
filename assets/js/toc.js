/* AI-P — Table of Contents: scroll spy + mobile toggle */
(function () {
    'use strict';

    var contentArea = document.querySelector('.content-area');
    if (!contentArea) return;

    var headings = contentArea.querySelectorAll('h2, h3');
    if (!headings.length) return;

    // Ensure every heading has an id (for linking)
    headings.forEach(function (h) {
        if (!h.id) {
            h.id = h.textContent
                .trim()
                .toLowerCase()
                .replace(/[^\w\u0400-\u04ff]+/g, '-')  // keep Cyrillic
                .replace(/^-+|-+$/g, '');
        }
    });

    // Build TOC items
    function buildTocItems(container) {
        headings.forEach(function (h) {
            var item = document.createElement('a');
            item.href = '#' + h.id;
            item.textContent = h.textContent;
            item.className = h.tagName === 'H2' ? 'toc-h2' : 'toc-h3';
            item.setAttribute('data-target', h.id);
            container.appendChild(item);
        });
    }

    // Desktop sidebar TOC
    var sidebarNav = document.querySelector('.sidebar-toc .toc-nav');
    if (sidebarNav) {
        buildTocItems(sidebarNav);
    }

    // Mobile TOC
    var mobileTocNav = document.querySelector('.mobile-toc-nav');
    if (mobileTocNav) {
        buildTocItems(mobileTocNav);
    }

    // Click handling: smooth scroll
    function handleTocClick(e) {
        var link = e.target.closest('a[data-target]');
        if (!link) return;
        e.preventDefault();
        var target = document.getElementById(link.getAttribute('data-target'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update URL hash without jump
            history.pushState(null, '', '#' + link.getAttribute('data-target'));
        }
    }

    if (sidebarNav) {
        sidebarNav.addEventListener('click', handleTocClick);
    }

    if (mobileTocNav) {
        mobileTocNav.addEventListener('click', function (e) {
            handleTocClick(e);
            // Collapse mobile TOC after click
            var toggle = document.querySelector('.mobile-toc-toggle');
            var nav = document.querySelector('.mobile-toc-nav');
            if (toggle && nav) {
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            }
        });
    }

    // Mobile TOC toggle
    var mobileToggle = document.querySelector('.mobile-toc-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            var nav = document.querySelector('.mobile-toc-nav');
            if (nav) {
                nav.classList.toggle('open');
            }
        });
    }

    // Scroll spy via IntersectionObserver
    // Observe headings entering top 20% of viewport
    var currentActive = null;

    function setActive(id) {
        if (currentActive === id) return;
        currentActive = id;

        // Clear all active states in sidebar
        if (sidebarNav) {
            sidebarNav.querySelectorAll('.active, .parent-active').forEach(function (el) {
                el.classList.remove('active', 'parent-active');
            });

            var activeItem = sidebarNav.querySelector('[data-target="' + id + '"]');
            if (activeItem) {
                activeItem.classList.add('active');

                // If H3 is active, mark parent H2 with parent-active
                if (activeItem.classList.contains('toc-h3')) {
                    var prev = activeItem.previousElementSibling;
                    while (prev) {
                        if (prev.classList.contains('toc-h2')) {
                            prev.classList.add('parent-active');
                            break;
                        }
                        prev = prev.previousElementSibling;
                    }
                }
            }
        }
    }

    // Track which headings are in the top portion of viewport
    var visibleHeadings = new Map();

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                visibleHeadings.set(entry.target.id, entry.target);
            } else {
                visibleHeadings.delete(entry.target.id);
            }
        });

        // Find the topmost visible heading
        if (visibleHeadings.size > 0) {
            var topmost = null;
            var topmostTop = Infinity;
            visibleHeadings.forEach(function (heading) {
                var rect = heading.getBoundingClientRect();
                if (rect.top < topmostTop) {
                    topmostTop = rect.top;
                    topmost = heading;
                }
            });
            if (topmost) {
                setActive(topmost.id);
            }
        }
    }, {
        // Trigger when heading is in top 20% of viewport
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
    });

    headings.forEach(function (h) {
        observer.observe(h);
    });
})();
