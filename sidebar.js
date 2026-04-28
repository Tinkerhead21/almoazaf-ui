class AppSidebar extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active-page') || 'dashboard';
        const isAttendanceActive = activePage.startsWith('attendance');
        
        this.innerHTML = `
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo-icon">
                <i class="ph-fill ph-sparkle"></i>
            </div>
            <div class="logo-text">
                <h1>SereneHR</h1>
                <span>Enterprise Plan</span>
            </div>
        </div>

        <nav class="sidebar-nav">
            <a href="#" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                <i class="ph ph-squares-four"></i>
                <span>Dashboard</span>
            </a>
            <a href="index.html" class="nav-item ${activePage === 'employees' ? 'active' : ''}">
                <i class="ph ph-users"></i>
                <span>Employees</span>
            </a>
            <a href="teams.html" class="nav-item ${activePage === 'teams' ? 'active' : ''}">
                <i class="ph ph-users-three"></i>
                <span>Teams</span>
            </a>
            <a href="boards.html" class="nav-item ${activePage === 'boards' ? 'active' : ''}">
                <i class="ph ph-kanban"></i>
                <span>Boards</span>
            </a>
            
            <div class="nav-item-group ${isAttendanceActive ? 'open' : ''}">
                <div class="nav-item nav-item-parent ${isAttendanceActive ? 'active' : ''}" id="attendanceToggleBtn">
                    <i class="ph ph-calendar-check"></i>
                    <span>Attendance</span>
                    <i class="ph ph-caret-down dropdown-icon"></i>
                </div>
                <div class="sub-nav">
                    <a href="attendance-dashboard.html" class="sub-nav-item ${activePage === 'attendance-dashboard' ? 'active' : ''}">Dashboard</a>
                    <a href="attendance-requests.html" class="sub-nav-item ${activePage === 'attendance-requests' ? 'active' : ''}">Adjustments</a>
                    <a href="attendance-devices.html" class="sub-nav-item ${activePage === 'attendance-devices' ? 'active' : ''}">Devices & Recon</a>
                    <a href="attendance-policies.html" class="sub-nav-item ${activePage === 'attendance-policies' ? 'active' : ''}">Policies & Shifts</a>
                    <a href="attendance-audit.html" class="sub-nav-item ${activePage === 'attendance-audit' ? 'active' : ''}">Audit Logs</a>
                </div>
            </div>

            <a href="asset-management.html" class="nav-item ${activePage === 'assets' ? 'active' : ''}">
                <i class="ph ph-laptop"></i>
                <span>Assets</span>
            </a>
            <a href="maintenance.html" class="nav-item ${activePage === 'maintenance' ? 'active' : ''}">
                <i class="ph ph-wrench"></i>
                <span>Maintenance</span>
            </a>
        </nav>

        <div class="sidebar-footer">
            <div class="upgrade-card">
                <h3>Upgrade Plan</h3>
                <p>Unlock advanced analytics and global payroll features.</p>
                <button class="btn btn-primary btn-block">Upgrade Now</button>
            </div>

            <a href="#" class="nav-item secondary-nav">
                <i class="ph ph-question"></i>
                <span>Support</span>
            </a>
            <a href="#" class="nav-item secondary-nav">
                <i class="ph ph-sign-out"></i>
                <span>Logout</span>
            </a>
        </div>
    </aside>
        `;

        // Add event listener for sub-nav toggle
        const toggleBtn = this.querySelector('#attendanceToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleBtn.parentElement.classList.toggle('open');
            });
        }
    }
}

customElements.define('app-sidebar', AppSidebar);
