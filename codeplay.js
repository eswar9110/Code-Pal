// script.js
const languages = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++'];

// Dynamically add languages to the navbar
const languageList = document.getElementById('language-list');
languages.forEach(language => {
    const li = document.createElement('li');
    li.textContent = language;
    li.addEventListener('click', () => selectLanguage(language));
    languageList.appendChild(li);
});

// Code editor and output
const codeEditor = document.getElementById('code-editor');
const output = document.getElementById('output');

// Placeholder function to handle code execution
document.getElementById('run-code').addEventListener('click', () => {
    const code = codeEditor.value;
    if (selectedLanguage === 'JavaScript') {
        try {
            output.textContent = eval(code);
        } catch (error) {
            output.textContent = error;
        }
    } else {
        output.textContent = `Execution not supported for ${selectedLanguage} yet.`;
    }
});

let selectedLanguage = 'JavaScript'; // Default language
function selectLanguage(language) {
    selectedLanguage = language;
    codeEditor.value = `// Start coding in ${language}`;
    output.textContent = '';
}



function subscribe() {
    const email = document.getElementById('email').value;
    const isAgeConfirmed = document.getElementById('age-confirmation').checked;
  
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!isAgeConfirmed) {
      alert('Please confirm that you are at least 18 years old.');
      return;
    }
  
    alert(`Thank you for subscribing, ${email}!`);
  }
  