// Toggle Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Toggle Auth Panels (Login/Signup)
function toggleAuthPanel(panelId) {
  document.querySelectorAll('.auth-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const panel = document.getElementById(panelId + '-panel');
  if (panel) {
    panel.classList.add('active');
  }
}

// Dashboard Tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab-active'));
    tab.classList.add('tab-active');
  });
});
