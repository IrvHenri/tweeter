$(document).ready(function () {
 
  
  function charCounter(){
    let charLimit = 140;
    let charCount = this.value.length;
    //Instead of explicitly find .counter we can traverse DOM tree to parent & find node sibling
    let counter = $(this).parent().find('.counter')
    let charactersRemaining = charLimit - charCount;
    if (charactersRemaining < 0) {
      $(counter).css("color", "red");
    }
    $(counter).text(charactersRemaining);
  }
  
  $("#tweet-text").on("input",charCounter);
});
