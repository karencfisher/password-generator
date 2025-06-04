// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const textInput = document.getElementById('textInput');
    const secretKeyInput = document.getElementById('secretKeyInput');
    const encodeButton = document.getElementById('encodeButton');
    const makePasswordButton = document.getElementById('makePasswordButton');
    const passwordOutput = document.getElementById('passwordOutput');

    // Function to select text in a div element
    function selectText(element) {
        if (window.getSelection && document.createRange) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    // Function to encode text using SHA256 and Base64 (equivalent to Python's encode method)
    function encode(text) {
        // Convert text to UTF-8 bytes and hash with SHA256
        const hash = CryptoJS.SHA256(text);
        // Convert hash to Base64 and take first 20 characters
        const base64Hash = CryptoJS.enc.Base64.stringify(hash);
        return base64Hash.substring(0, 20);
    }

    // Function to encode the secret key (equivalent to Python's make_key method)
    function encodeSecretKey() {
        const secretKey = secretKeyInput.value;
        if (secretKey.trim() === '') {
            alert('Please enter a secret key first.');
            return;
        }
        
        const encodedKey = encode(secretKey);
        secretKeyInput.value = encodedKey;
    }

    // Function to make password (equivalent to Python's make_password method)
    function makePassword() {
        const text = textInput.value;
        const secretKey = secretKeyInput.value;
        
        if (text.trim() === '' || secretKey.trim() === '') {
            alert('Please enter both text and secret key.');
            return;
        }
        
        // Clear previous password
        passwordOutput.textContent = '';
        
        // Combine text and secret key (equivalent to Python's concatenation)
        const combinedText = text + secretKey;
        const password = encode(combinedText);
        
        // Display the generated password
        passwordOutput.textContent = password;
        
        // Select the password text for easy copying
        selectText(passwordOutput);
    }

    // Add event listeners to buttons
    encodeButton.addEventListener('click', encodeSecretKey);
    makePasswordButton.addEventListener('click', makePassword);

    // Add Enter key support for inputs
    textInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makePassword();
        }
    });

    secretKeyInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makePassword();
        }
    });

    // Add click event to password output for easy selection
    passwordOutput.addEventListener('click', function() {
        selectText(this);
    });
});
