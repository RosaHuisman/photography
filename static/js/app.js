const app = {

    generateRandomPassword: () => {
        const generatePasswordElem = document.getElementById('generate-password')
        if (generatePasswordElem) {
            generatePasswordElem.addEventListener('click', app.randomstring);
        }
    },

    randomstring: () => {
        const randomString = Math.random().toString(36).slice(-8);
        console.log(randomString);
        const formElem = document.getElementById('form-container');
        const randomPasswordInput = document.createElement('input');
        randomPasswordInput.value = randomString;
        randomPasswordInput.name = 'password';
        formElem.append(randomPasswordInput);
        // générer qu'UN SEUl mot de passe aléatoire:
        const generatePasswordElem = document.getElementById('generate-password')
        generatePasswordElem.removeEventListener('click', app.randomstring);
    },

    init: () => {
        console.log('app.init!');
        app.generateRandomPassword();
    }

};

document.addEventListener('DOMContentLoaded', app.init);