/* eslint-env browser */
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');
const iconList = Array.from(document.querySelectorAll('a[tabindex]'));

// Set initial state of menu
let showMenu = false;
let tabIndexSwitched = false;

const switchTabIndexes = () => {
  const lastTabIndex = iconList[iconList.length - 1].tabIndex;

  if (tabIndexSwitched) {
    // Reset the tab indexes
    navItems.forEach((item, idx) => {
      iconList[idx].tabIndex = 2 + idx;
      // eslint-disable-next-line no-param-reassign
      item.tabIndex = 1 + lastTabIndex + idx;
    });
  } else {
    // Set the tab index of the nav items
    navItems.forEach((item, idx) => {
      // Change the first n FA icons' tab indexes to be at the end
      iconList[idx].tabIndex = 1 + lastTabIndex + idx;
      // eslint-disable-next-line no-param-reassign
      item.tabIndex = 1 + menuBtn.tabIndex + idx;
    });
  }
  tabIndexSwitched = !tabIndexSwitched;
};

const toggleMenu = () => {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));
  }
  showMenu = !showMenu;
  switchTabIndexes();
};

menuBtn.addEventListener('click', toggleMenu);
menuBtn.addEventListener('focus', toggleMenu);

/**
 * @description Load a script (source: https://stackoverflow.com/a/950146/5893085)s
 * @param {string} url URL of the script to load
 * @param {Function} callback Callback to execute after it loaded
 */
const loadScript = (url, callback) => {
  // Adding the script tag to the head as suggested before
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
};

window.onload = () => {
  loadScript('js/vendor/accessibility.min.js', () => {
    new Accessibility();
  });
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') { // Dev
    loadScript('js/vendor/axe.min.js', () => {
      axe.run((err, results) => {
        if (err) throw err;
        if (results.violations.length === 0) console.info('No accessibility issues!');
        else results.violations.forEach(console.warn);
      });
    });
  }
};
