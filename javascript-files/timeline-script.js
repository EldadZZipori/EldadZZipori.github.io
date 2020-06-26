"use strict";

var ready = function ready(callback) {
  if (document.readyState != "loading") callback();else document.addEventListener("DOMContentLoaded", callback());
};

// Code By Webdevtrick ( https://webdevtrick.com )
ready(function(){
  var timelineSwiper = new Swiper('.timeline .swiper-container', {
    direction: 'vertical',
    loop: false,
    speed: 1600,
    observer: true,
    pagination: '.swiper-pagination',
    paginationBulletRender: function (swiper, index, className) {
      var year = document.querySelectorAll('.swiper-slide')[index].getAttribute('data-year');
      return '<span class="' + className + '">' + year + '</span>';
    },
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    breakpoints: {
      768: {
        direction: 'horizontal'
      }
    }
  });

  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {}); 

  var previosWidth = window.innerWidth;
  
  window.onresize = function () {
    if (window.innerWidth < 769 && window.innerWidth < previosWidth) {
      console.log("refresh");
      location.reload();
    } else if (window.innerWidth > 769 && window.innerHeight > previosWidth) {
      location.reload("refresh");
    }
  };
  
})
