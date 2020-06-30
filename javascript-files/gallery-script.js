"use strict";

var slideIndex = 1;

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
  console.log(columns.length); // Adding the show class to the filtered elements and removes show class from element who are not selected

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
  console.log("In of removeClass");
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");

  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }

  element.className = arr1.join(" ");
  console.log("Out of removeClass");
} // function for opening the modal


function modalOpen(_This) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log(this.responseText.toString());
      var ob = JSON.parse(this.responseText.toString());
      document.querySelector("#modal > div > h2").innerHTML = ob["data_name"];
      document.querySelector("#modal > div > p").innerHTML = ob["description"];
      modal.style.display = "block";

      var slideshow = document.querySelector("#modal > div > .slideshow-container");
      slideshow.innerHTML = "";

      ob["pictures"].forEach(element => {
        slideshow.innerHTML+= `
        <div class="mySlides fade">
           <img src="http://localhost/${element}" style="width:100%">
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

  xhttp.open("GET", `static/${_This.getAttribute("data")}.json`, true);
  xhttp.send();
}

function ready() {
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
      ob.forEach(element => {
        console.log(element);
        gallery.innerHTML += `
        <div class="galleryColumn ${element['cat']} fade">
          <div data="${element['data']}" class="galleryContent" onclick="modalOpen(this)">
            <img src="http://localhost/${element['pic']}" alt="" style="width: 100%" />
            <h4>${element['name']}</h4>
            <p>${element['desc']}</p>
          </div>
        </div>`
      
      });
      filterSelection("all"); // Execute the function to show all columns
    };
  };

  xhttp.open("GET", `static/protfolio_list.json`, true);
  xhttp.send();
 
    
}
