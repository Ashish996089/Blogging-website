// Menu & Navbar Toggle
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');
let searchIcon = document.querySelector('#search-icon');
let searchForm = document.querySelector('.search-form');
let scrollTopBtn = document.createElement('div');

// Menu click
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
};

// Search click
searchIcon.onclick = () => {
  searchIcon.classList.toggle('fa-times');
  searchForm.classList.toggle('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

// On scroll - close menus & trigger scroll effects
window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');

  // Sticky header shadow effect
  let header = document.querySelector('.header');
  header.classList.toggle('shadow', window.scrollY > 0);

  // Show/hide scroll-to-top button
  scrollTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';

  // Highlight active nav link
  document.querySelectorAll('section').forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

// Scroll-to-top Button
scrollTopBtn.id = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-angle-up"></i>';
scrollTopBtn.style.cssText = `
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  height: 4.5rem;
  width: 4.5rem;
  background: var(--orange);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 4.5rem;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1000;
  display: none;
  transition: all 0.3s ease;
`;
document.body.appendChild(scrollTopBtn);

scrollTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Contact Form Validation
let contactForm = document.querySelector('.contact form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    let inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
    let valid = true;

    inputs.forEach(input => {
      if(input.value.trim() === ''){
        input.style.border = '2px solid red';
        valid = false;
      } else {
        input.style.border = 'none';
      }
    });

    if(!valid){
      e.preventDefault();
      alert('Please fill in all required fields!');
    }
  });
}

// Optional: Dark Mode Toggle
let darkToggle = document.createElement('button');
darkToggle.innerHTML = '🌓';
darkToggle.style.cssText = `
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: var(--black);
  color: white;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  z-index: 1000;
  cursor: pointer;
`;
document.body.appendChild(darkToggle);

darkToggle.onclick = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
};

// Load theme on refresh
if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark-mode');
}

//for searching
let searchBox = document.querySelector('#search-box');
let posts = document.querySelectorAll('.posts-container .post');

searchBox.addEventListener('input', () => {
  let query = searchBox.value.toLowerCase();

  posts.forEach(post => {
    let title = post.querySelector('.title').innerText.toLowerCase();
    let text = post.querySelector('.text').innerText.toLowerCase();

    if (title.includes(query) || text.includes(query)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
});

//Create Post
const createBtn = document.querySelector('#create-post-btn');
const modal = document.querySelector('#create-post-modal');
const submitBtn = document.querySelector('#submit-post');
const cancelBtn = document.querySelector('#cancel-post');
const postsContainer = document.querySelector('.posts-container');

createBtn.onclick = () => {
  modal.style.display = 'flex';
};

cancelBtn.onclick = () => {
  modal.style.display = 'none';
};

submitBtn.onclick = () => {
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const imageInput = document.querySelector('#post-image');
  const imageFile = imageInput.files[0];

  if (!title || !content || !imageFile) {
    alert("Please fill all fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
      <img class="image" src="${e.target.result}" alt="Post Image">
      <div class="date">${new Date().toLocaleDateString()}</div>
      <div class="title">${title}</div>
      <div class="text">${content}</div>
    `;
    postsContainer.prepend(post);
  };
  reader.readAsDataURL(imageFile);

  // Reset form
  document.querySelector('#post-title').value = '';
  document.querySelector('#post-content').value = '';
  document.querySelector('#post-image').value = '';
  modal.style.display = 'none';
};
