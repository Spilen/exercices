var carrousel = {

  nbSlide: 0,
  nbCurrent: 1,
  elemCurrent: null,
  elem: null,

  init: function(elem){
    this.nbSlide = elem.find(".slider-picture").lenght;

    elem.find(".slider-select .slider-dot").click(function(){carrousel.gotoSlide($(this).text());})

    this.elem=elem;
    elem.find(".slider-picture").hide();
    elem.find(".slider-picture:first").show();
    this.elemCurrent = elem.find(".slider-picture:first");
  }, 

  gotoSlide: function(num){
    this.elemCurrent.fadeOut();
    this.elem.find(".slider-picture:eq("+num-1+")").fadeIn();
    this.nbCurrent = num;
    this.elemCurrent = this.elem.find(".slider-picture:eq("+num-1+")");
  }

}

$(function(){
  carrousel.init($(".slider"));
});