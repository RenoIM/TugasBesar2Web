// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Form Submission Handler (with basic validation)
const form = document.getElementById("contact-form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    if (name && email && message) {
        alert("Pesan terkirim! Terima kasih atas partisipasinya.");
        form.reset(); // Reset form
    } else {
        alert("Mohon isi semua kolom sebelum mengirim.");
    }
});

// script.js

// DOM Elements
const userNameElement = document.querySelector('.user-name');
const articlesList = document.getElementById('articles-list');
const addArticleBtn = document.getElementById('add-article-btn');
const modal = document.getElementById('article-editor-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const articleForm = document.getElementById('article-form');
const articleTitleInput = document.getElementById('article-title');
const articleContentInput = document.getElementById('article-content');

// Load User Name and Articles
window.onload = () => {
    const userName = localStorage.getItem('userName') || 'Guest';
    userNameElement.textContent = userName;

    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    renderArticles(articles);
};

// Render Articles
function renderArticles(articles) {
    articlesList.innerHTML = articles.length
        ? articles.map((article, index) =>
            `<div class="article-item" data-index="${index}">
                <h3>${article.title}</h3>
            </div>`).join('')
        : '<p>No articles yet. Click the "+" button to create one.</p>';

    document.querySelectorAll('.article-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const index = item.getAttribute('data-index');
            editArticle(index);
        });
    });
}

// Open Modal
addArticleBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    clearForm();
});

// Save Article
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const newArticle = {
        title: articleTitleInput.value,
        content: articleContentInput.value
    };

    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));
    renderArticles(articles);

    modal.classList.add('hidden');
    clearForm();
});

// Edit Article
function editArticle(index) {
    const articles = JSON.parse(localStorage.getItem('articles'));
    const article = articles[index];
    articleTitleInput.value = article.title;
    articleContentInput.value = article.content;

    modal.classList.remove('hidden');

    articleForm.onsubmit = (e) => {
        e.preventDefault();
        article.title = articleTitleInput.value;
        article.content = articleContentInput.value;

        articles[index] = article;
        localStorage.setItem('articles', JSON.stringify(articles));
        renderArticles(articles);

        modal.classList.add('hidden');
        clearForm();
        articleForm.onsubmit = null; // Reset form submit behavior
    };
}

// Clear Form
function clearForm() {
    articleTitleInput.value = '';
    articleContentInput.value = '';
}
