/// this for first Block
function showAndHideDesc() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("descriptionMore");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Baca lebih ▼";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Sembunyikan ▲";
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

  if(currentElement != null){
    commentOff(currentElement);
  }else if(currentElement == element){
    return;
  }
  currentElement = element;
  element.style.height = '60px';
  element.parentElement.querySelector("#btnSend").style.display = 'block';

}

function commentOff(element){

  element.style.height = '15px';
  element.parentElement.querySelector("#btnSend").style.display = 'none';
}

function sendComment(commentTab){

  if (!confirm('Apa kamu yakin ingin mengirim pesan?')) {
    return;
  }

  let comment=commentTab.parentElement.parentElement.querySelector("#comment");
  console.log("Mengirim");
  //...
  console.log("terkirim");
  comment.value = "";

}

function newQuestion(){
  console.log("new Question Created")
}

//Load All Question
$.get( "https://api.myjson.com/bins/1fk0pq", function( data  , status , xhr) {
    for (var k in data){
        if (typeof data[k] !== 'function') {
            addQuestion(data[k].name , data[k].question , k);
        }
    }
});

addQuestion = function (name,question,key){
    let pertanyaan = document.getElementById("pertanyaanHolder");

    let file = "html/pertanyaan.html";
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let objPertanyaan = $(this.responseText);
            objPertanyaan[0].querySelector("#name").innerHTML = name;
            objPertanyaan[0].querySelector("#question").innerHTML = question;
            objPertanyaan[0].setAttribute("name",key);
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
function getComment(element){
  if(element.innerHTML != "Lihat balasan ▼"){
      let commentList = element.parentElement.parentElement.querySelector("#comment-list");
      commentList.innerHTML = "";
      element.innerHTML = "Lihat balasan ▼"
      return;
  }

  $.get( "https://api.myjson.com/bins/1fk0pq", function( data  , status , xhr) {
      for (var k in data){
          if (typeof data[k] !== 'function') {
              addComment(element, data[k].name , data[k].question);
          }
      }
  });
}

function addComment(objPertanyaan , name , comment){
  let commentHolder = objPertanyaan.parentElement.parentElement.querySelector("#comment-list");

  let file = "html/komen.html";
  if (file) {
    /* Make an HTTP request using the attribute value as the file name: */
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let komen = $(this.responseText);
          komen[0].querySelector("#name").innerHTML = name;
          komen[0].querySelector("#comment").innerHTML = comment;
          commentHolder.prepend(komen[0]);
        }
        if (this.status == 404) {pertanyaan.innerHTML = "Page not found.";}
      }
    }
    xhttp.open("GET",file, true);
    xhttp.send();
    objPertanyaan.innerHTML = "Sembunyikan balasan ▲"
    return;
  }
}
