const inputs = document.querySelectorAll('.date__input');
const inputSubmit = document.querySelector('.date');
const inputYear = document.querySelector('#year');
const inputMonth = document.querySelector('#month');
const inputDay = document.querySelector('#day');

const valueInputs = {
    day: '',
    month: '',
    year: ''
};

const clearAlert = (alert) => {
    while (alert.firstChild) {
        alert.removeChild(alert.firstChild);
    }
}

const alertMessage = (message, reference) => {    
    clearAlert(reference);

    const pAlert = document.createElement('p');
    
    pAlert.classList.add('date__error');
    pAlert.textContent = message;

    reference.appendChild(pAlert);
}

const createError = (input, message= 'desconocido') => {
    input.previousElementSibling.classList.add('date__label--error')
    alertMessage(message, input.nextElementSibling);
}

const deleteError = (input) => {
    input.previousElementSibling.classList.remove('date__label--error');
    clearAlert(input.nextElementSibling);
}

const validateNotEmpty = (input) => {
    if (valueInputs[input.name] === '') {
        createError(input, 'The field is required');
    } else {
        deleteError(input);
    }
}

const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    
    if (isNaN(year)) {
        return createError(inputYear, 'Enter a valid year')
    };
    if (year > currentYear) {
        return createError(inputYear, 'Must be in the past');
    }

    deleteError(inputYear);
}

const validateMonth = (month) => {    
    const currentMonth = new Date().getMonth() + 1;

    if (isNaN(month)) {
        return createError(inputMonth, 'Enter a valid year');
    }

    if (month > currentMonth || month <= 0 || month > 12) {
        return createError(inputMonth, 'Must be a valid month');
    }
    
    deleteError(inputMonth);
}

const validateDay = ({day, month, year}) => {

    if (isNaN(month)) month = new Date().getMonth();
    if (isNaN(year)) year = new Date().getFullYear();
    
    const daysMonths = new Date(year, month, 0).getDate();

    if (!(day > 0 && day <= daysMonths)) {
        return createError(inputDay, 'Must be a valid day');
    }
    
    deleteError(inputDay);
}

const guionesTextoSpan = (dato) => {
    years.textContent = dato;
    months.textContent = dato;
    days.textContent = dato;
}

const handleInput = e => {
    valueInputs[e.target.name] = e.target.value.padStart(2, '0');
}

const handleSubmit = e => {
    e.preventDefault();

    for (let input of inputs) {
        validateNotEmpty(input);
    }

    if (Object.values(valueInputs).some(value => value === '')) {
        guionesTextoSpan('--');
        return
    };

    const { year, month, day } = valueInputs;

    
    validateYear(year);
    validateMonth(month);
    validateDay({...valueInputs});
   
    const existeError = document.querySelector('.date__error');
    if (existeError) {
        guionesTextoSpan('--');
        return
    };

    const years = document.querySelector('#years');
    const months = document.querySelector('#months');
    const days = document.querySelector('#days');

    years.textContent = year;
    months.textContent = month;
    days.textContent = day;

    inputYear.value = ''
    inputMonth.value = ''
    inputDay.value = ''

    valueInputs.year = '';
    valueInputs.month = '';
    valueInputs.day = '';
}

document.addEventListener('DOMContentLoaded', () => {
    for (let input of inputs) {
        input.addEventListener('input', handleInput);
    }

    inputSubmit.addEventListener('submit', handleSubmit);
})
