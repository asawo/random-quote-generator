$(document).ready(function() {

  //set and store variables at the start or else tweet button can't pull quotes
  var varQuote;
  var varAuthor;

  //load quote on page load
  getQuote();
  $("#getQuote").click(function() {
    getQuote();
  });

  function getQuote() {
    //fetch data
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
      varQuote = data.quoteText;
      varAuthor = data.quoteAuthor;

      //if author is unkown, set author to "Anonymous"
      if (varAuthor === "") {
        varAuthor = "Anonymous";
      }

      //pull another quote if it's too long to tweet
      if (varQuote.length + varAuthor.length > 130) {
        getQuote();
      }

      //otherwise, display quote + author
      else {
        $(".quote").text(varQuote);
        $(".author").text("- " + varAuthor);
      }
    });
  };

  //tweet quote + author
  $("#shareTweet").click(function() {
    window.open("https://twitter.com/intent/tweet?text=" + varQuote + "- " + varAuthor);
  });

});