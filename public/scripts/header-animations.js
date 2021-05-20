$(document).ready(() => {
  // Function to display jump button
  const scrollFunction = () => {
    if ($(document).scrollTop() > 20) {
      $(".jump-btn").show();
      $("nav").css("background", "#4056a1");
    } else {
      $(".jump-btn").hide();
      $("nav").css("background", "transparent");
    }
  };

  $(window).scroll(() => {
    scrollFunction();
  });

  // Jump to top of window function
  $(".jump-btn").click(() => {
    jumpToTop();
  });
  const jumpToTop = () => {
    $(document).scrollTop(0);
  };

  //Form toggle event handler
  $(".nav-write-tweet").click(() => {
    $(".new-tweet").toggle("slow");
    $("textarea").focus();
  });
});
