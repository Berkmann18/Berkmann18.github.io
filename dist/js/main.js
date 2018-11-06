/* eslint-env browser */
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set initial state of menu
const state = {
  onMenu: false,
  showMenu: false,
};

const toggleMenu = () => {
  if (!state.showMenu) {
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
  state.showMenu = !state.showMenu;
};

menuBtn.addEventListener('click', toggleMenu);
menuBtn.addEventListener('focus', () => {
  state.onMenu = true;
});
menu.addEventListener('blur', () => {
  state.onMenu = false;
});


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
    /* eslint-disable */
    new Accessibility();
    /* eslint-enable */
  });
  /* eslint-disable */
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  /* eslint-enable */
  if (isLocal) { // Dev
    loadScript('js/vendor/axe.min.js', () => {
      /* eslint-disable */
      axe.run((err, results) => {
        /* eslint-enable */
        if (err) throw err;
        if (results.violations.length === 0) console.info('No accessibility issues!');
        else results.violations.forEach(console.warn);
      });
    });
  }
};

document.onkeydown = (evt = window.event) => {
  let isEscape = false;
  let isEnter = false;

  if ('key' in evt) {
    isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
    isEnter = (evt.key === 'Enter');
  } else {
    isEscape = (evt.keyCode === 27);
    isEnter = (evt.keyCode === 13);
  }
  if (isEscape && state.showMenu) toggleMenu(); // Exit from menu
  if (isEnter && state.onMenu) toggleMenu(); // Enter the menu
};
