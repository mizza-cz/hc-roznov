$(".footer-slider").slick({
  dots: false,
  infinite: true,
  arrows: false,
  draggable: true,

  slidesToShow: 6,
  slidesToScroll: 1,
  speed: 2000,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});
