const navOptions = document.querySelectorAll('.header .main-nav>li>a');
const copyrightSpan = document.querySelector('footer .copyright');

if (navOptions) {
  navOptions.forEach((e) => {
    // if (window.scrollY < 1000) navOptions[0].classList.add('active')
    e.addEventListener('click', function () {
      navOptions.forEach((el) => {
        el.classList.remove('active');
      });
      e.classList.add('active');
    });
    if (e.classList.contains('active')) {
      // Handle logic for elements initially marked as active
    }
  });
}

socialIcons = document.querySelectorAll('.social-contact .icons i');
if (socialIcons) {
  socialIcons.forEach(e => {
    e.addEventListener('click', (event) => {
      // console.log(socialIcons[0].src)
    });
  })
}
const curYear = new Date();// get it from server, users can change it
const fullYear = curYear.getFullYear();

copyrightSpan.innerHTML = `Copyright  &#169 ${fullYear} All Rights Reserved.`