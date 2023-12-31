const inputs = document.querySelectorAll('.date__input');
const inputSubmit = document.querySelector('.date');
const valueInputs = {
    day: {
        value: '',
        error: false
    },
    month: {
        value: '',
        error: false
    },
    year: {
        value: '',
        error: false
    },
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
    console.log(valueInputs[input.name])
    console.log(input.name)
    if (valueInputs[input.name].value === '') {
        createError(input, 'The field is required');
    } else {
        deleteError(input);
    }
}

const validateYear = (year) => {
    const inputYear = document.querySelector('#year');
    const currentYear = new Date().getFullYear();
    
    console.log(year)
    if (isNaN(year)) {
        valueInputs.year.error = true;
        return createError(inputYear, 'Enter a valid year')
    };
    if (year > currentYear) {
        valueInputs.year.error = true;
        return createError(inputYear, 'Must be in the past');
    }

    deleteError(inputYear);
    valueInputs.year.error = false;
}

const validateMonth = (month) => {    
    const inputMonth = document.querySelector('#month');
    const currentMonth = new Date().getMonth() + 1;

    if (isNaN(month)) {
        valueInputs.month.error = true;
        return createError(inputMonth, 'Enter a valid year');
    }

    if (month > currentMonth || month <= 0 || month > 12) {
        valueInputs.month.error = true;
        return createError(inputMonth, 'Must be a valid month');
    }
    
    deleteError(inputMonth);
    valueInputs.month.error = false;
}

const validateDay = ({day, month, year}) => {
    const inputDay = document.querySelector('#day');
    
    const daysMonths = new Date(year.value || 12, month.value || 2023, 0).getDate();

    if (!(day.value > 0 && day.value <= daysMonths)) {
        valueInputs.day.error = true;
        return createError(inputDay, 'Must be a valid day');
    }
    
    deleteError(inputDay);
    valueInputs.day.error = false;
}

const handleInput = e => {
    valueInputs[e.target.name].value = e.target.value;
}

const handleSubmit = e => {
    e.preventDefault();

    
    for (let input of inputs) {
        validateNotEmpty(input);
    }

    const { year, month, day} = valueInputs;
    
    validateYear(year.value);
    validateMonth(month.value);
    validateDay({...valueInputs});

    console.log(valueInputs)
    console.log(year.error)
    console.log(month.error)
    console.log(day.error)
   
    console.warn('----------------');

    if (!year.error || !month.error || !day.error || Object.values(valueInputs).some(valueInput => valueInput.value === '')) {
        console.log(year.error)
        console.log(month.error)
        console.log(day.error)
        console.log(Object.values(valueInputs).some(valueInput => valueInput.value === ''))
        console.log('No pase la validación');
        return;
    }

    

    console.log('Passe la Validacion');

    return

    if (validateDay(valueInputs.year)) {

    }
    if (validateDay(valueInputs)) {
        
    }
    

    console.log('hola')

}

document.addEventListener('DOMContentLoaded', () => {
    for (let input of inputs) {
        input.addEventListener('input', handleInput);
    }

    inputSubmit.addEventListener('submit', handleSubmit);
})
