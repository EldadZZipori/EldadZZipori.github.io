"use strict"; // When page loads

var ready = function ready(callback) {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback());
};

var updateCache = async function updateCache() {
  caches.open("pictures").then(function (cache) {
    cache.keys().then(function (keys) {
      if (keys.length != 3) {
        cache.addAll(['https://eldadzzipori.com/static/primary_background.jpg', 'https://eldadzzipori.com/static/secondary_backgroud.jpg',"https://eldadzzipori.com/static/programming_rive.flr"]).then(function () {
          return loadPicsFromCache(cache);
        });
        return;
      }

      loadPicsFromCache(cache);
    });
  });
};

var loadPicsFromCache = async function loadPicsFromCache(cache) {
  // if somehow the pictures cache doesn't have all the pictures fetch again
  cache.match('https://eldadzzipori.com/static/primary_background.jpg').then(function (r) {
    r.blob().then(function (value) {
      var background = document.querySelector("#main_background");
      background.setAttribute("style", "background-image:url('" + URL.createObjectURL(value) + "'");
      background.className += " getSmaller";
    });
  });
  cache.match('https://eldadzzipori.com/static/secondary_backgroud.jpg').then(function (r) {
    r.blob().then(function (value) {
      var background = document.querySelector("#secondery_backgroind");
      background.setAttribute("style", "background-image:url('" + URL.createObjectURL(value) + "'");
      background.classList += " getSmaller";
    });
  });
    
    cache.match('https://eldadzzipori.com/static/programming_rive.flr').then(function (r) {
    r.blob().then(function (value) {
      var programing_element = document.getElementById("ProgramingCanvas");
        Programing = new RivePlayer(programing_element, function () {
        Programing.load(URL.createObjectURL(value), function (error) {
        programing_element.setAttribute("style", "");
        programing_element.className += " getMoreSmaller";

        if (error) {
            console.log("failed to load actor file...", error);
        }
        }, "#ProgramingCanvas", [490, 490], 0.25, 0.015, [0.74, 0.59, 0.41, 1.0]);
        });
    });
  });
};

var BackgroundLoaded = function BackgroundLoaded() {
  var MuchMore;
  var Programing;
  var Electronics;
  var CV;
  var Managment;
  var more_element = document.getElementById("MuchMorecanvas");
  MuchMore = new RivePlayer(more_element, function () {
    MuchMore.load("/static/books_rive.flr", function (error) {
      more_element.setAttribute("style", "");
      more_element.className += " getMoreSmaller";

      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#MuchMorecanvas", [105, 95], 1.0, 0.010, [0.74, 0.59, 0.41, 1.0]);
  
  
  var electronics_element = document.getElementById("ElectronicsCanvas");
  Electronics = new RivePlayer(electronics_element, function () {
    Electronics.load("/static/electronics_rive.flr", function (error) {
      electronics_element.setAttribute("style", "");
      electronics_element.className += " getMoreSmaller";

      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#ElectronicsCanvas", [525, 425], 0.30, 0.040, [0.74, 0.59, 0.41, 1.0]);
  var managment_element = document.getElementById("ManagmentCanvas");
  Managment = new RivePlayer(managment_element, function () {
    Managment.load("/static/managment_rive.flr", function (error) {
      managment_element.setAttribute("style", "");
      managment_element.className += " getMoreSmaller";

      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#ManagmentCanvas", [190, 160], 0.9, 0.010, [0.74, 0.59, 0.41, 1.0]);
  var cv_element = document.getElementById("cv");
  CV = new RivePlayer(cv_element, function () {
    CV.load("/static/cv_rive.flr", function (error) {
      cv_element.setAttribute("style", "");
      cv_element.className += "getMoreSmaller";

      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#cv", [100, 100], 1.25, 0.01, [0.89, 0.96, 0.89, 1.0]);
};

ready(function () {
  // Checks if pictures are in the local cache
  updateCache();
  BackgroundLoaded(); // initiate material Navbar

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {}); // sets the CV bubble to play on hover

  document.getElementById("cv").addEventListener('mouseover', function (e) {
    e.srcElement.setAttribute('data', 1);
  });
  document.getElementById("cv").addEventListener('mouseout', function (e) {
    e.srcElement.setAttribute('data', 0);
  }); // setes the bubbles to play on hover and the tooltip to appear on hover

  document.querySelectorAll(".skills_bullets_buble_wrapper").forEach(function (element) {
    element.addEventListener("mouseover", function (e) {
      var tooltip = element.getElementsByClassName("tooltiptext")[0];
      element.querySelector('canvas').setAttribute('data', 1);
      tooltip.className += " FadeIn";
      tooltip.classList.remove("FadeOut");
    });
    element.addEventListener("mouseout", function (e) {
      var tooltip = element.getElementsByClassName("tooltiptext")[0];
      ;
      element.querySelector('canvas').setAttribute('data', 0);
      tooltip.className += " FadeOut";
      tooltip.classList.remove("FadeIn");
    });
  });
});
