// document.addEventListener('DOMContentLoaded', () => {
//   const openButton = document.getElementById('openButton');
//   const mainMenu = document.getElementById('mainMenu');
//   const navOverlay = document.querySelector('.header__nav-overlay');
//   const body = document.body;
//   const header = document.querySelector('.header'); // Get the header element

//   // Function to open the mobile/tablet menu
//   function openMenu() {
//     mainMenu.classList.add('is-active');
//     navOverlay.classList.add('is-active');
//     openButton.setAttribute('aria-expanded', 'true');
//     body.classList.add('no-scroll'); // Prevent scrolling on the body
//   }

//   // Function to close the mobile/tablet menu
//   function closeMenu() {
//     mainMenu.classList.remove('is-active');
//     navOverlay.classList.remove('is-active');
//     openButton.setAttribute('aria-expanded', 'false');
//     body.classList.remove('no-scroll'); // Re-enable scrolling on the body
//   }

//   // Event listener for the hamburger menu button
//   openButton.addEventListener('click', () => {
//     if (mainMenu.classList.contains('is-active')) {
//       closeMenu();
//     } else {
//       openMenu();
//     }
//   });

//   // Event listener for the overlay to close the menu when clicked outside
//   navOverlay.addEventListener('click', () => {
//     closeMenu();
//   });

//   // Optional: Close the menu when a link inside the mobile menu is clicked
//   const mobileMenuLinks = mainMenu.querySelectorAll(
//     '.header__mobile-menu-content a'
//   );
//   mobileMenuLinks.forEach((link) => {
//     link.addEventListener('click', () => {
//       closeMenu();
//     });
//   });

//   // Close menu with Escape key for accessibility
//   document.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape' && mainMenu.classList.contains('is-active')) {
//       closeMenu();
//     }
//   });

//   // Handle window resizing: Close menu if it's open and desktop view is restored

//   let desktopMediaQuery = window.matchMedia('(min-width: 1100px)');

//   function handleDesktopChange(e) {
//     if (e.matches && mainMenu.classList.contains('is-active')) {
//       closeMenu();
//     }
//     // Also, adjust the top position of the mobile menu dynamically based on header height
//     // This is important because header height can change based on screen size (e.g., tablet vs mobile)
//     if (!e.matches) {
//       // Only apply this if we are not in desktop view
//       const headerHeight = header.offsetHeight;
//       mainMenu.style.top = `${headerHeight}px`;
//       mainMenu.style.height = `calc(50vh - ${headerHeight}px)`;
//     } else {
//       mainMenu.style.top = ''; // Reset for desktop
//       mainMenu.style.height = ''; // Reset for desktop
//     }
//   }

//   desktopMediaQuery.addEventListener('change', handleDesktopChange);
//   // Initial check on load
//   handleDesktopChange(desktopMediaQuery);
// });

document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('openButton');
  const mainMenu = document.getElementById('mainMenu');
  const navOverlay = document.querySelector('.header__nav-overlay');
  const body = document.body;

  // Function to open the mobile/tablet menu
  function openMenu() {
    mainMenu.classList.add('is-active');
    navOverlay.classList.add('is-active');
    openButton.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll'); // Prevent scrolling on the body
  }

  // Function to close the mobile/tablet menu
  function closeMenu() {
    mainMenu.classList.remove('is-active');
    navOverlay.classList.remove('is-active');
    openButton.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll'); // Re-enable scrolling on the body
  }

  // Event listener for the hamburger menu button
  openButton.addEventListener('click', () => {
    if (mainMenu.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Event listener for the overlay to close the menu when clicked outside
  navOverlay.addEventListener('click', () => {
    closeMenu();
  });

  // Optional: Close the menu when a link inside the mobile menu is clicked
  // This targets all 'a' tags within the mobile menu content
  const mobileMenuLinks = mainMenu.querySelectorAll(
    '.header__mobile-menu-content a'
  );
  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu with Escape key for accessibility
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainMenu.classList.contains('is-active')) {
      closeMenu();
    }
  });

  // Handle window resizing: Close menu if it's open and desktop view is restored

  let desktopMediaQuery = window.matchMedia('(min-width: 1100px)');

  function handleDesktopChange(e) {
    if (e.matches && mainMenu.classList.contains('is-active')) {
      closeMenu();
    }
  }

  desktopMediaQuery.addEventListener('change', handleDesktopChange);
  // Initial check on load
  handleDesktopChange(desktopMediaQuery);
});
