// ДЛЯ ОТЛАДКИ:
console.log("Фоновые скрипты запущены");

var doubleUpdateFlag = 0;



  

   // Проверка отслеживания на конкретных страницах
   chrome.webNavigation.onCommitted.addListener(closeTab, {
    url: [
      {urlPrefix: 'https://vk.com'}
    ]
  });
  
  function closeTab(e) {

     
    if (e.frameId != 0) {

      alert("Сработало отслеживание на конкретной странице");

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {messageurl: "changedurl"});  
      });

    }


   
    
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