var mainDiv = document.getElementById("main");
var centerDiv = document.getElementById("center");
var backDrop = document.getElementById("backdrop");
var homeDiv = document.getElementById("homeDiv");
var introDiv = document.getElementById("introDiv");
var nameSpan = document.getElementById("nameSpan");
var timeSpan = document.getElementById("timeString");
var clockItem = document.getElementById("clock");
var focusPrmt = document.getElementById("focusPrompt");
var focusFrm = document.getElementById("focusForm");
var topLDiv = document.getElementById("topL");
var topRDiv = document.getElementById("topR");
var botRDiv = document.getElementById("botR");
var todoLst = document.getElementById("todoList");
var todos = document.getElementById("todos");
var todoBtn = document.getElementById("todoButton");
var focusLst = document.getElementById("focusList");
var rmvBtn = document.getElementById("removeFcsButton");
var weathPic = document.getElementById("weatherImage");
var temp = document.getElementById("temp");
var flipFlop;
var date = new Date();
var thisTodo;
var weatherIcn;
var storedImg = localStorage.getItem('bImg');
var todoNum = localStorage.getItem('todoNum');
var beenSetup = localStorage.getItem('start');
var todaysFocus = localStorage.getItem('focus');
var todoContent = localStorage.getItem('listHtml');

//Resets properties on stored html
if(todoContent != null){
  todos.innerHTML = todoContent;
  for(i = 1; i < todos.childNodes.length; i++){
    todos.childNodes[i].childNodes[3].onclick = removeTodo;
    todos.childNodes[i].childNodes[1].addEventListener("click", function(event){
      console.log(event.target.parentElement);
      if(event.target.checked == true && flipFlop == true){
        event.target.checked = false;
        flipFlop = false;
        event.target.parentElement.style.textDecoration = "none";
      } else{
        event.target.parentElement.style.textDecoration = "line-through";
        flipFlop = true;
      }
    });
  }
}

//Checks value from localStorage
if (beenSetup == 'true'){
  homePage();
} else {
  introPage();
}

//Sets base for todoNum
if(todoNum == null){
  localStorage.setItem('todoNum','0');
}
thisTodo = parseInt(localStorage.getItem('todoNum'));

//Checks if img api call already made
if(storedImg == null){
  //Gets info from img api
  var imgReq = new XMLHttpRequest();
  imgReq.open('GET',"https://api.unsplash.com/photos/random?client_id=d955dd8de1c6c221a1f7a6335bfb9bbb86cd86c57c4f955e4e059eb3ff120cf3");
  imgReq.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
        var imgData = imgReq.response;
        var img = JSON.parse(imgData);
        var thisImg = (img["urls"]["full"]).toString();
        backDrop.style.backgroundImage = "url("+thisImg+")";
        localStorage.setItem('bImg',thisImg);
      }
  };
  imgReq.send();
} else {
  backDrop.style.backgroundImage = "url("+storedImg+")";
}

//Gets info from weather api
var weatherReq = new XMLHttpRequest();
weatherReq.open('GET',"https://api.openweathermap.org/data/2.5/weather?q=Oakville,ca&APPID=353053063bd56d87a91cdcffaaafa21c");
weatherReq.onload = function() {
  if (this.readyState == 4 && this.status == 200) {
      var weatherData = weatherReq.response;
      var weather = JSON.parse(weatherData);
      weatherIcn = weather["weather"][0]["icon"];
      weathPic.src = "http://openweathermap.org/img/w/" + weatherIcn + ".png"
      var wDesc = document.createElement("p");
      var locat = document.createElement("p");
      locat.innerText = weather["name"];
      wDesc.innerText = weather["weather"][0]["description"];
      weathPic.addEventListener("click", function(event){
        if(wDesc.className == "vis"){
          wDesc.className = "hid";
        }else{
          wDesc.className = "vis";
        }
      });
      weathPic.style.cursor = "grab";
      wDesc.className = "hid";
      temp.innerText = ((parseInt(weather["main"]["temp"]) - 273.15).toFixed(1)).toString() + "\u2103";
      topRDiv.appendChild(locat);
      topRDiv.appendChild(wDesc);
      console.log("");
    }
};
weatherReq.send();



backDrop.style.backgroundSize = "cover";

