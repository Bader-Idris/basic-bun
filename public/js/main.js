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


// login page
const form = document.querySelector('.main-form');
const submitButton = form.querySelector('.btn');
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('passwd').value;
  const rememberMe = document.getElementById('remember').checked;
  const data = {
    email: email,
    password: password,
    remember_me: rememberMe
  };
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      // Handle response
      console.log(response);
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      // Handle JSON data
      console.log(data);
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
});
// login page

/*
- views/
- tsconfig.json
- src/
  - routes/
    - mongodb.js
    - postgresql.js
    - redis.js
  - controllers/
    - mongodbController.js
    - postgresqlController.js
    - redisController.js
  - models/
    - mongodb/
      - userModel.js
      - ...
    - postgresql/
      - userModel.js
      - ...
    - redis/
      - cacheModel.js
      - ...
  - middleware/
    - authentication.js
    - ...
  - config/
    - database.js
    - redis.js
    - ...
  - ...
- public/
- package-lock.json
- package.json
- node_modules/
- Dockerfile
- dist/
- bin/
- b.yml
- a.yml
- README.md
- redis/
- bun.lockb*
*/