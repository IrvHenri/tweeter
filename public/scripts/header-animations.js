$(document).ready(() => {
  // Window scroll down to display jump button
  const scrollFunction = () => {
    if ($(document).scrollTop() > 20) {
      $(".jump-btn").show();
    } else {
      $(".jump-btn").hide();
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

  // Animate form toggle

  const animateArrow = () => {
    $(".fa-angle-double-down")
      .animate(
        {
          marginBottom: "-=5px",
        },
        800
      )
      .animate(
        {
          marginBottom: "+=5px",
        },
        800
      );
    setInterval(animateArrow(), 1600);
  };

  $(function () {
    setInterval(animateArrow());
  });
});
