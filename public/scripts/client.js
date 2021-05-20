/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Clear error message on user input
  $("form").on("input", () => {
    $(".error-message").slideUp();
  });

  // Tweet validator function - will return customized error message
  const tweetValidator = (text) => {
    let errorMessage = "";
    if (text === "") {
      errorMessage = "Tweet is empty! 🚫";
    }
    if (text.length > 140) {
      errorMessage = "Tweet is longer than 140 characters! 🚫";
    }
    return errorMessage;
  };

  // POST tweet on form submission
  $("form").submit((e) => {
    e.preventDefault();

    let tweetText = $("textarea").val();

    // Pass user input into tweet validator function
    let errorMessage = tweetValidator(tweetText);
    if (errorMessage) {
      $(".error-message").text(errorMessage);
      $(".error-message").slideDown();
      return;
    }
    // POST request - serialize form data to send to server
    let queryString = $("form").serialize();

    $.post("/tweets", queryString)
      .then(() => {
        $("form").trigger("reset");
        $(".counter").text(140);
        loadTweets();
      })
      .catch((err) => console.log(err));
  });

  // XSS prevention function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create Tweet function
  const createTweetElement = (tweet) => {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;

    // Feed user submission into escape function - produce XSS safe text
    const safeText = escape(text);
    const createdAt = tweet.created_at;
    const $tweet = $(`<article class="tweet">
    <header class="tweet-header">
      <div class="tweet-profile-container">
        <div class="avatar">
          <img src="${avatars}" alt="sample" />
        </div>
        <p>${name}</p>
      </div>
      <p class="tweet-handle">${handle}</p>
    </header>
    <p>${safeText}</p>
    <footer class="tweet-footer">
      <small class="tweet-timestamp">${timeago.format(createdAt)}</small>
      <div class="tweet-action-icons">
        <i class="fas fa-flag"></i><i class="fas fa-retweet"></i
        ><i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  // Render tweets function
  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      $(".tweets-container").prepend(createTweetElement(tweet));
    });
  };

  // Load tweets function
  const loadTweets = () => {
    $.ajax("/tweets")
      .then(renderTweets)
      .catch((err) => console.log(err));
  };

  loadTweets();
});
