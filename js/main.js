/* eslint-env browser */
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set initial state of menu
let showMenu = false;

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
};

menuBtn.addEventListener('click', toggleMenu);

/* Fix the fucking portrait element that doesn't show up properly */
const fixPortrait = (sz = '400px', url = 'url("./img/portrait.jpg")') => {
  const portrait = document.querySelector('.menu-branding .portrait');
  portrait.style.backgroundImage = url;
  portrait.style.height = sz;
  portrait.style.width = sz;
  portrait.style.border = '3px solid #1aceee';
  portrait.style.borderRadius = '50%';
};

const checkPortrait = (sz = '400px', img = 'url("./img/portrait.jpg")') => {
  const portrait = document.querySelector('.menu-branding .portrait');
  const cpt = getComputedStyle(portrait);
  const lo = () => {
    console.log(`Portrait:
  bg: ${portrait.style.background}
  height: ${portrait.style.height}
  width: ${portrait.style.width}
  border: ${portrait.style.border}
  b-radius: ${portrait.style.borderRadius}`);
    console.log(`Computed:
  bg: ${cpt.background}
  height: ${cpt.height}
  width: ${cpt.width}
  border: ${cpt.border}
  b-radius: ${cpt.borderRadius}`);
  };
  if (cpt.height === '0px' || cpt.width === '0px' || cpt.backgroundImage === 'none') fixPortrait(sz, img);
  // console.log('After');
  lo();
};

// fixPortrait();
