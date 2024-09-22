const cards = document.querySelectorAll('.card');
let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e) {
    let clickedCard = e.target;
    clickedCard.classList.add("flip");
    if (clickedCard !== cardOne && !disableDeck) {
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;

        // console.log(cardOne, cardTwo)

        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        checkCards(cardOneImg, cardTwoImg);
    }
}

function checkCards(img1, img2) {
    if (img1 === img2) {
        matchCard++;
        if (matchCard == 8) {
           setTimeout(()=>{
            return shuffleCards()
           }, 1000)
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
        
        // setTimeout(() => {
        //     cardOne.style.visibility = "hidden";
        //     cardTwo.style.visibility = "hidden";
            
        // }, 500)
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 200);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
}

function shuffleCards() {
    matchCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = ["duck","donkey","cat","dog","mouse","bee","horse","sheep","duck","donkey","cat","dog","mouse","bee","horse","sheep"];
    arr.sort(()=> Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `./img/${arr[index]}.png`;
        card.addEventListener("click", flipCard);
     
    })
}

shuffleCards();

cards.forEach(card => {
    
    card.addEventListener("click", flipCard);
})