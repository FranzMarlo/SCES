$(".menu-btn").on("click", function (e) {
    e.stopPropagation();
    $(".pop-up").toggleClass("active");
    $(".overlay").toggle();
  });
  
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".pop-up").length &&
      $(".pop-up").hasClass("active")
    ) {
      $(".pop-up").removeClass("active");
      $(".overlay").hide();
    }
  });
  
  $(".overlay").on("click", function () {
    $(".pop-up").removeClass("active");
    $(this).hide();
  });

$(".menu > ul > li").on("click", function(e){
    $(this).toggleClass("active");
    $(this).siblings().removeClass("active");
    $(this).find("ul").slideToggle();
    $(this).siblings().find("ul").slideUp();
    $(this).siblings().find("ul").find("li").removeClass('active');
});