// ДЛЯ ОТЛАДКИ. Очистка настроек
// chrome.storage.local.clear()

// Оборачиваем содержимое content.js в функцию, чтобы запускать его только тогда, когда мы находимся на странице поиска
function contentScript() {

// ДЛЯ ОТЛАДКИ:
console.log("Скрипт поискового помощника запущен");

// Получаем сохраненные настройки, а именно массив скрытых аккаунтов
chrome.storage.local.get({'accountArrayParam' : {}}, function(result){
		
	console.log(result.accountArrayParam);

	// Сохраняем настройку в переменную
	var accountArray = [];
	accountArray = result.accountArrayParam;

	accountArray.forEach(function (item, index) {
		//console.log(item, index);
		var hiddenAccount = document.querySelector("div[data-id='" + item + "']");
		hiddenAccount.style.display = 'none';
	  });


});

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

	//console.log(profile);
	
	// Функция создания кнопок для исключения текущего человека в цикле
	function createButton() {
    	var button = document.createElement("input");
    	button.type = "button";
		button.value = "Убрать";
		button.id = profileId;
		button.classList.add("deleteaccount");
		document.querySelector("div[data-id='" + profileId + "']").appendChild(button);
	}
	createButton();

}

}
createButtonLoop();

// Функция скрытия текущего неугодного человека
function showAccount(id) {

	// Получаем селектор строки аккаунта
	var account = document.querySelector("div[data-id='" + id + "']");

	// Скрываем строку аккаунта
	account.style.display = 'none';

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
			console.log("У вас ещё нет скрытых аккаунтов")
		
		// Если тип переменной - не объект, то настройки есть и мы их сохраняем в нашу временную переменную
		} else {

			// ДЛЯ ОТЛАДКИ:
			// Показать массив, взятый из сохраненных настроек
			console.log("Массив, взятый из сохраненных настроек:");
			console.log(result.accountArrayParam);
			
			// Сохраняем в нашу временную переменную
			accountArray = result.accountArrayParam;

		}
		
		// Добавляем к временной переменной массива новый ID (если настроек не было, то он добавиться первым, а если были, то он добавиться в конец), если его там не было до этого
		if (accountArray.includes(id) === false) accountArray.push(id);

		// ДЛЯ ОТЛАДКИ:
		// Показать массив из временной переменной после добавления туда нового ID
		// console.log("Массив, после добавления туда нового ID:");
		// console.log(accountArray);

		// Сохраняем в настройках временную переменную - массив со списком скрытых аккаунтов
		chrome.storage.local.set({'accountArrayParam': accountArray});
	});

}




var results = document.getElementById("results");
results.addEventListener("click", someFunction);




	console.log("Нажата именно кнопка");

	function someFunction(event) {

		if (event.target.className == "deleteaccount") {
			showAccount(event.target.id);
		}
	}




let observer = new MutationObserver(mutationRecords => {
	
	document.querySelectorAll('.deleteaccount').forEach(e => e.remove());
		createButtonLoop();
	
	//console.log(mutationRecords); // console.log(изменения)
});

var elem = document.getElementById("results");

// наблюдать за всем, кроме атрибутов
observer.observe(elem, {
	childList: true, // наблюдать за непосредственными детьми
	subtree: false, // и более глубокими потомками
	characterDataOldValue: true // передавать старое значение в колбэк
  });



}

chrome.runtime.sendMessage({greeting: "hello"});
 //Получение информации от фонового скрипта о том, что URL изменился
 chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		
	  if (request.message == "changed" && window.location.pathname == '/search'){
 		contentScript();
	}
});