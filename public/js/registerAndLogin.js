// brought with the form from codepen.io
// Get all form elements
let formElements = document.querySelectorAll('.form input, .form textarea');

// Attach event listeners to form elements
formElements.forEach(function (element) {
  element.addEventListener('keyup', handleEvent);
  element.addEventListener('blur', handleEvent);
  element.addEventListener('focus', handleEvent);
});

function handleEvent(e) {
  let thisElement = e.target;
  let label = thisElement.previousElementSibling;

  if (e.type === 'keyup') {
    if (thisElement.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.add('active', 'highlight');
    }
  } else if (e.type === 'blur') {
    if (thisElement.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.remove('highlight');
    }
  } else if (e.type === 'focus') {
    if (thisElement.value === '') {
      label.classList.remove('highlight');
    } else if (thisElement.value !== '') {
      label.classList.add('highlight');
    }
  }
}

// Get all tab links
let tabLinks = document.querySelectorAll('.tab a');

// Attach event listener to tab links
tabLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    let parent = this.parentNode;
    parent.classList.add('active');
    let siblings = parent.parentNode.children;
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] !== parent) {
        siblings[i].classList.remove('active');
      }
    }
    let target = this.getAttribute('href');
    let tabContents = document.querySelectorAll('.tab-content > div');
    tabContents.forEach(function (content) {
      if (content !== document.querySelector(target)) {
        content.style.display = 'none';
      }
    });
    document.querySelector(target).style.display = 'block';
  });
});
// -------------------------------------


// mine 🔽
document.querySelector('#signup form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Serialize form data manually
  const firstName = document.querySelector('input[name="fName"]').value;
  const lastName = document.querySelector('input[name="lName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  const data = {
    fName: firstName,
    lName: lastName,
    email: email,
    password: password
  };

  // Send request via fetch
  fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
});

// login form
document.querySelector('#login form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Serialize form data manually
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const rememberMe = document.querySelector('input[name="remember_me"]').checked;
  const data = {
    email: email,
    password: password,
    remember_me: rememberMe
  };
  // Send request via fetch
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
});

/* 

{
  "email":"www.bader.com9@gmail.com", or any vaild email
  "password":"iLoveHanady", or any string
  "remember_me": true/false as boolean
}

*/