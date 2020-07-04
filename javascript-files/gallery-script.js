"use strict";

var slideIndex = 1;
var swipe_det, ele;
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

function filterSelection(selection) {
  
  let columns, i;
  columns = document.getElementsByClassName("galleryColumn");
  if (selection == "all") selection = "";

  for (i = 0; i < columns.length; i++) {
    removeClass(columns[i], 'show');
    if (columns[i].className.indexOf(selection) > -1) addClass(columns[i], 'show');
  }
} // adds show to elements


function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
} // removes show class from elements


function removeClass(element, name) {

  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  element.className = arr1.join(" ");
} // function for opening the modal


function modalOpen(_This) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var ob = JSON.parse(this.responseText.toString());
      document.querySelector("#modal > div > h2").innerHTML = ob["data_name"];
      document.querySelector("#modal > div > p").innerHTML = ob["description"];
      modal.style.display = "block";

      var slideshow = document.querySelector("#modal > div > .slideshow-container");
      slideshow.innerHTML = "";

      ob["pictures"].forEach(element => {
        slideshow.innerHTML+= `
        <div class="mySlides fade">
           <img src="static/pictures/${element}" class="modal_image">
        </div>
        `;
        
      });
      slideshow.innerHTML+= `
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
          `;
        showSlides(slideIndex);
    }
  };

  xhttp.open("GET", `static/json/${_This.getAttribute("data")}.json`, true);
  xhttp.send();
}
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
function detectswipe(el) {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) plusSlides(-1);
      else plusSlides(1);
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
}


function ready() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const q = urlParams.get('q');


  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
  
  // adds active class to the current selected button

  var btnContainer = document.getElementById("buttonContainer");
  var btns = btnContainer.getElementsByClassName("Gbtn");
  
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("Gactive");
      current[0].className = current[0].className.replace(" Gactive", "");
      this.className += " Gactive";
    });
  }

  var modal = document.getElementById("modal");
  var close_span = document.querySelector("#modal > div > span");

  close_span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      var gallery = document.getElementsByClassName("galleryRows")[0];
      var ob = JSON.parse(this.responseText.toString());
      //shuffleArray(ob);
      ob.forEach(element => {
        gallery.innerHTML += `
        <div class="galleryColumn ${element['cat']} fade">
          <div data="${element['data']}" class="galleryContent" onclick="modalOpen(this)">
            <img class="present_image" src="/static/pictures/${element['pic']}" alt="" />
            <h4>${element['name']}</h4>
            <p>${element['desc']}</p>
          </div>
        </div>`
      
      });
      if (q != null){
        switch(q){
          case 'p':
            filterSelection("Programming");
            document.getElementById("Programming").className += " Gactive";
            break;
          case 'e':
            filterSelection("Electonics");
            document.getElementById("Electonics").className += " Gactive";
            break;
          case 'm':
            filterSelection("MuchMore");
            document.getElementById("MuchMore").className += " Gactive";
            break;
          default:
            filterSelection("all");
            document.getElementById("all").className += " Gactive";
            
        }
      } else {
        filterSelection("all");
        document.getElementById("all").className += " Gactive";
      }
    };
  };

  xhttp.open("GET", `static/json/protfolio_list.json`, true);
  xhttp.send();
 
  detectswipe("Slider");
}
