document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const userIDInput = document.getElementById('userID'); // Campo ID
    const userPasswordInput = document.getElementById('userPassword'); // Campo Senha

    // Carregar dados salvos (se existirem)
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        userIDInput.value = savedData.userID || '';
        userPasswordInput.value = savedData.userPassword || '';
    }

    // Evento de submit do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede envio padrão

        // Validação básica
        let isValid = true;

        // Valida ID e Senha
        if (!userIDInput.value.trim()) {
            alert('ID do usuário é obrigatório!');
            isValid = false;
        }

        if (!userPasswordInput.value.trim() || userPasswordInput.value.length < 6) {
            alert('Senha deve ter no mínimo 6 caracteres!');
            isValid = false;
        }

        // Se válido, salva e redireciona
        if (isValid) {
            localStorage.setItem('formData', JSON.stringify({
                userID: userIDInput.value,
                userPassword: userPasswordInput.value
            }));
            alert('Inscrição realizada com sucesso!');
            window.location.href = 'login.html'; // Redireciona
        }
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