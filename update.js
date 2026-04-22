const fs = require('fs');
const path = require('path');

const dir = 'c:\\Workshop\\dev\\almoazaf-ui';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // determine active page based on file name
    let activePage = 'dashboard';
    if (file.includes('index') || file.includes('employee')) {
        activePage = 'employees';
    } else if (file.includes('team')) {
        activePage = 'teams';
    } else if (file.includes('asset')) {
        activePage = 'assets';
    } else if (file.includes('maintenance')) {
        activePage = 'maintenance';
    }

    // replace sidebar
    const asideRegex = /<!-- Sidebar -->\s*<aside class="sidebar">[\s\S]*?<\/aside>/i;
    let modified = false;
    if (asideRegex.test(html)) {
        html = html.replace(asideRegex, `<!-- Sidebar -->\n    <app-sidebar active-page="${activePage}"></app-sidebar>`);
        modified = true;
    }

    // fallback if <!-- Sidebar --> comment doesn't exist
    const strictAsideRegex = /<aside class="sidebar">[\s\S]*?<\/aside>/i;
    if (!modified && strictAsideRegex.test(html)) {
        html = html.replace(strictAsideRegex, `<app-sidebar active-page="${activePage}"></app-sidebar>`);
        modified = true;
    }

    // add script tag
    if (modified && !html.includes('sidebar.js')) {
        html = html.replace('</body>', '    <script src="sidebar.js"></script>\n</body>');
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Updated ' + file);
    }
});
