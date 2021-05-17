$(document).ready(function () {
  //set counter text to 140 from Jquery
  let charLimit = 140;
  $(".counter").text(charLimit);

    //Anonymous function
  $("#tweet-text").on("input", function () {
    // obtain textarea value by capture its object with 'this'
    let charCount = this.value.length;
    let charactersRemaining = charLimit - charCount;
    if (charactersRemaining < 0) {
      $(".counter").css("color", "red");
    }
    $(".counter").text(charactersRemaining);
  });
});
