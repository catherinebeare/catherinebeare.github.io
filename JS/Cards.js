let cards = [
    {
      front: "State the Binomial Theorem.",
      back: "\\begin (x+a)^n = \sum_{k=0}^n \binom{n}{k}x^k a^{n-k} \\end"
    },
    {
      front: "What is a Binomial expression?",
       back: "A binomial is an algebraic expression that contains two different terms connected by addition or subtraction."
    },
    {
      front: "Define the term Bernoulli Distribution.",
      back: "An event that only has two possible outcomes, success or failure."
    },
    {
        front: "",
        back: ""
    },
    {
    front: "",
    back: ""
    },
    {
    front: "",
    back: ""
    },
    {
    front: "",
    back: ""
    },
    {
    front: "",
    back: ""
    },
    {
    front: "",
    back: ""
    },
    {
    front: "",
    back: ""
    }
  ];
  
  let currentCard = 1,
    carousel = document.querySelector(".carousel"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");
  
  renderCards();
  
  function renderCards() {
    carousel.style.width = `${cards.length}00vw`;
    cards.map(el => {
      let div = document.createElement("div");
      div.classList.add("card");
      let front = document.createElement("div");
      front.classList.add("front");
      let back = document.createElement("div");
      back.classList.add("back");
      front.textContent = el.front;
      back.textContent = el.back;
      div.appendChild(front);
      div.appendChild(back);
      div.addEventListener("click", function(e) {
        e.srcElement.parentNode.classList.toggle("activeCard");
      });
      carousel.appendChild(div);
    });
  }
  
  next.addEventListener("click", function(e) {
    if (currentCard >= cards.length) {
      return;
    }
    currentCard++;
    cardFly();
  });
  
  prev.addEventListener("click", function(e) {
    if (currentCard - 1 <= 0) {
      return;
    }
    currentCard--;
    cardFly();
  });
  
  function cardFly() {
    carousel.style.transform = `translateX(-${currentCard - 1}00vw)`;
  }