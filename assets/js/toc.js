(function () {
    'use strict';

    function toArray(list) {
        return Array.prototype.slice.call(list || []);
    }

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
        headings.forEach(function (heading) {
            var item = document.createElement('div');
            item.className = heading.tagName === 'H2' ? 'toc-h2' : 'toc-h3';

            var link = document.createElement('a');
            link.href = '#' + heading.id;
            link.textContent = heading.textContent;

            item.appendChild(link);
            navEl.appendChild(item);
        });
    }

    function isDesktopViewport() {
        return window.matchMedia('(min-width: 769px)').matches;
    }

    function getHeaderRow(table) {
        if (table.tHead && table.tHead.rows.length) {
            return table.tHead.rows[0];
        }

        if (!table.rows.length) {
            return null;
        }

        return table.rows[0];
    }

    function getHeaderCells(table) {
        var headerRow = getHeaderRow(table);
        return headerRow ? toArray(headerRow.cells) : [];
    }

    function normalizeTable(table) {
        getHeaderCells(table).forEach(function (cell) {
            cell.style.position = '';
            cell.style.top = '';
            cell.style.left = '';
            cell.style.transform = '';
            cell.style.zIndex = '';
            cell.style.boxShadow = '';
            cell.style.willChange = '';
            cell.style.width = '';
        });

        var parent = table.parentNode;
        var frame = null;

        if (parent && parent.classList && parent.classList.contains('table-scroll')) {
            frame = parent.parentNode;
            if (frame && frame.classList && frame.classList.contains('table-frame')) {
                frame.parentNode.insertBefore(table, frame);
                frame.parentNode.removeChild(frame);
            } else {
                parent.parentNode.insertBefore(table, parent);
                parent.parentNode.removeChild(parent);
            }
        }

        table.classList.remove('matrix-table', 'table-sticky', 'table-sticky-source');
    }

    function wrapTable(table, isMatrix) {
        var wrapper = document.createElement('div');
        wrapper.className = 'table-scroll';

        if (isMatrix) {
            wrapper.classList.add('has-matrix');
        }

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        return wrapper;
    }

    function createStickyClone(table, wrapper, isMatrix) {
        if (!table.tHead || !table.tHead.rows.length) {
            return null;
        }

        var frame = document.createElement('div');
        frame.className = 'table-frame';
        if (isMatrix) {
            frame.classList.add('has-matrix');
        }

        wrapper.parentNode.insertBefore(frame, wrapper);
        frame.appendChild(wrapper);

        var shell = document.createElement('div');
        shell.className = 'table-sticky-shell';
        shell.setAttribute('aria-hidden', 'true');

        var viewport = document.createElement('div');
        viewport.className = 'table-sticky-viewport';

        var cloneTable = document.createElement('table');
        cloneTable.className = (table.className + ' table-sticky-clone')
            .replace(/\s+/g, ' ')
            .replace(/^\s+|\s+$/g, '');
        cloneTable.appendChild(table.tHead.cloneNode(true));

        viewport.appendChild(cloneTable);
        shell.appendChild(viewport);
        frame.insertBefore(shell, wrapper);

        table.classList.add('table-sticky-source');

        wrapper.addEventListener('scroll', function () {
            viewport.scrollLeft = wrapper.scrollLeft;
        }, { passive: true });

        function syncWidths() {
            var sourceRows = toArray(table.tHead.rows);
            var cloneRows = cloneTable.tHead ? toArray(cloneTable.tHead.rows) : [];

            cloneTable.style.width = Math.ceil(table.getBoundingClientRect().width) + 'px';

            sourceRows.forEach(function (sourceRow, rowIndex) {
                var cloneRow = cloneRows[rowIndex];
                if (!cloneRow) {
                    return;
                }

                var sourceCells = toArray(sourceRow.cells);
                var cloneCells = toArray(cloneRow.cells);

                sourceCells.forEach(function (sourceCell, cellIndex) {
                    var cloneCell = cloneCells[cellIndex];
                    if (!cloneCell) {
                        return;
                    }

                    cloneCell.style.width = Math.ceil(sourceCell.getBoundingClientRect().width) + 'px';
                });
            });

            frame.style.setProperty(
                '--table-sticky-height',
                Math.ceil(table.tHead.getBoundingClientRect().height) + 'px'
            );
            viewport.scrollLeft = wrapper.scrollLeft;
        }

        return {
            sync: syncWidths
        };
    }

    function updateStickyTopVar(contentArea) {
        var stickyTop = 0;

        if (isDesktopViewport()) {
            if (contentArea) {
                stickyTop = -Math.round(parseFloat(window.getComputedStyle(contentArea).paddingTop) || 0);
            }
        } else {
            var nav = document.querySelector('.site-nav');
            if (nav) {
                stickyTop = Math.max(0, Math.floor(nav.getBoundingClientRect().bottom));
            }
        }

        document.documentElement.style.setProperty('--table-sticky-top', stickyTop + 'px');
        return stickyTop;
    }

    function needsHorizontalWrapper(table, contentArea) {
        var containerWidth = contentArea ? contentArea.clientWidth : window.innerWidth;
        return table.getBoundingClientRect().width > containerWidth + 1;
    }

    function initToc(article, contentArea) {
        var headings = toArray(article.querySelectorAll('h2, h3'));
        if (!headings.length) {
            return;
        }

        headings.forEach(function (heading) {
            if (!heading.id) {
                heading.id = slugify(heading.textContent);
            }
        });

        var tocNav = document.getElementById('toc-nav');
        var mobileTocNav = document.getElementById('mobile-toc-nav');

        if (tocNav) {
            buildToc(headings, tocNav);
        }
        if (mobileTocNav) {
            buildToc(headings, mobileTocNav);
        }

        function clearActive() {
            [tocNav, mobileTocNav].forEach(function (nav) {
                if (!nav) {
                    return;
                }

                toArray(nav.querySelectorAll('.toc-h2, .toc-h3')).forEach(function (item) {
                    item.classList.remove('active', 'parent-active');
                });
            });
        }

        function setActive(headingId) {
            [tocNav, mobileTocNav].forEach(function (nav) {
                if (!nav) {
                    return;
                }

                var items = toArray(nav.querySelectorAll('.toc-h2, .toc-h3'));
                var activeItem = null;

                items.forEach(function (item) {
                    var link = item.querySelector('a');
                    if (link && link.getAttribute('href') === '#' + headingId) {
                        item.classList.add('active');
                        activeItem = item;
                    }
                });

                if (activeItem && activeItem.classList.contains('toc-h3')) {
                    var previous = activeItem.previousElementSibling;
                    while (previous) {
                        if (previous.classList.contains('toc-h2')) {
                            previous.classList.add('parent-active');
                            break;
                        }
                        previous = previous.previousElementSibling;
                    }
                }
            });
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                clearActive();
                setActive(entry.target.id);
            });
        }, {
            root: isDesktopViewport() ? contentArea : null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        });

        headings.forEach(function (heading) {
            observer.observe(heading);
        });

        var mobileToggle = document.getElementById('mobile-toc-toggle');
        var mobileTocNavEl = document.getElementById('mobile-toc-nav');

        [tocNav, mobileTocNav].forEach(function (nav) {
            if (!nav) {
                return;
            }

            nav.addEventListener('click', function (event) {
                var link = event.target.closest('a');
                if (!link) {
                    return;
                }

                event.preventDefault();

                var targetId = link.getAttribute('href').slice(1);
                var targetEl = document.getElementById(targetId);
                var desktop = isDesktopViewport();

                if (targetEl) {
                    if (desktop && contentArea) {
                        var targetTop = targetEl.getBoundingClientRect().top
                            - contentArea.getBoundingClientRect().top
                            + contentArea.scrollTop;
                        contentArea.scrollTo({ top: targetTop, behavior: 'smooth' });
                    } else {
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                if (mobileTocNavEl && mobileTocNavEl.classList.contains('open')) {
                    mobileTocNavEl.classList.remove('open');
                    if (mobileToggle) {
                        mobileToggle.setAttribute('aria-expanded', 'false');
                        var arrow = mobileToggle.querySelector('.mobile-toc-arrow');
                        if (arrow) {
                            arrow.textContent = '\u25B6';
                        }
                    }
                }
            });
        });

        if (mobileToggle && mobileTocNavEl) {
            mobileToggle.addEventListener('click', function () {
                var expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', String(!expanded));
                mobileTocNavEl.classList.toggle('open');

                var arrow = mobileToggle.querySelector('.mobile-toc-arrow');
                if (arrow) {
                    arrow.textContent = expanded ? '\u25B6' : '\u25BE';
                }
            });
        }
    }

    function initTables(contentArea) {
        if (!contentArea) {
            return;
        }

        var tables = toArray(contentArea.querySelectorAll('table'));
        if (!tables.length) {
            return;
        }

        function syncTables() {
            var desktop = isDesktopViewport();
            var stickyTop = updateStickyTopVar(contentArea);
            var availableHeight = desktop
                ? contentArea.clientHeight
                : Math.max(0, window.innerHeight - stickyTop);

            tables.forEach(function (table) {
                normalizeTable(table);
            });

            var stickyClones = [];

            tables.forEach(function (table) {
                var headerCells = getHeaderCells(table);
                if (!headerCells.length) {
                    return;
                }

                var isMatrix = headerCells.length > 6;
                if (isMatrix) {
                    table.classList.add('matrix-table');
                }

                if (table.getBoundingClientRect().height > availableHeight) {
                    table.classList.add('table-sticky');
                }

                if (desktop) {
                    return;
                }

                var needsWrap = needsHorizontalWrapper(table, contentArea);
                if (!needsWrap) {
                    return;
                }

                var wrapper = wrapTable(table, isMatrix);
                if (!table.classList.contains('table-sticky')) {
                    return;
                }

                var stickyClone = createStickyClone(table, wrapper, isMatrix);
                if (stickyClone) {
                    stickyClones.push(stickyClone);
                }
            });

            stickyClones.forEach(function (stickyClone) {
                stickyClone.sync();
            });
        }

        var syncScheduled = false;
        function scheduleTableSync() {
            if (syncScheduled) {
                return;
            }

            syncScheduled = true;
            window.requestAnimationFrame(function () {
                syncScheduled = false;
                syncTables();
            });
        }

        window.addEventListener('resize', scheduleTableSync);
        window.addEventListener('orientationchange', scheduleTableSync);
        window.addEventListener('load', scheduleTableSync);

        if (window.ResizeObserver) {
            var resizeObserver = new ResizeObserver(scheduleTableSync);
            resizeObserver.observe(contentArea);

            var nav = document.querySelector('.site-nav');
            if (nav) {
                resizeObserver.observe(nav);
            }
        }

        scheduleTableSync();
    }

    function init() {
        var article = document.querySelector('article');
        if (!article) {
            return;
        }

        var contentArea = document.querySelector('.content-area');

        initToc(article, contentArea);
        initTables(contentArea);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
