class AppSidebar extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active-page') || 'dashboard';
        
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
    }
}

customElements.define('app-sidebar', AppSidebar);
