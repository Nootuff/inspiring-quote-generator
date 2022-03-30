const quoteHolder = document.getElementById("text");

const authorHolder = document.getElementById("author");

const backgroundContainer = document.getElementById("backgroundContainer");

let backgrounds = [ // You could , refactor this into jsut a number generator. 
  "url('./imgs/1.jpg')",
  "url('./imgs/2.jpg')",
  "url('./imgs/3.jpg')",
  "url('./imgs/4.jpg')",
  "url('./imgs/5.jpg')",
  "url('./imgs/6.jpg')",
  "url('./imgs/7.jpg')",
  "url('./imgs/8.jpg')",
  "url('./imgs/9.jpg')",
  "url('./imgs/10.jpg')"
  /* "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/1.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/2.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/3.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/4.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/5.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/6.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/7.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/8.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/9.jpg')",
  "url('https://raw.githubusercontent.com/Nootuff/inspiring-quote-generator/main/Assets/10.jpg')"
  */
];

let prevNum = ""

const numGen = () => {
  let randBackground = Math.floor(Math.random() * backgrounds.length);
  return randBackground;
}

const genQuote = () => {

  let backgroundGen = numGen();

  // console.log(backgroundGen)
  if (prevNum == backgroundGen) { //This prevents the same background image being used twice in a row.
    backgroundGen = numGen(); //If backgroundGen matches the previously generated number, generate a new one. 
  }

  prevNum = backgroundGen;


  axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json') //This is the api.
    .then((body) => {

      let rand = Math.floor(Math.random() * body.data.quotes.length); //Generates the number to select from the quotes array. 

      let quoteText = "\"" + body.data.quotes[rand].quote + "\"";   // "test"

      let authorText = body.data.quotes[rand].author;

      $(".quoteNAuthor").animate({ opacity: '0' }, function () {
        quoteHolder.textContent = quoteText;
        authorHolder.textContent = authorText; $(".quoteNAuthor").animate({ opacity: '1' });
      })

      $("#backgroundContainer").animate({ opacity: '0' }, function () { //insead of #backgroundContainer would could use a random number generator to pick one of the invisible image divs. After each generation, loop through all the other divs and amke sure opacity is 0.
        backgroundContainer.style.backgroundImage = backgrounds[backgroundGen];


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