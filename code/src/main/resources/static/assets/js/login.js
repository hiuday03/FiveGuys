// document.addEventListener("DOMContentLoaded", function () {
//     const container = document.getElementById('container');
//     const registerBtn = document.getElementById('register');
//     const loginBtn = document.getElementById('login');

//     const loginPanel = document.querySelector('.toggle-panel.toggle-left');
//     const registerPanel = document.querySelector('.toggle-panel.toggle-right');

//     loginBtn.addEventListener('click', () => {
//         loginPanel.classList.add("active");
//         registerPanel.classList.remove("active");
//     });

//     registerBtn.addEventListener('click', () => {
//         loginPanel.classList.remove("active");
//         registerPanel.classList.add("active");
//     });
// });

const container = document.getElementById('container');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});