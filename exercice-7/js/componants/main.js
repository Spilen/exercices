class Carousel {
  constructor (element, options = {}){
    this.element = element
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1
    }, options)

  }
}

document.addEventListener('DOMContentLoaded', function(){
  new Carousel(document.querySelector('.slider'),{
      slidesToScroll: 1,
      slidesVisible: 1
  })
})