//Displays the user homepage if this is not their first time loading the doc
function homePage(){
  introDiv.style.display = 'none';
  homeDiv.style.display = 'block';

  clockUpdate();
  timePhraseUpdate();

  if(localStorage.getItem('focus') == null){
    focusLst.className = "hid";
    focusFrm.className = "vis";
  } else{
    focusLst.className = "vis";
    focusFrm.className = "hid";
    rmvBtn.className = "vis";

    var focusLstItem = document.createElement("li");
    focusLstItem.id = "focusListItem";
    focusLstItem.style.display = 'inline';
    focusLstItem.innerHTML = localStorage.getItem('focus');

    focusLst.appendChild(focusLstItem);
  }

  nameSpan.innerHTML = localStorage.getItem('name');

  document.getElementById("todoInput").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        var todoInp = document.getElementById("todoInput");
        thisTodo++;
        localStorage.setItem('todoNum', thisTodo.toString());
        localStorage.setItem(thisTodo.toString(), todoInp.value);
        todoInp.value = "";

        var thisTodoElm = document.createElement('input');
        var thisTodoName = document.createTextNode(localStorage.getItem(thisTodo.toString()));
        var thisTodoRmvBtn = document.createElement('img');
        var thisTodoContainer = document.createElement('div');

        thisTodoElm.addEventListener("click", function(event){
          console.log(event.target.parentElement);
          if(event.target.checked == true && flipFlop == true){
            event.target.checked = false;
            flipFlop = false;
            event.target.parentElement.style.textDecoration = "none";
          } else{
            event.target.parentElement.style.textDecoration = "line-through";
            flipFlop = true;
          }
        });

        thisTodoContainer.id = thisTodo;
        thisTodoContainer.style.wordWrap = "normal";
        thisTodoElm.type = "radio";
        thisTodoElm.id = "todoRadio";
        thisTodoRmvBtn.id = "removeTodoButton";
        thisTodoRmvBtn.src = "img/del1.png";
        thisTodoRmvBtn.onclick = removeTodo;

        thisTodoContainer.appendChild(document.createElement('br'));
        thisTodoContainer.appendChild(thisTodoElm);
        thisTodoContainer.appendChild(thisTodoName);
        thisTodoContainer.appendChild(thisTodoRmvBtn);

        todos.appendChild(thisTodoContainer);

        localStorage.setItem('listHtml',todos.innerHTML);

        console.log(localStorage.getItem('listHtml'));
      }
  });

  document.getElementById("txtFocus").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          var focusTxt = document.getElementById("txtFocus").value;
          localStorage.setItem('focus',focusTxt);

          var focusLstItem = document.createElement("li");
          focusLstItem.id = "focusListItem";
          focusLstItem.style.display = 'inline';
          focusLstItem.innerHTML = localStorage.getItem('focus');

          focusLst.appendChild(focusLstItem);

          focusLst.className = "vis";
          focusFrm.className = "hid";
          rmvBtn.className = "vis";

      }
  });


}

//Displays on first open
function introPage(){

  introDiv.style.display = 'block';
  homeDiv.style.display = 'none';

  document.getElementById("txtName").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          var usrName = document.getElementById("txtName").value;
          localStorage.setItem('name',usrName)
          localStorage.setItem('start','true');
          homePage();
      }
  });
}

//Updates clock
function clockUpdate(){
  date = new Date();
  clockItem.innerHTML = "" + addZero(date.getHours()) + ":" + addZero(date.getMinutes());
  setTimeout(clockUpdate, 5000);
}

//Updates greeting for
function timePhraseUpdate(){
  date = new Date();
  if (date.getHours() < 12){
    timeSpan.innerHTML = "Morning";
  } else if(date.getHours() < 16){
    timeSpan.innerHTML = "Afternoon";
  } else {
    timeSpan.innerHTML = "Evening";
  }
  setTimeout(timePhraseUpdate, 60000);
}

//Adds zero to time values
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function todoClick(){
  if(todoLst.className == 'hid'){
    todoLst.className = 'vis';
  } else {
    todoLst.className = 'hid';
  }

}

function removeFcs(){
    localStorage.removeItem('focus');
    focusLst.innerHTML = '';
    focusLst.className = "hid";
    focusFrm.className = "vis";
    rmvBtn.className = "hid";
}

function removeTodo(){
  localStorage.removeItem(this.parentElement.id.toString());
  this.parentElement.parentElement.removeChild(this.parentElement);
  localStorage.setItem('listHtml',todos.innerHTML);
}
