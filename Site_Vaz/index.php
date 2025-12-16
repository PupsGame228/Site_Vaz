<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог ВАЗ 2101-2110 | Классические автомобили</title>
    <!-- Подключение иконок Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Подключение внешнего CSS файла -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- Шапка сайта -->
        <header>
            <h1>Каталог ВАЗ 2101-2110</h1>
            <p class="subtitle">Легендарные автомобили Волжского автозавода</p>
        </header>
        
        <!-- Секция поиска -->
        <section class="search-section">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Введите модель ВАЗ (например: 2101, 2106, 2110)">
                <button id="searchBtn">
                    <i class="fas fa-search"></i> Найти
                </button>
            </div>
            <p class="hint">Выберите модель из списка ниже или введите номер модели</p>
        </section>
        
        <!-- Секция результатов поиска -->
        <section id="resultsSection" class="results-section">
            <div id="carCard" class="car-card">
                <!-- Данные автомобиля будут загружены сюда динамически -->
            </div>
        </section>
        
        <!-- Сообщение об ошибке -->
        <div id="errorMessage" class="error-message">
            <i class="fas fa-exclamation-circle" style="font-size: 1.5rem; margin-bottom: 10px;"></i>
            <h3>Модель ВАЗ не найдена</h3>
            <p>Пожалуйста, введите корректный номер модели от 2101 до 2110 или выберите из списка ниже</p>
        </div>
        
        <!-- Список всех автомобилей -->
        <section class="car-list-section">
            <h2>Все модели ВАЗ 2101-2110</h2>
            <div id="carList" class="car-list">
                <!-- Список автомобилей будет загружен сюда динамически -->
            </div>
        </section>
        
        <!-- Подвал сайта -->
        <footer>
            <p>Каталог классических автомобилей ВАЗ © 2024</p>
            <p>Все изображения взяты из открытых источников</p>
        </footer>
    </div>

    <!-- Подключение внешнего JavaScript файла -->
    <script src="script.js"></script>
</body>
</html>