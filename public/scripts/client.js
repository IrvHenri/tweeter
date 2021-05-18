/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function(){
  
    // Once we fetch tweet data and render tweets
      // we can access "created at" property and feed value to timeago?

      $(".tweet-timestamp").text(timeago.format(1621182256239))
})
