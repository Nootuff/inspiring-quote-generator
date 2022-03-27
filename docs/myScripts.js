let quoteHolder = document.getElementById("text");

let authorHolder = document.getElementById("author");

let backgroundContainer = document.getElementById("backgroundContainer");

let backgrounds = ["url('../Assets/alex-green-OdEdGWr0EkM-unsplash.jpg')", 
"url('../Assets/casey-horner-vPiz8ZQ9Wf8-unsplash.jpg')",
"url('../Assets/david-billings-Zmfz5jqgSiI-unsplash.jpg')",
"url('../Assets/jeremy-bishop-2e3hgvDnCpM-unsplash.jpg')", 
"url('../Assets/michael-baccin-Cv5ooHwI2DQ-unsplash.jpg')",
"url('../Assets/milkovi-sGj7xKpukpQ-unsplash.jpg')", 
"url('../Assets/nathan-anderson-_tBeFVZPlPY-unsplash.jpg')",
"url('../Assets/taneli-lahtinen-ycmLVgeIUPE-unsplash.jpg')",
"url('../Assets/todd-trapani-fdDFCnUOleg-unsplash.jpg')", 
"url('../Assets/zetong-li-7pUHeP1GRC4-unsplash.jpg')"
];

function genQuote() {
    axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json') //This is the api.
        .then((body) => {
            let rand = Math.floor(Math.random() * body.data.quotes.length); //do .length instead of 10 
            let quoteText =  "\"" + body.data.quotes[rand].quote + "\"";   // "test"
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