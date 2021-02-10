// ДЛЯ ОТЛАДКИ:
// Обозначаем, что Background.js работает
// console.log("Фоновые скрипты запущены");
// console.log('------------------------');

// Отслеживаем события полной загрузки страницы или обновления на vk.com
chrome.webNavigation.onCompleted.addListener(urlChangeAlert, {
  url: [
    {urlPrefix: 'https://vk.com'}
  ]
});

// Отслеживаем события изменения URL на vk.com
chrome.webNavigation.onHistoryStateUpdated.addListener(urlChangeAlert, {
  url: [
    {urlPrefix: 'https://vk.com'}
  ]
});
  
// Функция, которая вызывается при изменения URL страницах vk.com
function urlChangeAlert(e) {

  // ДЛЯ ОТЛАДКИ:
  // Обозначаем, что событие изменения URL на сайте сработало
  // console.log("Сработало событие. Изменился URL");
  // console.log('Полученные данные:')
  // console.log(e);
  // console.log('------------------------');

  // ДЛЯ ОТЛАДКИ:
  // console.log("Перезагрузка или сработал Ajax");
  // console.log('------------------------');
    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(e.tabId, {messageurl: "changedurl"});  
  });

}




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {


    console.log("Сообщение получено")

 

// Отслеживание смены URL без перезагрузки страницы
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {

  // ДЛЯ ОТЛАДКИ:
  // alert('В background.js отслежена смена URL');

  // console.log('URL изменился, но страница не перезагрузилась');
  // console.log(details);

//chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
 // if (changeInfo.status == 'complete') {   


 
        // console.log(sender.tab ?
        //             "from a content script:" + sender.tab.url :
        //             "from the extension");
        // if (request.greeting == "hello")
        //sendResponse({farewell: "goodbye"});
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            //var tabmain = tabs[0].id;
            
            chrome.tabs.sendMessage(sender.tab.id, {message: "changed"});  

 // }
//});


  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   const port = chrome.tabs.connect(tabs[0].id);
  //   port.postMessage({ function: 'html' });
  //   port.onMessage.addListener((response) => {
  //     html = response.html;
  //     title = response.title;
  //     description = response.description;
  //   });
  // });





});

});


});