const quoteHolder = document.getElementById("text");

//const authorHolder = document.getElementById("author");

//const backgroundContainer = document.getElementById("backgroundContainer");

const photographer = document.getElementById("photographer");

//const imgLink = document.getElementById("imgLink");    

let backgroundData = [ // You could , refactor this into jsut a number generator. 
  {
    photographer: "Alex Green",
    credit: "https://unsplash.com/@alreadygreen",
    link: "https://unsplash.com/photos/OdEdGWr0EkM"
  },
  {
    photographer: "Casey Horner",
    credit: "https://unsplash.com/@mischievous_penguins",
    link: "https://unsplash.com/photos/vPiz8ZQ9Wf8"
  },
  {
    photographer: "David Billings",
    credit: "https://unsplash.com/@dav_billings",
    link: "https://unsplash.com/photos/Zmfz5jqgSiI"
  },
  {
    photographer: "Jeremy Bishop",
    credit: "https://unsplash.com/@jeremybishop",
    link: "https://unsplash.com/photos/2e3hgvDnCpM"
  },
  {
    photographer: "Michael Baccin",
    credit: "https://unsplash.com/@michaelbaccin",
    link: "https://unsplash.com/photos/Cv5ooHwI2DQ"
  },
  {
    photographer: "Thom Milkovic",
    credit: "https://unsplash.com/@thommilkovic",
    link: "https://unsplash.com/photos/sGj7xKpukpQ"
  },
  {
    photographer: "Nathan Anderson",
    credit: "https://unsplash.com/@nathananderson",
    link: "https://unsplash.com/photos/_tBeFVZPlPY"
  },
  {
    photographer: "Taneli Lahtinen",
    credit: "https://unsplash.com/@tanelah",
    link: "https://unsplash.com/photos/ycmLVgeIUPE"
  },
  {
    photographer: "Todd Trapani",
    credit: "https://unsplash.com/@ttrapani",
    link: "https://unsplash.com/photos/fdDFCnUOleg"
  },
  {
    photographer: "Zetong Li",
    credit: "https://unsplash.com/@zetong",
    link: "https://unsplash.com/photos/7pUHeP1GRC4"
  }

  /*"url('./imgs/0.jpg')",
  "url('./imgs/1.jpg')",
  "url('./imgs/2.jpg')",
  "url('./imgs/3.jpg')",
  "url('./imgs/4.jpg')",
  "url('./imgs/5.jpg')",
  "url('./imgs/6.jpg')",
  "url('./imgs/7.jpg')",
  "url('./imgs/8.jpg')",
  "url('./imgs/9.jpg')"
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
  let randBackground = Math.floor(Math.random() * backgroundData.length);
  return randBackground;
}

const quoteGen = () => {

  let backgroundGen = numGen();

  console.log(backgroundGen)
  if (prevNum == backgroundGen) { //This prevents the same background image being used twice in a row.
    console.log("Duplicate detected")
    backgroundGen = numGen(); //If backgroundGen matches the previously generated number, generate a new one. 
  }

  prevNum = backgroundGen;

  axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json') //This is the api.
    .then((body) => {

      let rand = Math.floor(Math.random() * body.data.quotes.length); //Generates the number to select from the quotes array. 

      let quoteText = "\"" + body.data.quotes[rand].quote + "\"";   // "test"

      let authorText = body.data.quotes[rand].author;

      $(".animText").animate({ opacity: '0' }, function () {
        document.getElementById("quote").textContent = quoteText;
        document.getElementById("author").textContent = authorText;
        document.getElementById("imgLink").href = backgroundData[backgroundGen].link;
        photographer.textContent = backgroundData[backgroundGen].photographer;
        photographer.href = backgroundData[backgroundGen].credit;
        $(".animText").animate({ opacity: '1' });
      })

      $("#backgroundContainer").animate({ opacity: '0' }, function () { //insead of #backgroundContainer would could use a random number generator to pick one of the invisible image divs. After each generation, loop through all the other divs and amke sure opacity is 0.
        document.getElementById("backgroundContainer").style.backgroundImage = `url("./imgs/${backgroundGen}.jpg")`
        $("#backgroundContainer").animate({ opacity: '1' });
      })

      $("#tweet-quote").attr("href", `https://twitter.com/intent/tweet?text=${quoteText}: ${authorText}&hashtags=inspirational`);

    })
    .catch((err) => {
      console.log("Error", err.statusCode);
    })
};

window.onload = function () {
  quoteGen();
}