document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const userIDInput = document.getElementById('userID'); // Campo ID
    const userPasswordInput = document.getElementById('userPassword'); // Campo Senha

    // Carregar dados salvos (se existirem)
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        // Dados Pessoais
        document.querySelector('input[type="text"]').value = savedData.fullName || '';
        document.querySelector('input[type="date"]').value = savedData.birthDate || '';
        document.querySelector('input[placeholder="123.456.789-00"]').value = savedData.cpf || '';
        document.querySelector('select').value = savedData.gender || ''; // Sexo
        document.querySelector('input[type="email"]').value = savedData.email || '';
        document.querySelector('input[type="tel"]').value = savedData.phone || '';

        // Endereço
        document.querySelector('input[placeholder="01234-567"]').value = savedData.cep || '';
        document.querySelector('input[placeholder="Rua 1"]').value = savedData.street || '';
        document.querySelector('input[placeholder="10"]').value = savedData.number || '';
        document.querySelector('input[placeholder="São Luís"]').value = savedData.city || '';
        document.querySelectorAll('select')[1].value = savedData.state || ''; // Estado

        // Trilhas
        if (savedData.trilha) {
            const trilhaOptions = document.querySelectorAll('.trilha-icon');
            trilhaOptions.forEach(option => {
                if (option.textContent.trim() === savedData.trilha) {
                    option.parentElement.querySelector('input').checked = true;
                }
            });
        }

        // Acesso
        document.getElementById('userID').value = savedData.userID || '';
        document.getElementById('userPassword').value = savedData.userPassword || '';

        // Termos
        document.querySelector('.terms-input').checked = savedData.termsAccepted || false;
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

function saveFormData() {
    const formData = {
        // Dados Pessoais
        fullName: document.querySelector('input[type="text"]').value,
        birthDate: document.querySelector('input[type="date"]').value,
        cpf: document.querySelector('input[placeholder="123.456.789-00"]').value,
        gender: document.querySelector('select').value,
        email: document.querySelector('input[type="email"]').value,
        phone: document.querySelector('input[type="tel"]').value,

        // Endereço
        cep: document.querySelector('input[placeholder="01234-567"]').value,
        street: document.querySelector('input[placeholder="Rua 1"]').value,
        number: document.querySelector('input[placeholder="10"]').value,
        city: document.querySelector('input[placeholder="São Luís"]').value,
        state: document.querySelector('select').value,

        // Trilhas
        trilha: document.querySelector('input[name="trilha"]:checked')?.parentElement.textContent.trim(),

        // Acesso
        userID: document.getElementById('userID').value,
        userPassword: document.getElementById('userPassword').value,

        // Termos
        termsAccepted: document.querySelector('.terms-input').checked
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Progresso salvo com sucesso!');
}

// Modo Escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}