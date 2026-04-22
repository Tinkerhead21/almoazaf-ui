// Main scripting logic for UI interactions

document.addEventListener('DOMContentLoaded', () => {

    // Analytics Toggle Functionality
    const toggleAnalyticsBtn = document.getElementById('toggleAnalyticsBtn');
    const analyticsGrid = document.getElementById('analyticsGrid');

    if (toggleAnalyticsBtn && analyticsGrid) {
        toggleAnalyticsBtn.addEventListener('click', () => {
            const isHidden = analyticsGrid.style.display === 'none';
            
            if (isHidden) {
                analyticsGrid.style.display = 'grid';
                toggleAnalyticsBtn.innerHTML = '<i class="ph ph-eye-slash"></i> Hide Analytics';
            } else {
                analyticsGrid.style.display = 'none';
                toggleAnalyticsBtn.innerHTML = '<i class="ph ph-eye"></i> Show Analytics';
            }
        });
    }

    // ApexCharts Initialization
    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    
    // 1. Total Employees Chart (Bar)
    if (document.querySelector("#employeesChart")) {
        const empOptions = {
            series: [{ name: 'Employees', data: [950, 1000, 1050, 1100, 1200, 1284] }],
            chart: { type: 'bar', height: 100, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
            plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
            colors: [getCssVar('--primary') || '#0b57d0'],
            grid: { show: false },
            yaxis: { show: false },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: 'var(--text-secondary)', fontSize: '10px' } }
            },
            tooltip: { theme: 'light', y: { formatter: val => val } }
        };
        new ApexCharts(document.querySelector("#employeesChart"), empOptions).render();
    }

    // 2. Turnover Rate Chart (Stacked Bar)
    if (document.querySelector("#turnoverChart")) {
        const turnoverOptions = {
            series: [{ name: 'Joined', data: [40, 45, 35, 55] }, { name: 'Left', data: [10, 8, 25, 5] }],
            chart: { type: 'bar', height: 100, stacked: false, parentHeightOffset: 0, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
            grid: { show: false },
            plotOptions: { bar: { borderRadius: 2, columnWidth: '50%' } },
            colors: [getCssVar('--primary') || '#6366F1', '#F43F5E'],
            stroke: { width: 0 },
            xaxis: { 
                categories: ['Q1', 'Q2', 'Q3', 'Q4'], 
                labels: { show: true, style: { colors: 'var(--text-secondary)', fontSize: '10px' } }, 
                axisBorder: { show: false }, 
                axisTicks: { show: false } 
            },
            yaxis: { show: false },
            dataLabels: { enabled: false },
            legend: { show: false },
            tooltip: { theme: 'light', shared: true, intersect: false }
        };
        new ApexCharts(document.querySelector("#turnoverChart"), turnoverOptions).render();
    }

    // 3. Retention Rate (Line/Area)
    if (document.querySelector("#retentionChart")) {
        const retentionOptions = {
            series: [{ name: 'Retention', data: [88, 89, 90, 89, 91, 92] }],
            chart: { type: 'area', height: 100, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] } },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: { 
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: true, style: { colors: 'var(--text-secondary)', fontSize: '10px' } }
            },
            colors: [getCssVar('--primary') || '#0b57d0'],
            tooltip: { theme: 'light', y: { formatter: val => val + "%" } }
        };
        new ApexCharts(document.querySelector("#retentionChart"), retentionOptions).render();
    }

    // 4. Employment Type (RadialBar)
    if (document.querySelector("#employmentChart")) {
        const employmentOptions = {
            series: [75, 15, 10],
            chart: { type: 'radialBar', height: 150, offsetX: 0, width: 150, parentHeightOffset: 0 },
            plotOptions: {
                radialBar: {
                    hollow: { size: '30%' },
                    track: { margin: 6, background: getCssVar('--border-subtle') || '#f1f3f4' },
                    dataLabels: {
                        name: { show: false },
                        value: { show: false }
                    }
                }
            },
            stroke: { lineCap: 'round' },
            labels: ['Full-time', 'Part-time', 'Outsource'],
            colors: ['#6366F1', '#A855F7', '#EC4899'],
            legend: { show: false },
            tooltip: { enabled: true, theme: 'light' }
        };
        new ApexCharts(document.querySelector("#employmentChart"), employmentOptions).render();
    }

    // Mock Pagination Click
    const pageButtons = document.querySelectorAll('.pagination .page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.classList.contains('disabled') || btn.querySelector('i')) return;
            // Remove active from all
            pageButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');
        });
    });

    // Table Row Navigation
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Prevent navigation if an action button is clicked
            if (!e.target.closest('button')) {
                if (row.getAttribute('onclick')) {
                    // Let inline onclick handle it
                    return;
                }
                const targetUrl = row.getAttribute('data-href') || 'employee-details.html';
                window.location.href = targetUrl;
            }
        });
    });

    // --- Employee Profile Nested Tabs Logic ---
    const dropdownToggles = document.querySelectorAll('.toggle-dropdown');
    
    // Toggle dropdown menus
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== toggle.dataset.dropdown) {
                    menu.classList.remove('show');
                }
            });
            
            const menu = document.getElementById(toggle.dataset.dropdown);
            if (menu) {
                menu.classList.toggle('show');
            }
        });
    });

    // Handle dropdown item selection
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const parentDropdown = item.closest('.tab-dropdown');
            const menu = item.closest('.dropdown-menu');
            const toggle = parentDropdown.querySelector('.toggle-dropdown');
            const selectedLabelObj = toggle.querySelector('.selected-label');
            const targetPaneId = item.dataset.target;
            
            // Remove active from all tabs
            document.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-dropdown').forEach(dropdown => dropdown.classList.remove('has-selection'));
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Show target pane
            if(targetPaneId) {
                const targetPane = document.getElementById(targetPaneId);
                if(targetPane) targetPane.classList.add('active');
            }

            // Add active styles to this dropdown
            toggle.classList.add('active');
            parentDropdown.classList.add('has-selection');
            
            // Set text
            selectedLabelObj.textContent = item.textContent;
            
            // Hide menu
            menu.classList.remove('show');
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    });

    // Make regular tabs remove dropdown active states
    document.querySelectorAll('.profile-tabs > .tab-link').forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Prevent if it's actually a dropdown toggle just to be safe
            if(tab.classList.contains('toggle-dropdown')) return;
            e.preventDefault();

            const targetPaneId = tab.dataset.target;

            document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-dropdown').forEach(dropdown => {
                dropdown.classList.remove('has-selection');
            });
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Show target pane
            if(targetPaneId) {
                const targetPane = document.getElementById(targetPaneId);
                if(targetPane) targetPane.classList.add('active');
            }

            tab.classList.add('active');
        });
    });

    // --- Theme Toggle Functionality ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateThemeIcons('light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcons('dark');
            }
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'ph ph-sun';
                btn.title = 'Switch to Light Mode';
            } else {
                icon.className = 'ph ph-moon';
                btn.title = 'Switch to Dark Mode';
            }
        });
    }

    // Export toggleTheme for global access (original mock support)
    window.toggleTheme = () => themeToggles[0]?.click();

    // --- Edit Profile Logic ---
    const editProfileBtn = document.getElementById('editProfileBtn');
    const tabsSection = document.querySelector('.grid-col-right');
    const editableFields = document.querySelectorAll('.editable-field');
    const profileCard = document.querySelector('.grid-col-left .profile-card');

    if (editProfileBtn && profileCard) {
        editProfileBtn.addEventListener('click', () => {
            const isEditing = profileCard.classList.contains('is-editing');
            
            if (isEditing) {
                // Save state
                profileCard.classList.remove('is-editing');
                if (tabsSection) {
                    tabsSection.style.opacity = '';
                    tabsSection.style.pointerEvents = '';
                    tabsSection.style.filter = '';
                }
                
                editProfileBtn.innerHTML = '<i class="ph ph-pencil-simple"></i> Edit Profile';
                editProfileBtn.classList.remove('btn-primary');
                editProfileBtn.classList.add('btn-outline');
                editProfileBtn.style.color = '';
                editProfileBtn.style.backgroundColor = '';
                editProfileBtn.style.borderColor = '';
                
                editableFields.forEach(field => {
                    field.removeAttribute('contenteditable');
                    field.removeAttribute('spellcheck');
                });
            } else {
                // Edit state
                profileCard.classList.add('is-editing');
                if (tabsSection) {
                    tabsSection.style.opacity = '0.4';
                    tabsSection.style.pointerEvents = 'none';
                    tabsSection.style.filter = 'grayscale(0.6)';
                    tabsSection.style.transition = 'all 0.3s ease';
                }
                
                editProfileBtn.innerHTML = '<i class="ph ph-check"></i> Save Profile';
                editProfileBtn.classList.remove('btn-outline');
                editProfileBtn.classList.add('btn-primary');
                
                editableFields.forEach(field => {
                    field.setAttribute('contenteditable', 'true');
                    field.setAttribute('spellcheck', 'false');
                });
                
                if (editableFields.length > 0) {
                    editableFields[0].focus();
                }
            }
        });
    }

    // --- Add Employee Modal Logic ---
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    
    if (addEmployeeBtn && addEmployeeModal) {
        // Open modal
        addEmployeeBtn.addEventListener('click', () => {
            addEmployeeModal.showModal();
        });
        
        // Close modal buttons
        const closeBtns = addEmployeeModal.querySelectorAll('.close-modal');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                addEmployeeModal.close();
            });
        });
        
        // Form submit override (just closes it for UI demo)
        const addEmployeeForm = document.getElementById('addEmployeeForm');
        if (addEmployeeForm) {
            addEmployeeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addEmployeeModal.close();
                addEmployeeForm.reset();
            });
        }
        
        // Close on outside click
        addEmployeeModal.addEventListener('click', (e) => {
            const dialogDimensions = addEmployeeModal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                addEmployeeModal.close();
            }
        });
    }

    // --- Modal Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.closest('.accordion-item');
                const isActive = item.classList.contains('active');
                
                // Close all other items in this accordion group
                const accordion = item.closest('.accordion');
                const allItems = accordion.querySelectorAll('.accordion-item');
                allItems.forEach(acc => {
                    acc.classList.remove('active');
                });
                
                // If it wasn't active initially, toggle it on
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- Global Row Context Menu Logic ---
    const contextMenuHtml = `
        <div id="globalContextMenu" class="context-menu" style="display: none; position: absolute; z-index: 1000; background: var(--surface-body); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); box-shadow: 0 8px 16px rgba(0,0,0,0.15); padding: 8px 0; min-width: 170px; pointer-events: auto;">
            <ul style="list-style: none; margin: 0; padding: 0;">
                <li class="ctx-menu-item" data-action="view" style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-primary); transition: background 0.15s ease;"><i class="ph ph-eye" style="font-size: 1rem; color: var(--text-secondary);"></i> View Details</li>
                <li class="ctx-menu-item" data-action="edit" style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-primary); transition: background 0.15s ease;"><i class="ph ph-pencil-simple" style="font-size: 1rem; color: var(--text-secondary);"></i> Quick Edit</li>
                <li class="ctx-menu-item" data-action="duplicate" style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-primary); transition: background 0.15s ease;"><i class="ph ph-copy" style="font-size: 1rem; color: var(--text-secondary);"></i> Duplicate Row</li>
                <li style="height: 1px; background: var(--border-subtle); margin: 6px 0;"></li>
                <li class="ctx-menu-item" data-action="delete" style="padding: 10px 16px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--status-danger-text); transition: background 0.15s ease;"><i class="ph ph-trash" style="font-size: 1rem;"></i> Delete Sequence</li>
            </ul>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', contextMenuHtml);

    const ctxMenu = document.getElementById('globalContextMenu');
    let currentTargetRow = null;

    // Hover simulation injection
    const ctxStyle = document.createElement('style');
    ctxStyle.innerHTML = `
        .ctx-menu-item:hover {
            background-color: var(--surface-background) !important;
        }
    `;
    document.head.appendChild(ctxStyle);

    document.addEventListener('contextmenu', (e) => {
        const tr = e.target.closest('.data-table tbody tr');
        if (tr) {
            e.preventDefault();
            currentTargetRow = tr;
            
            ctxMenu.style.display = 'block';
            
            // Layout Boundaries logic
            let x = e.pageX;
            let y = e.pageY;
            
            if (x + ctxMenu.offsetWidth > window.innerWidth) {
                x = window.innerWidth - ctxMenu.offsetWidth - 10;
            }
            if (y + ctxMenu.offsetHeight > window.innerHeight) {
                y = window.innerHeight - ctxMenu.offsetHeight - 10;
            }

            ctxMenu.style.left = x + 'px';
            ctxMenu.style.top = y + 'px';
        } else {
            ctxMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#globalContextMenu')) {
            if(ctxMenu) ctxMenu.style.display = 'none';
        }
    });

    // Handle Context Methods
    document.querySelectorAll('.ctx-menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            ctxMenu.style.display = 'none';
            
            if (!currentTargetRow) return;

            if (action === 'view') {
                const targetUrl = currentTargetRow.getAttribute('data-href');
                const onclickStr = currentTargetRow.getAttribute('onclick');
                if (targetUrl) {
                    window.location.href = targetUrl;
                } else if (onclickStr) {
                    const match = onclickStr.match(/window\.location\.href\s*=\s*'([^']+)'/);
                    if (match && match[1]) {
                        window.location.href = match[1];
                    }
                }
            } else if (action === 'edit') {
                alert('Triggering Quick Edit modal on target entity.');
            } else if (action === 'duplicate') {
                // Flash animation for clear duplication visibility
                const clone = currentTargetRow.cloneNode(true);
                clone.style.background = 'var(--surface-background)';
                clone.style.transition = 'background 1s ease';
                currentTargetRow.parentNode.insertBefore(clone, currentTargetRow.nextSibling);
                setTimeout(() => { clone.style.background = ''; }, 1000);
            } else if (action === 'delete') {
                currentTargetRow.style.transition = 'opacity 0.25s ease';
                currentTargetRow.style.opacity = '0';
                setTimeout(() => currentTargetRow.remove(), 250);
            }
            currentTargetRow = null;
        });
    });
});
