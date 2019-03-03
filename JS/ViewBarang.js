/// this for first Block
function showAndHideDesc() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("descriptionMore");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more ▼";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less ▲";
    moreText.style.display = "inline";
  }
}

function add(){
  let count = document.getElementById("itemCount");
  count.value = (parseInt(count.value)+1).toString();
}
function decrease(){
  let count = document.getElementById("itemCount");
  let c = parseInt(count.value);
  count.value = (Math.min(Math.max(c-1, 0), c)).toString();
}
function addToChart(){

}
function addToWhistList() {

}


function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function countValidate() {
  let count = document.getElementById("itemCount");

  if(count.value.length > 1 && count.value[0] == "0"){
    let len = count.value.length;
    let startIdx = -1;
    for( i = 0 ; i < len ; i++){
      if(count.value[i] != "0"){
        startIdx = i;
        break;
      }
    }
    if(startIdx !=-1)
      count.value = count.value.substring(startIdx, len);
    else {
      count.value = "0";
    }
  }

  if(count.value == ""){
    count.value = 0;
  }
}
/// this for Tab Pertanyaan
let lastTarget = null;
function tabHandler(evt,nameid,contentid){
    if(lastTarget == evt.currentTarget){
      return;
    }
    if(lastTarget ==null){
      lastTarget = document.getElementsByClassName("tablinks active")[0];
    }
    lastTarget.className = "tablinks";
    lastTarget = evt.currentTarget;
    evt.currentTarget.className += " active";
    let child = document.getElementById(contentid).childNodes;

    for(let i = 0 ; i < child.length; i++){
      if(child[i].className == "tabcontent"){
        if(child[i].id == nameid){
          child[i].style.display = "block";
        }else{
          child[i].style.display = "none";
        }
      }
    }

}

let currentElement = null;
function commentOn(element){
  //console.log(element.parentElement.parentElement);
  if(currentElement != null){
    commentOff(currentElement);
  }
  currentElement = element;
  element.style.height = '60px';
  element.parentElement.querySelector("#btnSend").style.display = 'block';

}

function commentOff(element){
  //console.log(element.parentElement.parentElement);
  element.style.height = '15px';
  element.parentElement.querySelector("#btnSend").style.display = 'none';
}

function sendComment(commentTab){

  if (!confirm('Apa kamu yakin ingin mengirim pesan?')) {
    return;
  }

  let comment=commentTab.parentElement.parentElement.querySelector("#comment");
  console.log(comment.value);


  comment.value = "";

}
$.get( "https://api.myjson.com/bins/1fk0pq", function( data  , status , xhr) {
    console.log(data);
    for (var k in data){
        if (typeof data[k] !== 'function') {
            console.log("tes");
            addQuestion(data[k].name , data[k].question);
        }
    }
});

addQuestion = function (nama,pertanyaan){
    let pertanyaan = document.getElementById("pertanyaanHolder");

    let file = "html/pertanyaan.html";
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let objPertanyaan = $(this.responseText);
            objPertanyaan.querySelector("#name").innerHTML = nama;
            objPertanyaan.querySelector("#question").innerHTML = pertanyaan;
            pertanyaan.prepend(objPertanyaan[0]);
          }
          if (this.status == 404) {pertanyaan.innerHTML = "Page not found.";}
        }
      }
      xhttp.open("GET",file, true);
      xhttp.send();
      return;
    }
}

function addComment(objPertanyaan , nama , comment){


}
