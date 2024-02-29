const form = document.getElementById('registration-form');
const successMessage = document.getElementById('success-message');

const fields = new Map([
    ['fullname', {
        pattern: /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/,
        error: 'Введите как минимум два слова из русских или английских букв, с обязательным пробелом между ними'
    }],
    ['contact', {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        error: 'Введите корректный email адрес или телефон'
    }],
    ['password', {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/,
        error: 'Пароль должен содержать не менее 8 символов, хотя бы одну заглавную и строчную буквы, цифру и специальный символ'
    }]
]);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let hasErrors = false;

    fields.forEach((value, key) => {
        const input = form.elements[key];
        const errorMessage = document.getElementById(`${key}-error`);
        
        if (!value.pattern.test(input.value)) {
            input.classList.add('error');
            errorMessage.textContent = value.error;
            hasErrors = true;
        } else {
            input.classList.remove('error');
            errorMessage.textContent = '';
        }
    });

    if (!hasErrors) {
        const formData = new FormData(form);
        showSuccessMessage(formData);
        form.reset();
    }
});

function showSuccessMessage(formData) {
    const fullname = formData.get('fullname');
    const contact = formData.get('contact');
    const isEmail = contact.includes('@');
    let message = '';

    if (isEmail) {
        message = `Здравствуйте, ${fullname}! Мы свяжемся с вами по email: ${contact}`;
    } else {
        const formattedPhone = formatPhoneNumber(contact);
        message = `Здравствуйте, ${fullname}! Мы свяжемся с вами по телефону: ${formattedPhone}`;
    }

    successMessage.textContent = message;
    successMessage.style.display = 'block';
}

function formatPhoneNumber(phone) {

    let formattedPhone = phone.replace(/[^0-9]/g, '');
    formattedPhone = formattedPhone.replace(/^996|^0/, '');


    const regex = /^(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const match = formattedPhone.match(regex);

    if (match) {
        formattedPhone = `+996 ${match[1]} ${match[2]}-${match[3]}-${match[4]}`;
    }

    return formattedPhone;
}