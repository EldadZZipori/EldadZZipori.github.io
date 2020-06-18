"use strict";

// When page loads
var ready = (callback) => {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback());
};

 const updateCache = async function() {
         caches.open("pictures").then((cache) => {
            cache.keys().then((keys)=> {
            if(keys.length != 2){
                cache.addAll([
                'https://eldadzzipori.com/static/primary_background.jpg',
                'https://eldadzzipori.com/static/secondary_backgroud.jpg']).then(() => loadPicsFromCache(cache));
              return;
            }
            loadPicsFromCache(cache);
         });
    });
}

 const loadPicsFromCache = async (cache) => {
    // if somehow the pictures cache doesn't have all the pictures fetch again

    cache.match( 'https://eldadzzipori.com/static/primary_background.jpg').then((r) => {

        r.blob().then((value) => {
            let background = document.querySelector("#main_background");
            background.setAttribute("style", "background-image:url('"+ URL.createObjectURL(value) + "'");
            background.className += " getSmaller";
        });
    });
    cache.match( 'https://eldadzzipori.com/static/secondary_backgroud.jpg').then((r) => {
        r.blob().then((value) => {
            let background = document.querySelector("#secondery_backgroind");
            background.setAttribute("style", "background-image:url('"+ URL.createObjectURL(value) + "'");
            background.classList += " getSmaller";
            });
        });
};

const BackgroundLoaded = () => {
  let MuchMore;
  let Programing;
  let Electronics;
  let CV;
  let Managment;
  let more_element = document.getElementById("MuchMorecanvas");
      MuchMore = new RivePlayer(more_element, function () {

    MuchMore.load("/static/books_rive.flr", function (error) {
      more_element.setAttribute("style","");
      more_element.className += " getMoreSmaller";
      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#MuchMorecanvas", [105, 95], 1.0, 0.010, [0.74, 0.59, 0.41, 1.0]);

  var programing_element = document.getElementById("ProgramingCanvas");
  Programing = new RivePlayer(programing_element, function () {
    Programing.load("/static/programming_rive.flr", function (error) {
      programing_element.setAttribute("style","");
      programing_element.className += " getMoreSmaller";
      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#ProgramingCanvas", [490, 490], 0.25, 0.015, [0.74, 0.59, 0.41, 1.0]);

  var electronics_element = document.getElementById("ElectronicsCanvas");
  Electronics = new RivePlayer(electronics_element, function () {
    Electronics.load("/static/electronics_rive.flr", function (error) {
      electronics_element.setAttribute("style","");
      electronics_element.className += " getMoreSmaller";
      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#ElectronicsCanvas", [525, 425], 0.30, 0.040, [0.74, 0.59, 0.41, 1.0]);

  var managment_element = document.getElementById("ManagmentCanvas");
  Managment = new RivePlayer(managment_element, function () {
    Managment.load("/static/managment_rive.flr", function (error) {
      managment_element.setAttribute("style","");
      managment_element.className += " getMoreSmaller";
      if (error) {
        console.log("failed to load actor file...", error);
      }
    });
  }, "#ManagmentCanvas", [190, 160], 0.9, 0.010, [0.74, 0.59, 0.41, 1.0]);
  var cv_element = document.getElementById("cv");
  CV = new RivePlayer(cv_element, function () {
    CV.load("/static/cv_rive.flr", function (error) {
        cv_element.setAttribute("style","");
        cv_element.className += "getMoreSmaller";
           if (error) {
            console.log("failed to load actor file...", error);
          }
    });
  }, "#cv", [100, 100], 1.25, 0.01, [0.89, 0.96, 0.89, 1.0]);
}

ready(() => {
    
    // Checks if pictures are in the local cache
    updateCache();
    BackgroundLoaded();

    // initiate material Navbar
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems, {});
    
    // sets the CV bubble to play on hover
    document.getElementById("cv").addEventListener('mouseover', (e) => {
        e.srcElement.setAttribute('data', 1);
    });
    document.getElementById("cv").addEventListener('mouseout', (e) => {
        e.srcElement.setAttribute('data', 0);
    });
    
    // setes the bubbles to play on hover and the tooltip to appear on hover
    document.querySelectorAll(".skills_bullets_buble_wrapper").forEach(element => {  
        element.addEventListener("mouseover", (e) => {
        var tooltip = element.getElementsByClassName("tooltiptext")[0];
        element.querySelector('canvas').setAttribute('data', 1);
        tooltip.className += " FadeIn";
        tooltip.classList.remove("FadeOut");
      
        });
    element.addEventListener("mouseout", (e) => {
        var tooltip = element.getElementsByClassName("tooltiptext")[0];;
        element.querySelector('canvas').setAttribute('data', 0);
        tooltip.className += " FadeOut";
        tooltip.classList.remove("FadeIn");
        });
    });
    
});

