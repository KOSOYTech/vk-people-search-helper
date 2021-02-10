// ДЛЯ ОТЛАДКИ. Очистка настроек
// chrome.storage.local.clear()

// Оборачиваем содержимое content.js в функцию, чтобы запускать его только тогда, когда мы находимся на странице поиска
function contentScript() {

	// ДЛЯ ОТЛАДКИ:
	console.log("Скрипт поискового помощника запущен");

	// Получаем сохраненные настройки, а именно массив скрытых аккаунтов и скрываем уже указаныне там
	chrome.storage.local.get({'accountArrayParam' : {}}, function(result){
		
		// ДЛЯ ОТЛАДКИ:
		// Показываем первый сохраненный скрытый ID
		// console.log("Первый сохраненный ID:");
		// console.log(result.accountArrayParam[0]);

		// ДЛЯ ОТЛАДКИ:
		// Показываем все сохраненные скрытые ID
		// console.log("Все сохраненные ID:");
		// console.log(result.accountArrayParam);

		// Если в настройках что-то есть - начинаем перебирать массив
		if (result.accountArrayParam[0] != undefined) {

			// Перебираем полученный массив, для того, чтобы скрыть все указанные там строчки ID
			result.accountArrayParam.forEach(function (item, index) {

				// Создаём селектор на основе ID из массива
				var selectorID = "div[data-id='" + item + "']";

				// Получаем конкретную строчку по созданному селектору
				var hiddenAccount = document.querySelector(selectorID);
			
				// Скрывать строчки, только если на странице есть аккаунты с указанным ID или если они еще не были скрыты, то есть, если их можно найти
				if (hiddenAccount != null) {
					hiddenAccount.style.display = 'none';
				}
			});
		}
	});

	// Функция создания кнопок на странице для всех строчек
	function createButtonLoop () {

		// Пишем цикл для сокрытия каждого отображенного профиля
		// Собираем все доступные профили на странице
		var profiles = document.querySelectorAll('#results [data-id]');

		// Запускаем цикл
		for (var i = 0; i < profiles.length; ++i) {
	
			// Обозначаем элемент текущего профиля
			var profile = profiles[i]; 

			// Вытаскиваем его data-id
			var profileId = profile.getAttribute('data-id');
	
			// Функция создания кнопок для исключения текущего человека в цикле (для каждой конкретной строчки)
			function createButton() {
    			var button = document.createElement("input");
    			button.type = "button";
				button.value = "Убрать";
				button.id = profileId;
				button.classList.add("deleteaccount");
				document.querySelector("div[data-id='" + profileId + "']").appendChild(button);
			}

			// Проверяем, создана ли кнопка для данной конкретной строчки и делаем её только если кнопка ещё не создана
			// Создаём селектор текущей кнопки
			var currentButton = document.getElementById(profileId);

			// ДЛЯ ОТЛАДКИ:
			// Проверяем, чему равен селектор текущей кнопки
			// console.log("Значение кнопки:");
			// console.log(currentButton);
			
			// Непосредственная проверка и создание
			if (currentButton == null) {
				createButton();
			}
		}
	}
	// Запускаем генерацию кнопок для каждой строчки
	createButtonLoop();

	// Функция скрытия текущего неугодного человека
	function showAccount(id) {

		// Получаем селектор строки аккаунта
		var account = document.querySelector("div[data-id='" + id + "']");

		// Скрываем строку аккаунта
		account.style.display = 'none';

		// ДЛЯ ОТЛАДКИ:
		// Просмотреть нажатый ID
		// console.log("Нажатый ID");
		// console.log(id);

		// Получаем список скрытых аккаутов, чтобы добавить в него новую позицию
		chrome.storage.local.get(['accountArrayParam'], function(result) {
		
			// ДЛЯ ОТЛАДКИ:
			// Показать сохраненную переменную до добавления туда нового ID
			// console.log("Настройка до добавления туда нового ID:");
			// console.log(result.accountArrayParam);
			// console.log("Тип настройки:");
			// console.log(typeof result.accountArrayParam);
			// console.log("Настройка - это массив:");
			// console.log(Array.isArray(accountArray));

			// Инициализируем временную переменную списка скрытых аккаунтов
			var accountArray = [];

			// ДЛЯ ОТЛАДКИ:
			// Проверяем тип временной переменной массива
			// console.log("Временная переменная до добавления туда нового ID:");
			// console.log(accountArray);
			// console.log("Тип временной переменной:");
			// console.log(typeof accountArray);
			// console.log("Временная переменная - это массив:");
			// console.log(Array.isArray(accountArray));

			// Проверяем, установлена ли переменная массива скрытых аккаунтов
			// Если тип переменной - объект, то есть не массив, то есть она не задана, то просто выводим сообщение об этом в консоль
			if (!Array.isArray(result.accountArrayParam)) {
			
				// Сообщение об отсутствии аккаунтов в настройках
				// console.log("У вас ещё нет скрытых аккаунтов")
		
			// Если тип переменной - не объект, то настройки есть и мы их сохраняем в нашу временную переменную
			} else {

				// ДЛЯ ОТЛАДКИ:
				// Показать массив, взятый из сохраненных настроек
				// console.log("Массив, взятый из сохраненных настроек:");
				// console.log(result.accountArrayParam);
			
				// Сохраняем в нашу временную переменную
				accountArray = result.accountArrayParam;
			}

				// ДЛЯ ОТЛАДКИ:
				// Просмотреть нажатый ID прямо перед добавлением в массив
				// console.log("Нажатый ID прямо перед добавлением в массив");
				// console.log(id);
		
			// Добавляем к временной переменной массива новый ID (если настроек не было, то он добавиться первым, а если были, то он добавиться в конец), если его там не было до этого
			if (accountArray.includes(id) === false) {

				// ДЛЯ ОТЛАДКИ:
				// Проверяем, пройдена ли проверка на то, что ID уже есть
				// console.log("Такого ID еще нет");

				// Добавляем ID в массив
				accountArray.push(id);
			}	

			// ДЛЯ ОТЛАДКИ:
			// Показать массив из временной переменной после добавления туда нового ID
			// console.log("Массив, после добавления туда нового ID:");
			// console.log(accountArray);

			// Сохраняем в настройках временную переменную - массив со списком скрытых аккаунтов
			chrome.storage.local.set({'accountArrayParam': accountArray});
		});
	}

	// Отслеживаем клик по кнопке "Убрать" в результатах поиска
	// Находим элемент с сеелектором всех результатов
	var results = document.getElementById("results");

	// Вешаем на элемент со всеми результатами срабатывание функции при клике в любое место
	results.addEventListener("click", buttonClicked);

	// Функция, срабатывающая при клике на результаты поиска. В качестве входного параметра - событие с местом клика
	function buttonClicked(event) {

		// Если клик был по кнопке - вызываем функцию сокрытия акканта
		if (event.target.className == "deleteaccount") {
			showAccount(event.target.id);
		}
	}

	// Проверяем, были ли изменения в DOM страницы (прокручивалась ли она вниз) и запускаем заново скрипт, если прокручивалась
	// Создаем объект класса отслеживания
	let observer = new MutationObserver(mutationRecords => {
		createButtonLoop();
		//contentScript();
	});

	// Находим элемент, который будем отслеживать
	var elem = document.getElementById("results");

	// Вызываем метод объекта отслеживания, передавая ему отслеживаемый участок и настройки
	observer.observe(elem, {
		childList: true, // наблюдать за непосредственными детьми
		subtree: false, // и более глубокими потомками
		characterDataOldValue: true // передавать старое значение в колбэк
	 });
	 
	// Проверяем, остались ли на странице нескрытые аккаунты и, если не осталось, то скроллим, чтобы произошла подгрузка
	var isResultExist = document.getElementById(results);

	if (!isResultExist) {

		// ДЛЯ ОТЛАДКИ:
		// Показываем, что не существует страницы с результатами
		// console.log('Страницы с результатами нет');

		// Скроллим
		window.scrollBy(0,1);
	}
}

// Проверка когда приходит от Background.js сообщение об изменинии URL
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// ДЛЯ ОТЛАДКИ:
	// Проверяем, получили ли мы сообщение об изменении URL от фонового скрипта Background.js
	// console.log("Основной скрипт получил сообщение о смене URL");

	// Проверяем, что мы получили сообщение о смене URL и что наша страница - это страница поиска
	if (request.messageurl == "changedurl" && window.location.pathname == '/search') {
	
		// ДЛЯ ОТЛАДКИ:
		// console.log("URL изменен и это страница поиска");

		// Запускаем наш основной скрипт
		contentScript();
	}
});