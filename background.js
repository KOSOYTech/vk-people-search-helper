// ДЛЯ ОТЛАДКИ:
console.log("Фоновые скрипты запущены");


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {


    console.log("Сообщение получено")
// Отслеживание смены URL без перезагрузки страницы
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {

  console.log('URL изменился, но страница не перезагрузилась');
  console.log(details);

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