var mainDiv = document.getElementById("main");
var centerDiv = document.getElementById("center");
var backDrop = document.getElementById("backdrop");
var homeDiv = document.getElementById("homeDiv");
var introDiv = document.getElementById("introDiv");
var nameSpan = document.getElementById("nameSpan");
var timeSpan = document.getElementById("timeString");
var clockItem = document.getElementById("clock");
var focusItem = document.getElementById("focusPrompt");
var date = new Date();

var beenSetup = localStorage.getItem('start');
var todaysFocus = localStorage.getItem('focus');
//Pulls setup variable from localStorage to check it
//var beenSetup = localStorage.getItem('firstStart');
//Checks if setup exists, if no it runs the setup

if (beenSetup == 'true'){
  homePage();
} else {
  introPage();
}

if(todaysFocus != null){
  focusItem.innerHTML = todaysFocus;
}


backDrop.style.backgroundImage = "url(p1.jpg)";

backDrop.style.backgroundSize = "cover";




//Displays the user homepage if this is not their first time loading the doc
function homePage(){

  introDiv.style.display = 'none';
  homeDiv.style.display = 'block';

  clockUpdate();
  timePhraseUpdate();

  var topLDiv = document.createElement("div");
  var topRDiv = document.createElement("topL");
  topLDiv.id = "topL";
  topRDiv.id = "topR";
  mainDiv.appendChild(topLDiv);
  mainDiv.appendChild(topRDiv);

  nameSpan.innerHTML = localStorage.getItem('name');

  document.getElementById("txtFocus").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          var focusTxt = document.getElementById("txtFocus").value;
          localStorage.setItem('focus',focusTxt);
          focusItem.innerHTML = localStorage.getItem('focus');
      }
  });

}

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

function clockUpdate(){
  date = new Date();
  clockItem.innerHTML = "" + addZero(date.getHours()) + ":" + addZero(date.getMinutes());
  setTimeout(clockUpdate, 5000);
}

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

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
