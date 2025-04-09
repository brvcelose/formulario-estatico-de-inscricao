document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input, select');

    // Validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
    });

    // Validação do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) {
            saveFormData();
            alert('Inscrição realizada com sucesso!');
            window.location.href = 'login.html';
        }
        return false;
    });

    // Função de validação
    function validateField(target) {
        const field = target.target || target;
        let error = field.parentElement.querySelector('.error-message');

        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            field.parentElement.appendChild(error);
        }

        error.textContent = '';

        if (field.required && !field.value.trim()) {
            error.textContent = 'Este campo é obrigatório';
            return false;
        }

        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            error.textContent = 'E-mail inválido';
            return false;
        }

        if (field.id === 'userPassword' && field.value.length < 6) {
            error.textContent = 'Senha deve ter no mínimo 6 caracteres';
            return false;
        }

        return true;
    }

    // Armazenamento temporário
    function saveFormData() {
        // Captura APENAS os campos de ID e Senha
        const userID = document.getElementById('userID').value;
        const userPassword = document.getElementById('userPassword').value;

        // Salva APENAS esses dados
        localStorage.setItem('formData', JSON.stringify({
            userID: userID,
            userPassword: userPassword
        }));
    }

    // Carregar dados salvos
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.getElementById('userID').value = savedData.userID || '';
        document.getElementById('userPassword').value = savedData.userPassword || '';
    }

    // Carregar estado do modo escuro ao iniciar
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Modo Escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}