"use strict"; // When page loads

var ready = function ready(callback) {
  if (document.readyState != "loading") callback(); else document.addEventListener("DOMContentLoaded", callback());
};

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


  rives.map(item => {
    var current_element = document.getElementById(item.element_id);
    var current_rive = new RivePlayer(current_element, function () {
      current_rive.load(item.remote_url, function (error) {
        current_element.setAttribute("style", "");
        //current_element.className += " getMoreSmaller";

        if (error) {
          console.log("failed to load actor file...", error);
        }
      });
    }, "#" + item.element_id, item.viewcenter, item.scale, item.elapsed, item.color);
  });

};

ready(function () {
  // Checks if pictures are in the local cache
  //updateCache();
  LoadRives(); // initiate material Navbar

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {}); 

  //document.getElementById("main_background").className += " getSmaller";

  document.querySelectorAll(".skills_bullets_buble_wrapper").forEach(function (element) {
    element.addEventListener("mouseover", function (e) {
      element.querySelector('canvas').setAttribute('data', 1);
    });
    element.addEventListener("mouseout", function (e) {
      element.querySelector('canvas').setAttribute('data', 0);
    }, false);
  });
});
