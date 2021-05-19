/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Post Request
  const loadTweets = () => {
    $.ajax("/tweets")
      .then(renderTweets)
      .catch((err) => alert(err));
  };

  // Tweet validator function
  const tweetValidator = (text) => {
    if (text === "") {
      return $(".error-message").text("Tweet is empty!");
    }
    if (text.length > 140) {
      return $(".error-message").text("Tweet is too long!");
    }
    return false;
  };

  // clear alert message on input
  $("form").on("input", () => {
    $(".error-message").empty().fadeOut();
  });

  $("form").submit((e) => {
    e.preventDefault();

    let tweetText = $("textarea").val();

    if (tweetValidator(tweetText)) {
      return;
    }
    let queryString = $("form").serialize();
    console.log(queryString);
    $.post("/tweets", queryString, () => {
      $("form").trigger("reset");
      $(".counter").text(140);
      $(".error-message").empty();
      loadTweets();
    });
  });

  //XSS prevention function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
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

  const renderTweets = (tweets) => {
    tweets.forEach((tweet) => {
      $(".tweets-container").prepend(createTweetElement(tweet));
    });
  };

  loadTweets();
});
