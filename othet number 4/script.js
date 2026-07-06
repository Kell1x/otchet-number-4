// Получение элементов DOM
const dateInput = document.getElementById('dateInput');
const calcBtn = document.getElementById('calcBtn');
const daysResult = document.getElementById('daysResult');
const leapResult = document.getElementById('leapResult');

// Функция расчета дней до Нового года
function calculateDaysUntilNewYear(dateString) {
    // Парсинг даты из формата дд.мм.гггг
    const parts = dateString.split('.');
    if (parts.length !== 3) {
        throw new Error('Неверный формат даты');
    }
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // Проверка валидности даты
    const inputDate = new Date(year, month - 1, day);
    if (inputDate.getDate() !== day || 
        inputDate.getMonth() !== month - 1 || 
        inputDate.getFullYear() !== year) {
        throw new Error('Некорректная дата');
    }
    
    // Создание даты Нового года (31 декабря того же года)
    const newYearDate = new Date(year, 11, 31); // 11 = декабрь (месяцы с 0)
    
    // Расчет разницы в днях
    const diffTime = newYearDate - inputDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
}

// Функция определения високосного года
function isLeapYear(dateString) {
    // Парсинг года из формата дд.мм.гггг
    const parts = dateString.split('.');
    const year = parseInt(parts[2], 10);
    
    // Проверка високосного года:
    // Делится на 4, но не делится на 100, ИЛИ делится на 400
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    return isLeap;
}

// Обработчик клика на кнопку
calcBtn.addEventListener('click', function() {
    const dateStr = dateInput.value.trim();
    
    // Очистка предыдущих результатов
    daysResult.textContent = '';
    leapResult.textContent = '';
    
    // Проверка формата через регулярное выражение
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    if (!regex.test(dateStr)) {
        daysResult.textContent = 'Ошибка: неверный формат даты (дд.мм.гггг)';
        daysResult.style.color = '#dc3545';
        return;
    }
    
    try {
        // Расчет дней до Нового года
        const days = calculateDaysUntilNewYear(dateStr);
        daysResult.textContent = `До Нового года осталось: ${days} дней`;
        daysResult.style.color = '#28a745';
        
        // Определение високосного года
        const isLeap = isLeapYear(dateStr);
        leapResult.textContent = isLeap ? 'Год високосный' : 'Год не високосный';
        leapResult.style.color = isLeap ? '#ffc107' : '#6c757d';
        
    } catch (error) {
        daysResult.textContent = `${error.message}`;
        daysResult.style.color = '#dc3545';
    }
});

// Обработчик нажатия Enter в поле ввода
dateInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcBtn.click();
    }
});