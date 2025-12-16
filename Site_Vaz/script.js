/**
 * Основной скрипт для каталога автомобилей ВАЗ
 * Загружает данные из JSON файла и управляет отображением информации
 */

// Глобальные переменные для хранения данных и элементов DOM
let carsDatabase = [];
let searchInput, searchBtn, resultsSection, carCard, errorMessage, carList;

/**
 * Инициализация при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', async function() {
    // Получение ссылок на элементы DOM
    searchInput = document.getElementById('searchInput');
    searchBtn = document.getElementById('searchBtn');
    resultsSection = document.getElementById('resultsSection');
    carCard = document.getElementById('carCard');
    errorMessage = document.getElementById('errorMessage');
    carList = document.getElementById('carList');

    // Загрузка данных из JSON файла
    await loadCarData();
    
    // Отображение списка всех автомобилей
    displayCarList();
    
    // Автоматический поиск ВАЗ 2101 при загрузке
    searchInput.value = "ВАЗ 2101";
    searchCar();
    
    // Назначение обработчиков событий
    setupEventListeners();
});

/**
 * Загрузка данных из JSON файла
 */
async function loadCarData() {
    try {
        // Запрос к JSON файлу с данными об автомобилях
        const response = await fetch('data/cars.json');
        
        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }
        
        // Преобразование ответа в JSON
        carsDatabase = await response.json();
        
        // Логирование успешной загрузки
        console.log(`Загружено ${carsDatabase.length} моделей автомобилей`);
    } catch (error) {
        // Обработка ошибок загрузки
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные об автомобилях. Пожалуйста, проверьте подключение.');
    }
}

/**
 * Настройка обработчиков событий
 */
function setupEventListeners() {
    // Обработчик клика по кнопке поиска
    searchBtn.addEventListener('click', searchCar);
    
    // Обработчик нажатия Enter в поле поиска
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCar();
        }
    });
}

/**
 * Поиск автомобиля по модели
 */
function searchCar() {
    const query = searchInput.value.trim().toLowerCase();
    
    // Проверка на пустой запрос
    if (!query) {
        alert("Введите модель ВАЗ для поиска (например: 2101, 2106, 2110)");
        return;
    }
    
    // Поиск автомобиля в базе данных
    const car = carsDatabase.find(c => 
        c.model.toLowerCase().includes(query) || 
        c.model.toLowerCase().replace(/\s+/g, ' ').includes(query) ||
        c.model.toLowerCase().includes("ваз " + query)
    );
    
    // Отображение результатов или сообщения об ошибке
    if (car) {
        displayCarInfo(car);
        errorMessage.style.display = 'none';
        resultsSection.style.display = 'block';
    } else {
        resultsSection.style.display = 'none';
        errorMessage.style.display = 'block';
    }
    
    // Прокрутка к результатам поиска
    if (car || !car) {
        window.scrollTo({
            top: document.querySelector('.search-section').offsetHeight + 100,
            behavior: 'smooth'
        });
    }
}

/**
 * Отображение информации об автомобиле
 * @param {Object} car - Объект с данными об автомобиле
 */
function displayCarInfo(car) {
    // Формирование HTML для фотографии и основной информации
    carCard.innerHTML = `
        <!-- Блок с фотографией автомобиля -->
        <div class="car-photo-container">
            <img src="${car.image}" alt="${car.model}" onerror="this.src='images/placeholder.jpg'">
            <div class="photo-overlay">
                <h2>${car.model}</h2>
                <div class="car-nickname">"${car.nickname}"</div>
                <div class="car-years">${car.productionYears}</div>
            </div>
        </div>
        
        <!-- Блок с информацией об автомобиле -->
        <div class="car-info">
            <div class="info-section">
                <div class="section-title">Начало производства</div>
                <div class="section-content highlight">${car.startDate}</div>
            </div>
            
            <div class="info-section">
                <div class="section-title">Характеристики</div>
                <div class="section-content">
                    ${formatCharacteristics(car.characteristics)}
                </div>
            </div>
            
            <div class="info-section">
                <div class="section-title">Годы выпуска</div>
                <div class="section-content highlight">${car.productionYears}</div>
            </div>
            
            <div class="info-section">
                <div class="section-title">Продано штук</div>
                <div class="section-content highlight">${car.soldUnits}</div>
            </div>
            
            <div class="info-section">
                <div class="section-title">Народное название</div>
                <div class="section-content highlight">"${car.nickname}"</div>
            </div>
            
            <div class="info-section">
                <div class="section-title">Технические характеристики</div>
                <div class="car-stats">
                    <div class="stat">
                        <div class="stat-title">Длина</div>
                        <div class="stat-value">${car.length}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Ширина</div>
                        <div class="stat-value">${car.width}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Высота</div>
                        <div class="stat-value">${car.height}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Масса</div>
                        <div class="stat-value">${car.weight}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Макс. скорость</div>
                        <div class="stat-value">${car.maxSpeed}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-title">Разгон 0-100 км/ч</div>
                        <div class="stat-value">${car.acceleration}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Форматирование характеристик автомобиля
 * @param {string} characteristics - Строка с характеристиками
 * @returns {string} - Отформатированный HTML
 */
function formatCharacteristics(characteristics) {
    // Разделение характеристик по запятым и форматирование в список
    return characteristics.split(', ')
        .map(item => `<div>• ${item}</div>`)
        .join('');
}

/**
 * Отображение списка всех автомобилей
 */
function displayCarList() {
    carList.innerHTML = '';
    
    // Создание элемента для каждого автомобиля
    carsDatabase.forEach(car => {
        const carElement = document.createElement('div');
        carElement.className = 'car-item';
        carElement.innerHTML = `
            <div class="car-item-title">${car.model}</div>
            ${car.nickname ? `<div class="model-badge">"${car.nickname}"</div>` : ''}
            <div class="car-item-subtitle">${car.productionYears}</div>
            <div class="car-item-subtitle">${car.soldUnits}</div>
        `;
        
        // Обработчик клика по элементу списка
        carElement.addEventListener('click', () => {
            searchInput.value = car.model;
            searchCar();
        });
        
        carList.appendChild(carElement);
    });
}