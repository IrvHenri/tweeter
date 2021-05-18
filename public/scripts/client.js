/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1621194582200,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1621280982200,
    },
  ];

  const createTweetElement = (tweet) => {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    let createdAt = tweet.created_at;
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
    <p>${text}</p>
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

  renderTweets(data);
});
