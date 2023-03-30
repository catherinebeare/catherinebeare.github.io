let cards = [
    {
      front: "State the Binomial Theorem.",
      back: " \\begin (x+a)^n = \\sum_{k=0}^n \\binom{n}{k}x^k a^{n-k} \\end"
    },
    {
      front: "What is a Binomial expression?",
       back: "A binomial is an algebraic expression that contains two different terms connected by addition or subtraction."
    },
    {
      front: "Define the term <br> Bernoulli Distribution.",
      back: "An event that only has two possible outcomes, success or failure."
    },
    {
      front: "What is factorial?",
      back: "Factorial (denoted '!') is the product of an integer and all the integers below it."
    },
    {
      front: "What is the formula for \\begin \\binom{n}{k} \\end ?",
      back: "\\begin \\frac{n!}{k!(n-k)!} \\end "
    }
    // {
    //     front: "",
    //     back: ""
    // },
    // {
    // front: "",
    // back: ""
    // },
    // {
    // front: "",
    // back: ""
    // },
    // {
    // front: "",
    // back: ""
    // },
    // {
    // front: "",
    // back: ""
    // },
    // {
    // front: "",
    // back: ""
    // },
    // {
    // front: "",
    // back: ""
    // }
  ];
  



  let currentCard = 1,
    carousel = document.querySelector(".carousel"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev");
  
  // renderCards();
  
  function renderCards() {
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
      // back.innerHTML = createDivWithTwoParagraphs("Answer", processString(el.back))
      // front.innerHTML = createDivWithTwoParagraphs("Question", processString(el.front))
      div.appendChild(front);
      div.appendChild(back);
      div.addEventListener("click", function(e) {
        e.srcElement.parentNode.classList.toggle("activeCard");
      });
      carousel.appendChild(div);
    });
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