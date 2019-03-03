/// this for first Block
function showAndHideDesc() {
  let desc = document.getElementById("desc");
  let btnText = document.getElementById("myBtn");
  if (btnText.innerHTML != "Baca lebih ▼") {
    btnText.innerHTML = "Baca lebih ▼";
    $("#parentdesc").animate({  height: '53px' }, 500);
  } else {

    btnText.innerHTML = "Sembunyikan ▲";
    $("#parentdesc").animate({  height: $('#desc').height() }, 500);
  }
}

$(document).ready(function(){
  let imgC = $('#currentImage');
  let img= imgC.clone();;

  $('#currentImage').on({
      mouseenter: function () {
        img[0].style.zoom='2';
        img[0].setAttribute("id","zoomImage");
        img[0].setAttribute("src",imgC[0].getAttribute("src"));
        imgC[0].parentElement.prepend(img[0]);
      }

  });

  img.on(
    {
      mousemove: function (e) {
        var parentOffset = $(this).parent().offset();
        var mouseX = e.pageX - parentOffset.left;
        var mouseY = e.pageY - parentOffset.top;
        var amountMovedX = img.width()*clamp(0,0.5,lerp(0 ,imgC.width(), mouseX )-0.25);
        var amountMovedY = img.height()*clamp(0,0.5,lerp(0 ,imgC.height(), mouseY )-0.1);
        //console.log(mouseX +" "+ mouseY);
        //console.log(amountMovedX +" "+ amountMovedY);
        img.css({
          top: -amountMovedY+'px',
          left : -amountMovedX+'px',
          position : 'relative'
        });

      },
      mouseleave: function () {

        //console.log(offset(img[0]));
        img[0].style.zoom='0';
        imgC[0].parentElement.removeChild(img[0]);
      }
    }
  );

});

function clamp(min, max , val) {
  return Math.min(Math.max(val, min), max);
};

function lerp(value1, value2, amount) {
        return (amount - value1) / (value2 - value1);
        //return value1 + (value2 - value1) * amount;
}

function changePhoto(element){
  let currImage = document.getElementById("currentImage");
  currImage.setAttribute("src" , element.querySelector("#tempImage").getAttribute("src") );
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
    if(lastTarget ==null){
      lastTarget = document.getElementsByClassName("tablinks active")[0];
    }
    if(lastTarget == evt.currentTarget){
      return;
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
$.get( "https://api.myjson.com/bins/fcv4u", function( data  , status , xhr) {
    document.getElementById("Rincian").querySelector("#textRincian").innerHTML = data["detail"];
    console.log(data.review);
    if(!isEmpty(data.review)){
      document.getElementById("Ulasan").innerHTML = "";
    }
    for (var k in data.review){
        if (typeof data.review[k] !== 'function') {
            addReview(data.review[k].name , data.review[k].review);
        }
    }
    if(!isEmpty(data.question)){
      document.getElementById("pertanyaanHolder").innerHTML = "";
    }
    for (var k in data.question){
        if (typeof data.question[k] !== 'function') {
            addQuestion(data.question[k].name , data.question[k].question , k);
        }
    }
});
function isEmpty(data) {

    for(var key in data) {

        return false;
    }

    return true;
}

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

addReview = function (name,review){
    let pertanyaan = document.getElementById("Ulasan");

    let file = "html/review.html";
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let objPertanyaan = $(this.responseText);
            objPertanyaan[0].querySelector("#name").innerHTML = name;
            objPertanyaan[0].querySelector("#review").innerHTML = review;
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
