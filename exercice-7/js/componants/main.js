var carrousel = {

  nbSlide: 0,
  nbCurrent: 1,
  elemCurrent: null,
  elem: null,
  timer: null,

  init: function (elem) {
    this.nbSlide = elem.find('.slider-picture').lenght;

    //Défilement manuel
    elem.find('.slider-select .slider-dot').click(function () {
      carrousel.gotoSlide($(this).text());
    })

    //Initialisation
    this.elem = elem;
    elem.find('.slider-picture').hide();
    elem.find('.slider-picture:first').show();
    this.elemCurrent = elem.find('.slider-picture:first');
    this.elem.find('.slider-select .slider-dot:first').addClass('active');

    //Défilement auto
    carrousel.play();

    //Figer au hover
    elem.mouseover(carrousel.stop);
    elem.mouseout(carrousel.play);
  }, 

  //Fonction du défilement
  gotoSlide: function (num) {
    if (num == this.nbCurrent){
      return false;
    }
    this.elemCurrent.fadeOut();
    this.elem.find('.slider-picture:eq(' + (num - 1) + ')').fadeIn();
    this.elem.find('.slider-select .slider-dot').removeClass('active');
    this.elem.find('.slider-select .slider-dot:eq(' + (num - 1) + ')').addClass('active');
    this.nbCurrent = num;
    this.elemCurrent = this.elem.find('.slider-picture:eq(' + (num - 1) + ')');
  },

  //Fonction du défilement auto
  next: function () {
    var num = this.nbCurrent + 1;
    if (num > this.nbSlide){
      num = 1;
    }
    this.gotoSlide(num);
  },

  //Fonction stop défilement
  stop: function (){
    window.clearInterval(carrousel.timer);
  },

  //Fonction play défilement
  play: function (){
    window.clearInterval(carrousel.timer);
    this.timer = window.setInterval('carrousel.next()',2000);
  }
}

$(function () {
  carrousel.init($('.slider'));
});