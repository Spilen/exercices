//MENU RESPONSIVE

var content = document.querySelector('nav');
var sidebarBody = document.querySelector('.hamburger-sidebar');
var button = document.querySelector('.hamburger');
var overlay = document.querySelector('.hamburger-overlay');
var activatedClass = 'hamburger-activated'

sidebarBody.innerHTML = content.innerHTML;

button.addEventListener('click', function(e) {
  e.preventDefault();
  this.parentNode.classList.add(activatedClass);

});

button.addEventListener('keydown', function(e) {
  if (this.parentNode.classList.contains(activatedClass)) {
    if (e.repeat == false && e.which == 27)
      this.parentNode.classList.remove(activatedClass);
  }
});

overlay.addEventListener('click', function(e) {
  e.preventDefault();

  this.parentNode.classList.remove(activatedClass);
});

//animation du boutton hamburger

const burger = document.querySelector('.hamburger-button');

//CARROUSEL

var carrousel = {

  nbSlide: 0,
  nbCurrent: 1,
  elemCurrent: null,
  elem: null,
  timer: null,

  init: function (elem) {
    this.nbSlide = elem.find('.slider-box .slider-picture').length;

    //Défilement manuel
    elem.find('.slider-select .slider-dot').click(function () {
      carrousel.gotoSlide($(this).text());
    })

    //Initialisation
    this.elem = elem;
    elem.find('.slider-box .slider-picture').hide();
    elem.find('.slider-box .slider-picture:first').show(); 
    this.elemCurrent = elem.find('.slider-box .slider-picture:first');
    this.elem.find('.slider-select .slider-dot:first').addClass('active');

    //Défilement auto
    carrousel.play();

    //Mettre en pause
    /*elem.mouseover(carrousel.stop);
    elem.mouseout(carrousel.play);*/
  }, 

  //Fonction du défilement
  gotoSlide: function (num) {
    if (num == this.nbCurrent){
      return false;
    }
    
    //Transition en fondu
    this.elemCurrent.fadeOut();
    this.elem.find('.slider-box .slider-picture:eq(' + (num - 1) + ')').fadeIn();

    // Transition en slide
    /*var sens = 1;
    if (num < this.nbCurrent){
      sens = - 1;
      console.log('inverse');
    }
    var cssBegin = { 'left': sens * this.elem.width() };
    var cssEnd = { 'left': - sens * this.elem.width() };
    this.elem.find('.slider-box .slider-picture:eq(' + (num - 1) + ')').show().css(cssBegin);

    this.elem.find('.slider-box .slider-picture:eq(' + (num - 1) + ')').animate({'top':0, 'left':0}, 500);
    this.elemCurrent.animate(this.ccsEnd, 500);*/

    //Pagination
    this.elem.find('.slider-select .slider-dot').removeClass('active');
    this.elem.find('.slider-select .slider-dot:eq(' + (num - 1) + ')').addClass('active');
    this.nbCurrent = num;
    this.elemCurrent = this.elem.find('.slider-box .slider-picture:eq(' + (num - 1) + ')');
  },

  //Fonction du défilement auto
  next: function () {
    var num = this.nbCurrent + 1;
    if (num > this.nbSlide){
      num = 1;
    }
    this.gotoSlide(num);
  },

  /*prev: function () {
    var num = this.nbCurrent - 1;
    if (num < 1){
      num = this.nbSlide;
    }
    this.gotoSlide(num);
  },*/

  //Fonction arrêter le défilement
  /*stop: function () {
    window.clearInterval(carrousel.timer);
  },*/

  //Fonction activer le défilement
  play: function () {
    window.clearInterval(carrousel.timer);
    this.timer = window.setInterval('carrousel.next()',5000);
  }
}

$(function () {
  carrousel.init($('.slider'));
});