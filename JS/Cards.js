let cards = [
    // {
    //   front: "State the Binomial Theorem.",
    //   back: " \\begin (x+a)^n = \\sum_{k=0}^n \\binom{n}{k}x^k a^{n-k} \\end"
    // },
    {
      front: "What is a Binomial expression?",
       back: "A binomial is an algebraic expression that contains two different terms connected by addition or subtraction."
    },
    {
      front: "What is factorial?",
      back: "Factorial (denoted '!') is the product of an integer and all the integers below it."
    },
    {
      front: "What is the formula for  \\begin \\binom{n}{k} \\end ?",
      back: "\\begin \\frac{n!}{k!(n-k)!} \\end "
    },
    {
    front: "How is Pascal's Triangle constructed?",
    back: "Pascal's Triangle is constructed by placing a 1 in the first row (row 0). Each subsequent row is calculated by adding the two numbers directly above the number we need to calculate. The outer diagonals will always be 1s."
    },
    {
    front: "What is the binomial expansion formula?",
    back: "\\begin (a+b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\dots + b^n \\end"
    },
    {
    front: "What is the binomial distribution formula?",
    back: "\\begin P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k} \\end"
    },  
    {
    front: "What conditions need to be satisfied in order to use a binomial distribution?",
    back: "- A fixed number of trials <br><br> - Independent trials <br><br> - Only two outcomes (success or failure) <br><br> - The probability of success remaining unchanged for all trials."
    }
    // front: "",
    // back: ""
    // }
  ];
  
  


  let currentCard = 1,
    carousel = document.querySelector(".carousel"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    prevContainer = document.getElementById("previousContainer"),
    nextContainer = document.getElementById("nextContainer");
  
  let cardCount = document.getElementById("cardCount");
  
  function printResults() {
    let originalContents = document.body.innerHTML;
    removeQuestionBoxesFromClassList(document.getElementById("quiz-results"));
    let printContents = document.getElementById("quiz-results").innerHTML;
    
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  function renderCards() {
    shuffleArray(cards);
    handleButtonChanges();
    cardCount.innerText = `${currentCard}/${cards.length}`;
    carousel.style.width = `${cards.length}00vw`;
    cards.map(el => {
      let div = document.createElement("div");
      div.classList.add("flashCard", "rounded");
      let front = document.createElement("div");
      front.classList.add("front", "text-bg-dark", "lead", "rounded", "p-2");
      let back = document.createElement("div");
      back.classList.add("back", "text-bg-light", "lead", "rounded", "p-2");
      front.innerHTML = processString(el.front);
      back.innerHTML = processString(el.back);
      div.appendChild(front);
      div.appendChild(back);
      div.addEventListener("click", function(e) {
        e.srcElement.parentNode.classList.toggle("activeCard");
      });
      carousel.appendChild(div);
    });
  }
  
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function createDivWithTwoParagraphs(text1, text2) {
    // Create a new div element
    const div = document.createElement('div');
  
    // Create the first paragraph
    const p1 = document.createElement('p');
    const p1Text = document.createTextNode(text1);
    p1.appendChild(p1Text);
  
    // Create the horizontal rule
    const hr = document.createElement('hr');
  
    // Create the second paragraph
    const p2 = document.createElement('p');
    const p2Text = document.createTextNode(text2);
    p2.appendChild(p2Text);
    div.appendChild(p1);
    div.appendChild(hr);
    div.appendChild(p2);
    // return "<p><p> Answer <br><hr><br> hey</p></p>";
    // return `<p>${p1.outerHTML}</p>`;
    // return p1.outerHTML;
    // return `${score} ${questionList.length}`;
    return "<p>Lorem ipsum dolor sit amet, <span style=\"background-color: yellow\">consectetur adipiscing elit.</span></p>";
  }

  next.addEventListener("click", function(e) {
    if (currentCard >= cards.length) {
      currentCard = 1;
    } else {
      currentCard++;
    }
    handleButtonChanges();
    cardFly();
  });
  
  prev.addEventListener("click", function(e) {
    if (currentCard - 1 <= 0) {
      return;
    }
    currentCard--;
    handleButtonChanges();
    cardFly();
  });
  
  function handleButtonChanges() {
    prevContainer.classList.remove("d-none");
    if (currentCard == 1) {
      prevContainer.classList.add("d-none")
    }

    if (currentCard == cards.length) {
      next.textContent = "Restart"
    } else {
      next.textContent = "Next"
    }
  }

  function cardFly() {
    cardCount.innerText = `${currentCard}/${cards.length}`;
    carousel.style.transform = `translateX(-${currentCard - 1}00vw)`;
  }

  function processString(inputString) {
    const startFlag = "\\begin";
    const endFlag = "\\end";
    const chunks = inputString.split(startFlag);
    let outputString = chunks[0];
    console.log(chunks);
    for (let i = 1; i < chunks.length; i++) {
      const chunk = chunks[i];
      const endPosition = chunk.indexOf(endFlag);
      
      if (endPosition !== -1) {
        const renderOutput = katex.renderToString(chunk.slice(0, endPosition), {
            throwOnError: false
        });
        
        // render(chunk.slice(0, endPosition));
        outputString += renderOutput + chunk.slice(endPosition + endFlag.length);
      } else {
        outputString += startFlag + chunk;
      }
    }
    
    // Remove start and end flags from output string
    outputString = outputString.replace(new RegExp(`${startFlag}|${endFlag}`, 'g'), '');
    
    return outputString;
  }