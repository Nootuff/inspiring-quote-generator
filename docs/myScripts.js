let quoteHolder = document.getElementById("text");

let authorHolder = document.getElementById("author");

let backgroundContainer = document.getElementById("backgroundContainer");

let backgrounds = [ //The issue is caused by github looking for this images with this: https://nootuff.github.io/Assets/alex-green-OdEdGWr0EkM-unsplash.jpg, image hosting is going to work differently. Store the images  You could also, refactor this into jsut a number generator. 
  "url('../1.jpg')",
  "url('../Assets/2.jpg')",
  "url('../Assets/3.jpg')",
  "url('../Assets/4.jpg')",
  "url('../Assets/5.jpg')",
  "url('../Assets/6.jpg')",
  "url('../Assets/7.jpg')",
  "url('../Assets/8.jpg')",
  "url('../Assets/9.jpg')",
  "url('../Assets/10.jpg')"
];

function genQuote() {
  axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json') //This is the api.
    .then((body) => {
      let rand = Math.floor(Math.random() * body.data.quotes.length); //do .length instead of 10 
      let quoteText = "\"" + body.data.quotes[rand].quote + "\"";   // "test"
      let authorText = body.data.quotes[rand].author;
      let randBackground = Math.floor(Math.random() * backgrounds.length);
      $(".quoteNAuthor").animate({ opacity: '0' }, function () {
        quoteHolder.textContent = quoteText;
        authorHolder.textContent = authorText; $(".quoteNAuthor").animate({ opacity: '1' });
      })
      $("#backgroundContainer").animate({ opacity: '0' }, function () {
        backgroundContainer.style.backgroundImage = backgrounds[randBackground];
        $("#backgroundContainer").animate({ opacity: '1' });
      })

      $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?text=${quoteText}: ${authorText}`);

    })
    .catch((err) => {
      console.log('Error', err.statusCode);
    })
};

window.onload = function () {
  genQuote();
}