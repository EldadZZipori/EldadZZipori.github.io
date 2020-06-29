"use strict"; // When page loads

var ready = function ready(callback) {
  if (document.readyState != "loading") callback(); else document.addEventListener("DOMContentLoaded", callback());
};


var pictures = [
  {
    element_id: "main_background",
    remote_url: "/static/primary_background.jpg",
    type: "background"
  },
  {
    element_id: "secondery_backgroind",
    remote_url: "/static/secondary_backgroud.jpg",
    type: "background"
  },
  {
    element_id: "whatsapp",
    remote_url: "/static/whatsapplogo.png",
    type: "img"
  }
]

var rives = [
  {
    element_id: "MuchMorecanvas",
    remote_url: "/static/books_rive.flr",
    viewcenter: [105, 95],
    scale: 1.0,
    elapsed: 0.010,
    color: [14/255, 42/255, 54/255, 0.9]
  },
  {
    element_id: "ProgramingCanvas",
    remote_url: "/static/programming_rive.flr",
    viewcenter: [490, 490],
    scale: 0.25,
    elapsed: 0.015,
    color: [14/255, 42/255, 54/255, 0.9]
  },
  {
    element_id: "ElectronicsCanvas",
    remote_url: "/static/electronics_rive.flr",
    viewcenter: [525, 425],
    scale: 0.30,
    elapsed: 0.040,
    color: [14/255, 42/255, 54/255, 0.9]
  },
  {
    element_id: "ManagmentCanvas",
    remote_url: "/static/managment_rive.flr",
    viewcenter: [190, 160],
    scale: 0.8,
    elapsed: 0.010,
    color: [14/255, 42/255, 54/255, 0.9]
  },
]
var LoadRives = function LoadRives() {
  var CV;

  rives.map(item => {
    var current_element = document.getElementById(item.element_id);
    var current_rive = new RivePlayer(current_element, function () {
      current_rive.load(item.remote_url, function (error) {
        current_element.setAttribute("style", "");
        current_element.className += " getMoreSmaller";

        if (error) {
          console.log("failed to load actor file...", error);
        }
      });
    }, "#" + item.element_id, item.viewcenter, item.scale, item.elapsed, item.color);
  });

  /*  var cv_element = document.getElementById("cv");
    CV = new RivePlayer(cv_element, function () {
      CV.load("/static/cv_rive.flr", function (error) {
        cv_element.setAttribute("style", "");
        cv_element.className += "getMoreSmaller";
  
        if (error) {
          console.log("failed to load actor file...", error);
        }
      });
    }, "#cv", [100, 100], 1.25, 0.01, [0.89, 0.96, 0.89, 1.0]);*/
};

var updateCache = async function updateCache() {
  let cache = await caches.open("pictures");
  let keys = await cache.keys();
  if (keys.length != pictures.length) {
      for(let i = 0; i < pictures.length; i++){
         await cache.add(pictures[i]["remote_url"]);
      }
  }
   loadPicFromCache(cache);
};

var loadPicFromCache = async function loadPicFromCache(cache) {
  // if somehow the pictures cache doesn't have all the pictures fetch again
  for(let i = 0; i < pictures.length; i++){
    await embedPicture(cache, pictures[i]);
  }

};

var embedPicture = async function embedPicture(cache, picture) {
  var r = await cache.match(picture["remote_url"]);
  let image_blob = await r.blob();
  var background = document.getElementById(picture["element_id"]);
  let url =  URL.createObjectURL(image_blob);
  if (picture["type"] == "img") {
    background.setAttribute("src", url);
  } else {
    background.setAttribute("style", "background-image:url('"/* + url*/+ "'");
  }
   background.className += " getSmaller";
}


ready(function () {
  // Checks if pictures are in the local cache
  updateCache();
  LoadRives(); // initiate material Navbar

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {}); 

  var cv_canvas = document.getElementById("cv");
  cv_canvas.addEventListener('mouseover', function (e) {
    e.srcElement.setAttribute('data', 1);
  });
  cv_canvas.addEventListener('mouseout', function (e) {
    e.srcElement.setAttribute('data', 0);
  }); // setes the bubbles to play on hover and the tooltip to appear on hover
  cv_canvas.addEventListener("click",function(e){
    console.log("click");
    window.open("/static/2019_English.pdf","_blank");
  });

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
    }, false);
  });
});
