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
            chart: { type: 'bar', height: 75, sparkline: { enabled: true }, parentHeightOffset: 0,
                     animations: { enabled: true, easing: 'easeinout', speed: 800 } },
            plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
            colors: [getCssVar('--primary') || '#0b57d0'],
            tooltip: { theme: 'light', y: { formatter: val => val } },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
        };
        new ApexCharts(document.querySelector("#employeesChart"), empOptions).render();
    }

    // 2. Turnover Rate Chart (Stacked Bar)
    if (document.querySelector("#turnoverChart")) {
        const turnoverOptions = {
            series: [{ name: 'Joined', data: [40, 45, 35, 55] }, { name: 'Left', data: [10, 8, 25, 5] }],
            chart: { type: 'bar', height: 75, stacked: false, parentHeightOffset: 0, toolbar: { show: false } },
            grid: { show: false, padding: { top: 0, right: 0, bottom: -15, left: 0 } },
            plotOptions: { bar: { borderRadius: 2, columnWidth: '50%' } },
            colors: [getCssVar('--primary') || '#6366F1', '#F43F5E'],
            stroke: { width: 0 },
            xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'], labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
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
            chart: { type: 'area', height: 60, sparkline: { enabled: true }, parentHeightOffset: 0 },
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] } },
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
                window.location.href = 'employee-details.html';
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
});
